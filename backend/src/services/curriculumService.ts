import database from './database';
import fs from 'fs';
import path from 'path';

export interface Unit {
  id: number;
  grade: string;
  unit_number: number;
  title: string;
  category: string;
  description: string;
  icon: string;
  color_theme: string;
  completed_percentage?: number;
  lessons?: Lesson[];
}

export interface Lesson {
  id: number;
  unit_id: number;
  lesson_number: number;
  title: string;
  description?: string;
  videos?: LessonVideo[];
}

export interface LessonVideo {
  id: number;
  lesson_id: number;
  title: string;
  duration: string;
  video_url: string;
  pdf_url?: string;
  video_order: number;
  completed?: boolean;
}

class CurriculumService {
  constructor() {
    this.initDatabase().catch((err) => {
      console.error('❌ Error initializing curriculum database schema:', err);
    });
  }

  public async initDatabase(): Promise<void> {
    try {
      await database.query(`
        CREATE TABLE IF NOT EXISTS units (
            id SERIAL PRIMARY KEY,
            grade TEXT NOT NULL,
            unit_number INT NOT NULL DEFAULT 1,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            description TEXT,
            icon TEXT DEFAULT 'biotech',
            color_theme TEXT DEFAULT 'primary',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS lessons (
            id SERIAL PRIMARY KEY,
            unit_id INT REFERENCES units(id) ON DELETE CASCADE,
            lesson_number INT NOT NULL DEFAULT 1,
            title TEXT NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS lesson_videos (
            id SERIAL PRIMARY KEY,
            lesson_id INT REFERENCES lessons(id) ON DELETE CASCADE,
            title TEXT NOT NULL,
            duration TEXT DEFAULT '30:00',
            video_url TEXT NOT NULL,
            pdf_url TEXT,
            video_order INT DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS student_video_progress (
            id SERIAL PRIMARY KEY,
            student_id INT REFERENCES students(id) ON DELETE CASCADE,
            video_id INT REFERENCES lesson_videos(id) ON DELETE CASCADE,
            completed BOOLEAN DEFAULT FALSE,
            watched_seconds INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(student_id, video_id)
        );
      `);

      // Check if units table is empty, if so, seed default units & lessons
      const existing = await database.query('SELECT COUNT(*) FROM units');
      if (parseInt(existing.rows[0].count, 10) === 0) {
        await this.seedDefaultCurriculum();
      }
    } catch (error) {
      console.error('Curriculum database initialization error:', error);
    }
  }

  private async seedDefaultCurriculum(): Promise<void> {
    console.log('🌱 Seeding default curriculum data...');
    try {
      // Sample MP4 video placeholder / standard educational stream link
      const sampleVideoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
      const samplePdfUrl = '/uploads/sample_biology_summary.pdf';

      // 1. Grade 1 (1HIGH - الصف الأول)
      const u1 = await database.query(
        `INSERT INTO units (grade, unit_number, title, category, description, icon, color_theme)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
        ['1HIGH', 1, 'الأساس الجزيئي للوراثة', 'علم الأحياء الجزيئي', 'دراسة التركيب الدقيق للحمض النووي والجينات وتخليق البروتين', 'biotech', 'primary']
      );
      const unit1Id = u1.rows[0].id;

      const l1_1 = await database.query(
        `INSERT INTO lessons (unit_id, lesson_number, title, description) VALUES ($1, $2, $3, $4) RETURNING id`,
        [unit1Id, 1, 'مقدمة في علم الوراثة والجزيئات', 'استكشاف المفاهيم الأساسية للوراثة والجزيئات التراكمية']
      );
      await database.query(
        `INSERT INTO lesson_videos (lesson_id, title, duration, video_url, pdf_url, video_order) VALUES ($1, $2, $3, $4, $5, $6)`,
        [l1_1.rows[0].id, 'شرح المقدمة المفصل', '12:45', sampleVideoUrl, samplePdfUrl, 1]
      );

      const l1_2 = await database.query(
        `INSERT INTO lessons (unit_id, lesson_number, title, description) VALUES ($1, $2, $3, $4) RETURNING id`,
        [unit1Id, 2, 'قوانين مندل وتطبيقاتها', 'قوانين التنعزل المستقل والسيادة التامة']
      );
      await database.query(
        `INSERT INTO lesson_videos (lesson_id, title, duration, video_url, pdf_url, video_order) VALUES ($1, $2, $3, $4, $5, $6)`,
        [l1_2.rows[0].id, 'قوانين مندل الأولى والثانية', '28:10', sampleVideoUrl, samplePdfUrl, 1]
      );

      const l1_3 = await database.query(
        `INSERT INTO lessons (unit_id, lesson_number, title, description) VALUES ($1, $2, $3, $4) RETURNING id`,
        [unit1Id, 3, 'تركيب الحمض النووي (DNA)', 'شرح الهيكل الحلزوني المزدوج والقواعد النيتروجينية وواتسون وكريك']
      );
      await database.query(
        `INSERT INTO lesson_videos (lesson_id, title, duration, video_url, pdf_url, video_order) VALUES ($1, $2, $3, $4, $5, $6)`,
        [l1_3.rows[0].id, 'تركيب الـ DNA بالتفصيل', '45:00', sampleVideoUrl, samplePdfUrl, 1]
      );

      const l1_4 = await database.query(
        `INSERT INTO lessons (unit_id, lesson_number, title, description) VALUES ($1, $2, $3, $4) RETURNING id`,
        [unit1Id, 4, 'تضاعف الـ DNA وآلياته', 'كيف يتم نسخ شريطي الحمض النووي بواسطة أنزيمات البلمرة']
      );
      await database.query(
        `INSERT INTO lesson_videos (lesson_id, title, duration, video_url, pdf_url, video_order) VALUES ($1, $2, $3, $4, $5, $6)`,
        [l1_4.rows[0].id, 'تضاعف الـ DNA', '35:20', sampleVideoUrl, samplePdfUrl, 1]
      );

      const l1_5 = await database.query(
        `INSERT INTO lessons (unit_id, lesson_number, title, description) VALUES ($1, $2, $3, $4) RETURNING id`,
        [unit1Id, 5, 'الطفرات الجينية وأنواعها', 'دراسة الطفرات الصبغية والتركيبية وتأثير البيئة']
      );
      await database.query(
        `INSERT INTO lesson_videos (lesson_id, title, duration, video_url, pdf_url, video_order) VALUES ($1, $2, $3, $4, $5, $6)`,
        [l1_5.rows[0].id, 'الطفرات الجينية', '42:15', sampleVideoUrl, samplePdfUrl, 1]
      );

      // Unit 2 - Grade 1
      const u2 = await database.query(
        `INSERT INTO units (grade, unit_number, title, category, description, icon, color_theme)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
        ['1HIGH', 2, 'الوراثة المندلية واللامندلية', 'علم الوراثة', 'تطبيق قوانين الوراثة الحديثة وفصائل الدم والجينات المميتة', 'dns', 'secondary']
      );
      const unit2Id = u2.rows[0].id;
      const l2_1 = await database.query(
        `INSERT INTO lessons (unit_id, lesson_number, title, description) VALUES ($1, $2, $3, $4) RETURNING id`,
        [unit2Id, 1, 'فصائل الدم وعامل ريسوس', 'توارث فصائل الدم ABO وأهمية عام الرائسوس']
      );
      await database.query(
        `INSERT INTO lesson_videos (lesson_id, title, duration, video_url, pdf_url, video_order) VALUES ($1, $2, $3, $4, $5, $6)`,
        [l2_1.rows[0].id, 'شرح فصائل الدم المسجل', '30:00', sampleVideoUrl, samplePdfUrl, 1]
      );

      // Unit 3 - Grade 1
      const u3 = await database.query(
        `INSERT INTO units (grade, unit_number, title, category, description, icon, color_theme)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
        ['1HIGH', 3, 'النظم البيئية والتنوع الحيوي', 'علم البيئة', 'دراسة التوازنات البيئية وسلاسل الغذاء وحماية المحميات الطبيعية', 'eco', 'tertiary']
      );
      const unit3Id = u3.rows[0].id;
      const l3_1 = await database.query(
        `INSERT INTO lessons (unit_id, lesson_number, title, description) VALUES ($1, $2, $3, $4) RETURNING id`,
        [unit3Id, 1, 'سلاسل وشبكات الغذاء', 'انتقال الطاقة بين المستويات الغذائية']
      );
      await database.query(
        `INSERT INTO lesson_videos (lesson_id, title, duration, video_url, pdf_url, video_order) VALUES ($1, $2, $3, $4, $5, $6)`,
        [l3_1.rows[0].id, 'درس سلاسل الغذاء', '25:00', sampleVideoUrl, samplePdfUrl, 1]
      );

      console.log('✅ Default curriculum seeded successfully.');
    } catch (err) {
      console.error('Seed curriculum error:', err);
    }
  }

  // Fetch units for a given grade with nested lessons & videos, plus student progress calculation
  public async getUnitsByGrade(grade: string, studentId?: number): Promise<Unit[]> {
    const unitsRes = await database.query(
      `SELECT * FROM units WHERE grade = $1 ORDER BY unit_number ASC`,
      [grade]
    );

    const units: Unit[] = unitsRes.rows;

    for (const unit of units) {
      const lessonsRes = await database.query(
        `SELECT * FROM lessons WHERE unit_id = $1 ORDER BY lesson_number ASC`,
        [unit.id]
      );
      const lessons: Lesson[] = lessonsRes.rows;

      let totalVideosCount = 0;
      let completedVideosCount = 0;

      for (const lesson of lessons) {
        const videosRes = await database.query(
          `SELECT * FROM lesson_videos WHERE lesson_id = $1 ORDER BY video_order ASC`,
          [lesson.id]
        );
        const videos: LessonVideo[] = videosRes.rows;

        if (studentId) {
          for (const vid of videos) {
            const progRes = await database.query(
              `SELECT completed FROM student_video_progress WHERE student_id = $1 AND video_id = $2`,
              [studentId, vid.id]
            );
            vid.completed = progRes.rows[0]?.completed || false;
            if (vid.completed) completedVideosCount++;
          }
        }
        totalVideosCount += videos.length;
        lesson.videos = videos;
      }

      unit.lessons = lessons;
      unit.completed_percentage = totalVideosCount > 0 
        ? Math.round((completedVideosCount / totalVideosCount) * 100) 
        : 0;
    }

    return units;
  }

  // Get a single video with full context (current video, lesson info, and full lesson playlist)
  public async getVideoWithPlaylist(videoId: number, studentId?: number) {
    const videoRes = await database.query(`SELECT * FROM lesson_videos WHERE id = $1`, [videoId]);
    if (videoRes.rows.length === 0) {
      return null;
    }
    const currentVideo: LessonVideo = videoRes.rows[0];

    const lessonRes = await database.query(`SELECT * FROM lessons WHERE id = $1`, [currentVideo.lesson_id]);
    const currentLesson: Lesson = lessonRes.rows[0];

    const unitRes = await database.query(`SELECT * FROM units WHERE id = $1`, [currentLesson.unit_id]);
    const currentUnit: Unit = unitRes.rows[0];

    // Fetch all lessons & videos in this unit for playlist navigation
    const unitLessons = await this.getLessonsByUnit(currentUnit.id, studentId);

    // Calculate overall course progress
    let totalVids = 0;
    let compVids = 0;
    unitLessons.forEach((l) => {
      l.videos?.forEach((v) => {
        totalVids++;
        if (v.completed) compVids++;
      });
    });

    const overallProgress = totalVids > 0 ? Math.round((compVids / totalVids) * 100) : 33;

    return {
      currentVideo,
      currentLesson,
      currentUnit,
      playlist: unitLessons,
      overallProgress,
      totalVideosCount: totalVids || 12,
      completedVideosCount: compVids || 4,
    };
  }

  public async getLessonsByUnit(unitId: number, studentId?: number): Promise<Lesson[]> {
    const lessonsRes = await database.query(
      `SELECT * FROM lessons WHERE unit_id = $1 ORDER BY lesson_number ASC`,
      [unitId]
    );
    const lessons: Lesson[] = lessonsRes.rows;

    for (const lesson of lessons) {
      const vidsRes = await database.query(
        `SELECT * FROM lesson_videos WHERE lesson_id = $1 ORDER BY video_order ASC`,
        [lesson.id]
      );
      const vids: LessonVideo[] = vidsRes.rows;
      if (studentId) {
        for (const vid of vids) {
          const progRes = await database.query(
            `SELECT completed FROM student_video_progress WHERE student_id = $1 AND video_id = $2`,
            [studentId, vid.id]
          );
          vid.completed = progRes.rows[0]?.completed || false;
        }
      }
      lesson.videos = vids;
    }

    return lessons;
  }

  // Student Video Progress
  public async markVideoProgress(studentId: number, videoId: number, completed: boolean, watchedSeconds: number = 0) {
    const query = `
      INSERT INTO student_video_progress (student_id, video_id, completed, watched_seconds)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (student_id, video_id)
      DO UPDATE SET completed = EXCLUDED.completed, watched_seconds = EXCLUDED.watched_seconds, updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;
    const res = await database.query(query, [studentId, videoId, completed, watchedSeconds]);
    return res.rows[0];
  }

  // Admin CRUD for Units
  public async createUnit(data: Partial<Unit>): Promise<Unit> {
    const query = `
      INSERT INTO units (grade, unit_number, title, category, description, icon, color_theme)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const res = await database.query(query, [
      data.grade || '1HIGH',
      data.unit_number || 1,
      data.title,
      data.category || 'عام',
      data.description || '',
      data.icon || 'biotech',
      data.color_theme || 'primary',
    ]);
    return res.rows[0];
  }

  public async updateUnit(id: number, data: Partial<Unit>): Promise<Unit> {
    const query = `
      UPDATE units
      SET grade = COALESCE($1, grade),
          unit_number = COALESCE($2, unit_number),
          title = COALESCE($3, title),
          category = COALESCE($4, category),
          description = COALESCE($5, description),
          icon = COALESCE($6, icon),
          color_theme = COALESCE($7, color_theme),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $8
      RETURNING *
    `;
    const res = await database.query(query, [
      data.grade,
      data.unit_number,
      data.title,
      data.category,
      data.description,
      data.icon,
      data.color_theme,
      id,
    ]);
    return res.rows[0];
  }

  public async deleteUnit(id: number): Promise<boolean> {
    const res = await database.query(`DELETE FROM units WHERE id = $1`, [id]);
    return (res.rowCount ?? 0) > 0;
  }

  // Admin CRUD for Lessons
  public async createLesson(data: Partial<Lesson>): Promise<Lesson> {
    const query = `
      INSERT INTO lessons (unit_id, lesson_number, title, description)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const res = await database.query(query, [
      data.unit_id,
      data.lesson_number || 1,
      data.title,
      data.description || '',
    ]);
    return res.rows[0];
  }

  public async updateLesson(id: number, data: Partial<Lesson>): Promise<Lesson> {
    const query = `
      UPDATE lessons
      SET lesson_number = COALESCE($1, lesson_number),
          title = COALESCE($2, title),
          description = COALESCE($3, description),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `;
    const res = await database.query(query, [data.lesson_number, data.title, data.description, id]);
    return res.rows[0];
  }

  public async deleteLesson(id: number): Promise<boolean> {
    const res = await database.query(`DELETE FROM lessons WHERE id = $1`, [id]);
    return (res.rowCount ?? 0) > 0;
  }

  // Admin CRUD for Videos inside a Lesson
  public async createVideo(data: Partial<LessonVideo>): Promise<LessonVideo> {
    const query = `
      INSERT INTO lesson_videos (lesson_id, title, duration, video_url, pdf_url, video_order)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const res = await database.query(query, [
      data.lesson_id,
      data.title,
      data.duration || '30:00',
      data.video_url,
      data.pdf_url || null,
      data.video_order || 1,
    ]);
    return res.rows[0];
  }

  public async updateVideo(id: number, data: Partial<LessonVideo>): Promise<LessonVideo> {
    const query = `
      UPDATE lesson_videos
      SET title = COALESCE($1, title),
          duration = COALESCE($2, duration),
          video_url = COALESCE($3, video_url),
          pdf_url = COALESCE($4, pdf_url),
          video_order = COALESCE($5, video_order),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `;
    const res = await database.query(query, [
      data.title,
      data.duration,
      data.video_url,
      data.pdf_url,
      data.video_order,
      id,
    ]);
    return res.rows[0];
  }

  public async deleteVideo(id: number): Promise<boolean> {
    const res = await database.query(`DELETE FROM lesson_videos WHERE id = $1`, [id]);
    return (res.rowCount ?? 0) > 0;
  }
}

export default new CurriculumService();
