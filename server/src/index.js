import 'dotenv/config';
import { app } from './app.js';

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET belum diatur. Salin .env.example ke .env lalu isi.');
  process.exit(1);
}

const port = Number(process.env.PORT || 3000);
app.listen(port, '0.0.0.0', () => console.log(`FlipCode API berjalan di http://localhost:${port}`));
