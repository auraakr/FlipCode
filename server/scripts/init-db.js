// Menjalankan sql/schema.sql ke database di DATABASE_URL.
// Database-nya harus sudah ada (di Supabase sudah otomatis; lokal: CREATE DATABASE flipcode).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from '../src/db.js';

const dir = path.dirname(fileURLToPath(import.meta.url));
await pool.query(fs.readFileSync(path.join(dir, '../sql/schema.sql'), 'utf8'));
console.log('Skema database siap.');
await pool.end();
