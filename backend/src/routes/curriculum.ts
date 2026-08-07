import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import curriculumService from '../services/curriculumService';
import { authenticateToken, requireAdmin, requireStudent } from '../middleware/auth';
import type { AuthenticatedRequest } from '../types';

const router = express.Router();

// Multer storage configuration for video and PDF uploads
const uploadsDir = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500 MB max for video uploads
});

// GET units by grade (grade options: 1HIGH, 2HIGH, 3HIGH or query fallback)
router.get('/units', async (req, res) => {
  try {
    const grade = (req.query.grade as string) || '1HIGH';
    const units = await curriculumService.getUnitsByGrade(grade);
    res.json({ success: true, data: units });
  } catch (error: any) {
    console.error('Error getting units:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET specific video playback view with playlist & progress
router.get('/video/:videoId', authenticateToken, requireStudent, async (req, res) => {
  try {
    const videoId = parseInt(req.params.videoId as string, 10);
    const studentId = (req as AuthenticatedRequest).user?.id;

    if (isNaN(videoId)) {
      // If no valid video ID provided, fetch default first video of 1HIGH
      const units = await curriculumService.getUnitsByGrade('1HIGH', studentId, true);
      const firstVidId = units[0]?.lessons?.[0]?.videos?.[0]?.id || 1;
      const data = await curriculumService.getVideoWithPlaylist(firstVidId, studentId);
      res.json({ success: true, data });
      return;
    }

    const data = await curriculumService.getVideoWithPlaylist(videoId, studentId);
    if (!data) {
      res.status(404).json({ success: false, message: 'المحاضرة غير موجودة' });
      return;
    }

    res.json({ success: true, data });
  } catch (error: any) {
    console.error('Error fetching video details:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET protected PDF/material for a video
router.get('/material/:videoId', authenticateToken, requireStudent, async (req, res) => {
  try {
    const videoId = parseInt(req.params.videoId as string, 10);
    const data = await curriculumService.getVideoWithPlaylist(videoId);
    const pdfUrl = data?.currentVideo?.pdf_url;

    if (!pdfUrl) {
      res.status(404).json({ success: false, message: 'المادة غير موجودة' });
      return;
    }

    if (pdfUrl.startsWith('http://') || pdfUrl.startsWith('https://')) {
      res.redirect(pdfUrl);
      return;
    }

    const localFilePath = path.isAbsolute(pdfUrl)
      ? pdfUrl
      : path.join(process.cwd(), pdfUrl.startsWith('/') ? pdfUrl.slice(1) : pdfUrl);

    if (!fs.existsSync(localFilePath)) {
      res.status(404).json({ success: false, message: 'ملف المادة غير موجود' });
      return;
    }

    res.sendFile(localFilePath);
  } catch (error: any) {
    console.error('Error serving curriculum material:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET Secure Video Stream via HTTP Range
router.get('/stream/:videoId', authenticateToken, requireStudent, async (req, res) => {
  try {
    const videoId = parseInt(req.params.videoId as string, 10);
    const data = await curriculumService.getVideoWithPlaylist(videoId);

    if (!data || !data.currentVideo) {
      return res.status(404).send('Video not found');
    }

    const videoUrl = data.currentVideo.video_url;

    // If external URL (e.g. sample video), redirect or pipe
    if (videoUrl.startsWith('http://') || videoUrl.startsWith('https://')) {
      return res.redirect(videoUrl);
    }

    // Local file streaming with Range support
    const localFilePath = path.isAbsolute(videoUrl)
      ? videoUrl
      : path.join(process.cwd(), videoUrl.startsWith('/') ? videoUrl.slice(1) : videoUrl);

    if (!fs.existsSync(localFilePath)) {
      return res.status(404).send('Video file not found on server');
    }

    const stat = fs.statSync(localFilePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0] ?? '', 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(localFilePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
        'Content-Disposition': 'inline; filename="stream.bin"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
        'Content-Disposition': 'inline; filename="stream.bin"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      };
      res.writeHead(200, head);
      fs.createReadStream(localFilePath).pipe(res);
    }
  } catch (error: any) {
    console.error('Error streaming video:', error);
    res.status(500).send('Streaming error');
  }
});

// POST Mark Video Progress
router.post('/progress', authenticateToken, requireStudent, async (req, res) => {
  try {
    const { studentId, videoId, completed, watchedSeconds } = req.body;
    if (!studentId || !videoId) {
      res.status(400).json({ success: false, message: 'Missing studentId or videoId' });
      return;
    }

    const authenticatedStudentId = (req as AuthenticatedRequest).user?.id;
    if (authenticatedStudentId !== Number(studentId)) {
      res.status(403).json({ success: false, message: 'لا يمكنك تحديث تقدم طالب آخر' });
      return;
    }

    const result = await curriculumService.markVideoProgress(studentId, videoId, !!completed, watchedSeconds || 0);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ADMIN API ENDPOINTS (Units, Lessons, Videos CRUD)

router.use('/admin', authenticateToken, requireAdmin);

// Admin-only catalog response includes the video records needed by the editor.
router.get('/admin/units', async (req, res) => {
  try {
    const grade = (req.query.grade as string) || '1HIGH';
    const units = await curriculumService.getUnitsByGrade(grade, undefined, true);
    res.json({ success: true, data: units });
  } catch (error: any) {
    console.error('Error getting admin curriculum units:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create unit
router.post('/admin/units', async (req, res) => {
  try {
    const unit = await curriculumService.createUnit(req.body);
    res.json({ success: true, data: unit });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update unit
router.put('/admin/units/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const unit = await curriculumService.updateUnit(id, req.body);
    res.json({ success: true, data: unit });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE unit
router.delete('/admin/units/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const success = await curriculumService.deleteUnit(id);
    res.json({ success });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create lesson
router.post('/admin/lessons', async (req, res) => {
  try {
    const lesson = await curriculumService.createLesson(req.body);
    res.json({ success: true, data: lesson });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update lesson
router.put('/admin/lessons/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const lesson = await curriculumService.updateLesson(id, req.body);
    res.json({ success: true, data: lesson });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE lesson
router.delete('/admin/lessons/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const success = await curriculumService.deleteLesson(id);
    res.json({ success });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create video in lesson
router.post('/admin/videos', async (req, res) => {
  try {
    const video = await curriculumService.createVideo(req.body);
    res.json({ success: true, data: video });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update video
router.put('/admin/videos/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const video = await curriculumService.updateVideo(id, req.body);
    res.json({ success: true, data: video });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE video
router.delete('/admin/videos/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const success = await curriculumService.deleteVideo(id);
    res.json({ success });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST File Upload (for video & PDF files)
router.post('/admin/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No file uploaded' });
    return;
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, url: fileUrl });
});

export default router;
