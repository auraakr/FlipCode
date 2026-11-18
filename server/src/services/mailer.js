import nodemailer from 'nodemailer';

let transporter;
function getTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('SMTP_USER / SMTP_PASS belum diisi di server/.env');
  }
  transporter ??= nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS.replace(/\s+/g, '') },
  });
  return transporter;
}

export async function sendResetCode(to, nama, code) {
  await getTransporter().sendMail({
    from: `"FlipCode" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Kode reset password FlipCode',
    text: `Halo ${nama},\n\nKode reset password kamu: ${code}\nKode berlaku 10 menit. Jika bukan kamu yang meminta, abaikan email ini.`,
    html: `<p>Halo ${nama.replace(/[<>&]/g, '')},</p>
<p>Kode reset password kamu:</p>
<p style="font-size:28px;font-weight:bold;letter-spacing:6px">${code}</p>
<p>Kode berlaku 10 menit. Jika bukan kamu yang meminta, abaikan email ini.</p>`,
  });
}
