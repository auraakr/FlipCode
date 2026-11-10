-- Skema PostgreSQL (lokal maupun Supabase). Aman dijalankan ulang.

CREATE TABLE IF NOT EXISTS users (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  placement_done BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS topics (
  id VARCHAR(50) PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  deskripsi TEXT,
  urutan INT NOT NULL
);

CREATE TABLE IF NOT EXISTS cards (
  id VARCHAR(50) PRIMARY KEY,
  topic_id VARCHAR(50) NOT NULL REFERENCES topics(id),
  depan TEXT NOT NULL,
  belakang JSONB NOT NULL,
  related_question_ids JSONB
);

CREATE TABLE IF NOT EXISTS questions (
  id VARCHAR(60) PRIMARY KEY,
  topic_id VARCHAR(50) NOT NULL REFERENCES topics(id),
  level TEXT CHECK (level IN ('Mudah', 'Sedang', 'Sulit')),
  is_placement BOOLEAN NOT NULL DEFAULT FALSE,
  tipe VARCHAR(30) NOT NULL DEFAULT 'pilihan_ganda',
  pertanyaan TEXT NOT NULL,
  pilihan JSONB NOT NULL,
  jawaban_benar SMALLINT NOT NULL,
  penjelasan TEXT,
  petunjuk TEXT,
  related_card_ids JSONB
);
-- Migrasi untuk database yang sudah ada: petunjuk (hint) soal kuis, tampil sebelum menjawab.
ALTER TABLE questions ADD COLUMN IF NOT EXISTS petunjuk TEXT;
CREATE INDEX IF NOT EXISTS idx_questions_pick ON questions (topic_id, level, is_placement);

CREATE TABLE IF NOT EXISTS user_topic_progress (
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic_id VARCHAR(50) NOT NULL REFERENCES topics(id),
  level TEXT NOT NULL DEFAULT 'Mudah' CHECK (level IN ('Mudah', 'Sedang', 'Sulit')),
  state VARCHAR(30) NOT NULL DEFAULT 'Belum mulai',
  last_quiz_score VARCHAR(10),
  PRIMARY KEY (user_id, topic_id)
);

CREATE TABLE IF NOT EXISTS user_card_status (
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  card_id VARCHAR(50) NOT NULL REFERENCES cards(id),
  status VARCHAR(30) NOT NULL,
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, card_id)
);

CREATE TABLE IF NOT EXISTS quiz_sessions (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic_id VARCHAR(50) NOT NULL REFERENCES topics(id),
  level TEXT NOT NULL CHECK (level IN ('Mudah', 'Sedang', 'Sulit')),
  question_ids JSONB NOT NULL,
  benar SMALLINT,
  total SMALLINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  submitted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS placement_sessions (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_ids JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  submitted_at TIMESTAMPTZ
);

-- Keamanan Supabase: tabel di schema public otomatis bisa diakses lewat REST API
-- memakai anon key. Aktifkan RLS TANPA policy supaya anon key tidak bisa membaca
-- atau menulis apa pun. Server ini memakai koneksi Postgres langsung (role postgres),
-- yang tidak terpengaruh RLS. Di Postgres lokal, perintah ini tidak berdampak.
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_topic_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_card_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE placement_sessions ENABLE ROW LEVEL SECURITY;
