-- Curriculum database tables: Units, Lessons, Lesson Videos, Student Video Progress

CREATE TABLE IF NOT EXISTS units (
    id SERIAL PRIMARY KEY,
    grade TEXT NOT NULL, -- '1HIGH', '2HIGH', '3HIGH'
    unit_number INT NOT NULL DEFAULT 1,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- e.g. 'علم الأحياء الجزيئي', 'علم الوراثة'
    description TEXT,
    icon TEXT DEFAULT 'biotech',
    color_theme TEXT DEFAULT 'primary', -- 'primary', 'secondary', 'tertiary'
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

CREATE INDEX IF NOT EXISTS idx_units_grade ON units(grade);
CREATE INDEX IF NOT EXISTS idx_lessons_unit ON lessons(unit_id);
CREATE INDEX IF NOT EXISTS idx_videos_lesson ON lesson_videos(lesson_id);
CREATE INDEX IF NOT EXISTS idx_progress_student ON student_video_progress(student_id);
