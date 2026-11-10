// Mengisi tabel konten dari berkas JSON aplikasi (src/data). Aman dijalankan ulang (upsert).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool, withTx } from '../src/db.js';

const dataDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../src/data');
const read = (f) => JSON.parse(fs.readFileSync(path.join(dataDir, f), 'utf8'));
const j = (v) => JSON.stringify(v ?? []);

const topics = read('topics.json').topics;
const cards = read('flashcards.json').cards;
const questions = read('questions.json').questions;
const placement = read('placementTest.json').questions;

const upsertQuestion = (db, q, isPlacement) =>
  db.query(
    `INSERT INTO questions (id, topic_id, level, is_placement, tipe, pertanyaan, pilihan,
       jawaban_benar, penjelasan, petunjuk, related_card_ids)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     ON CONFLICT (id) DO UPDATE SET topic_id = EXCLUDED.topic_id, level = EXCLUDED.level,
       pertanyaan = EXCLUDED.pertanyaan, pilihan = EXCLUDED.pilihan,
       jawaban_benar = EXCLUDED.jawaban_benar, penjelasan = EXCLUDED.penjelasan,
       petunjuk = EXCLUDED.petunjuk, related_card_ids = EXCLUDED.related_card_ids`,
    [q.id, q.topicId, isPlacement ? null : q.level, isPlacement, q.tipe || 'pilihan_ganda',
     q.pertanyaan, JSON.stringify(q.pilihan), q.jawabanBenar, q.penjelasan || '', q.petunjuk || null, j(q.relatedCardIds)]
  );

await withTx(async (db) => {
  for (const t of topics) {
    await db.query(
      `INSERT INTO topics (id, nama, deskripsi, urutan) VALUES ($1, $2, $3, $4)
       ON CONFLICT (id) DO UPDATE SET nama = EXCLUDED.nama, deskripsi = EXCLUDED.deskripsi,
         urutan = EXCLUDED.urutan`,
      [t.id, t.nama, t.deskripsi, t.urutan]
    );
  }
  for (const c of cards) {
    await db.query(
      `INSERT INTO cards (id, topic_id, depan, belakang, related_question_ids)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (id) DO UPDATE SET topic_id = EXCLUDED.topic_id, depan = EXCLUDED.depan,
         belakang = EXCLUDED.belakang, related_question_ids = EXCLUDED.related_question_ids`,
      [c.id, c.topicId, c.depan, JSON.stringify(c.belakang), j(c.relatedQuestionIds)]
    );
  }
  for (const q of questions) await upsertQuestion(db, q, false);
  for (const q of placement) await upsertQuestion(db, q, true);
});

console.log(`Seed selesai: ${topics.length} topik, ${cards.length} kartu, ${questions.length} soal kuis, ${placement.length} soal tes awal.`);
await pool.end();
