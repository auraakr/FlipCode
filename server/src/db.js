import pg from 'pg';
import 'dotenv/config';

// COUNT(*) dan BIGINT dikembalikan pg sebagai string; jadikan angka.
pg.types.setTypeParser(20, Number);

const url = process.env.DATABASE_URL;
const isLocal = !url || /@(localhost|127\.0\.0\.1)/.test(url);
const ssl = process.env.DB_SSL === 'false' || isLocal ? false : { rejectUnauthorized: false };

export const pool = new pg.Pool({ connectionString: url, ssl, max: 10 });

export async function rows(text, params) {
  return (await pool.query(text, params)).rows;
}

export async function first(text, params) {
  return (await pool.query(text, params)).rows[0] || null;
}

// Jalankan fn(client) dalam satu transaksi.
export async function withTx(fn) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}
