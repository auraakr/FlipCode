// Uji alur API end-to-end. Menyalakan server di port acak, membuat data uji
// sementara (topik "zz_test" + akun uji), menjalankan semua endpoint, lalu
// menghapus data uji. Dijalankan: npm run test:api
import { pool } from '../src/db.js';
import { app } from '../src/app.js';

const TOPIC = 'zz_test';
const EMAIL = `test-api-${Date.now()}@example.test`;
const PASSWORD = 'rahasia123';

let pass = 0;
let fail = 0;
function check(name, cond, extra = '') {
  if (cond) {
    pass += 1;
    console.log(`  ok   ${name}`);
  } else {
    fail += 1;
    console.log(`  GAGAL ${name} ${extra ? '-> ' + extra : ''}`);
  }
}
const section = (t) => console.log(`\n${t}`);

async function cleanup() {
  await pool.query("DELETE FROM users WHERE email LIKE 'test-api-%@example.test'");
  await pool.query('DELETE FROM questions WHERE topic_id = $1', [TOPIC]);
  await pool.query('DELETE FROM cards WHERE topic_id = $1', [TOPIC]);
  await pool.query('DELETE FROM topics WHERE id = $1', [TOPIC]);
}

async function seedFixture() {
  await pool.query(
    "INSERT INTO topics (id, nama, deskripsi, urutan) VALUES ($1, 'Topik Uji', 'Data uji sementara', 999)",
    [TOPIC]
  );
  for (let i = 1; i <= 10; i++) {
    const id = `zz-c-${String(i).padStart(2, '0')}`;
    await pool.query(
      'INSERT INTO cards (id, topic_id, depan, belakang, related_question_ids) VALUES ($1, $2, $3, $4, $5)',
      [id, TOPIC, `Depan ${i}`, JSON.stringify({ penjelasan: `Penjelasan ${i}` }), '[]']
    );
  }
  const q = (id, level, isPlacement) =>
    pool.query(
      `INSERT INTO questions (id, topic_id, level, is_placement, pertanyaan, pilihan,
         jawaban_benar, penjelasan, related_card_ids)
       VALUES ($1, $2, $3, $4, $5, $6, 1, $7, $8)`,
      [id, TOPIC, level, isPlacement, `Soal ${id}`, JSON.stringify(['A', 'B', 'C', 'D']),
       `Penjelasan ${id}`, JSON.stringify(['zz-c-01'])]
    );
  for (const [lv, key] of [['Mudah', 'mudah'], ['Sedang', 'sedang'], ['Sulit', 'sulit']]) {
    for (let i = 1; i <= 5; i++) await q(`zz-q-${key}-${i}`, lv, false);
  }
  for (let i = 1; i <= 3; i++) await q(`zz-pt-${i}`, null, true);
}

await cleanup();
await seedFixture();

const server = app.listen(0);
const base = `http://127.0.0.1:${server.address().port}`;
let token = null;

async function call(method, path, body, useToken = true, tokenOverride) {
  const headers = { 'Content-Type': 'application/json' };
  const t = tokenOverride ?? (useToken ? token : null);
  if (t) headers.Authorization = `Bearer ${t}`;
  const res = await fetch(base + path, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* tanpa body */
  }
  return { status: res.status, data };
}

// Jawaban untuk semua soal: benar = pilihan 1 (kunci uji), salah = pilihan 0.
const answers = (questions, nBenar) =>
  questions.map((q, i) => ({ questionId: q.id, pilihan: i < nBenar ? 1 : 0 }));
const noLeak = (questions) =>
  questions.every((q) => !('jawabanBenar' in q) && !('jawaban_benar' in q) && !('penjelasan' in q));

async function runQuiz(nBenar) {
  const start = await call('POST', '/quiz/start', { topicId: TOPIC });
  const submit = await call('POST', '/quiz/submit', {
    sessionId: start.data?.sessionId,
    jawaban: answers(start.data?.questions || [], nBenar),
  });
  return { start, submit };
}

try {
  section('Sistem');
  let r = await call('GET', '/health', undefined, false);
  check('GET /health -> 200', r.status === 200 && r.data?.ok === true);
  r = await call('GET', '/openapi.json', undefined, false);
  check('GET /openapi.json -> 200', r.status === 200 && !!r.data?.paths);
  const docs = await fetch(base + '/docs/');
  check('GET /docs -> 200', docs.status === 200);
  r = await call('GET', '/rute-tidak-ada', undefined, false);
  check('rute tidak dikenal -> 404', r.status === 404);

  section('Auth');
  r = await call('POST', '/auth/register', { nama: 'Uji', email: EMAIL, password: '123' }, false);
  check('register password pendek -> 400', r.status === 400);
  r = await call('POST', '/auth/register', { nama: 'Uji', email: EMAIL, password: PASSWORD }, false);
  check('register -> 201 + token', r.status === 201 && !!r.data?.token, JSON.stringify(r.data));
  r = await call('POST', '/auth/register', { nama: 'Uji', email: EMAIL, password: PASSWORD }, false);
  check('register email kembar -> 409', r.status === 409);
  r = await call('POST', '/auth/login', { email: EMAIL, password: 'salah' }, false);
  check('login password salah -> 401', r.status === 401);
  r = await call('POST', '/auth/login', { email: EMAIL, password: PASSWORD }, false);
  check('login -> 200 + token', r.status === 200 && !!r.data?.token);
  token = r.data?.token;
  r = await call('GET', '/topics', undefined, false);
  check('tanpa token -> 401', r.status === 401);
  r = await call('GET', '/topics', undefined, false, 'token.palsu.sekali');
  check('token palsu -> 401', r.status === 401);
  r = await call('GET', '/auth/me');
  check('GET /auth/me', r.status === 200 && r.data?.user?.email === EMAIL && r.data.user.placementDone === false);

  section('Konten');
  r = await call('GET', '/topics');
  check('GET /topics memuat topik uji', r.status === 200 && r.data.topics.some((t) => t.id === TOPIC));
  r = await call('GET', `/topics/${TOPIC}/cards`);
  check('GET /topics/:id/cards -> 10 kartu', r.status === 200 && r.data.cards.length === 10);
  check('kartu berbentuk camelCase', r.data?.cards?.[0]?.topicId === TOPIC && !!r.data.cards[0].belakang);
  r = await call('GET', '/cards/zz-c-01');
  check('GET /cards/:id', r.status === 200 && r.data.card.id === 'zz-c-01');
  r = await call('GET', '/cards/tidak-ada');
  check('GET /cards/:id tidak ada -> 404', r.status === 404);

  section('Tes awal');
  const ps = await call('POST', '/placement/start');
  const pQs = ps.data?.questions || [];
  const ptest = pQs.filter((q) => q.topicId === TOPIC);
  check('placement/start -> 201', ps.status === 201 && !!ps.data?.sessionId);
  check('placement/start: 3 soal topik uji', ptest.length === 3, `dapat ${ptest.length}`);
  check('placement/start: tidak membocorkan kunci/penjelasan', noLeak(pQs));
  const pAnswers = pQs.map((q) => ({ questionId: q.id, pilihan: q.topicId === TOPIC ? 1 : 0 }));
  r = await call('POST', '/placement/submit', { sessionId: ps.data?.sessionId, jawaban: pAnswers });
  check('placement/submit -> 200', r.status === 200, JSON.stringify(r.data));
  check('3/3 benar -> level Sulit', r.data?.perTopicLevel?.[TOPIC] === 'Sulit');
  check('detail memuat kunci & penjelasan', r.data?.detail?.[0]?.jawabanBenar !== undefined);
  r = await call('POST', '/placement/submit', { sessionId: ps.data?.sessionId, jawaban: pAnswers });
  check('placement/submit dua kali -> 409', r.status === 409);
  r = await call('POST', '/placement/submit', { sessionId: 99999999, jawaban: [] });
  check('placement/submit sesi asing -> 404', r.status === 404);
  r = await call('GET', '/auth/me');
  check('placementDone menjadi true', r.data?.user?.placementDone === true);
  r = await call('GET', '/progress');
  check('progress: topik uji Sulit + Dikuasai',
    r.data?.topics?.[TOPIC]?.level === 'Sulit' && r.data.topics[TOPIC].state === 'Dikuasai',
    JSON.stringify(r.data?.topics?.[TOPIC]));

  section('Progres: reset');
  r = await call('DELETE', '/progress');
  check('DELETE /progress -> 200', r.status === 200);
  r = await call('GET', '/progress');
  check('progress kosong + placementDone false',
    Object.keys(r.data?.topics || {}).length === 0 && r.data?.placementDone === false);

  section('Kuis');
  r = await call('POST', '/quiz/start', { topicId: 'tidak_ada' });
  check('quiz/start topik tidak ada -> 404', r.status === 404);
  r = await call('POST', '/quiz/start', {});
  check('quiz/start tanpa topicId -> 404', r.status === 404);

  let q = await runQuiz(5);
  check('quiz/start -> 201, level Mudah, 5 soal',
    q.start.status === 201 && q.start.data.level === 'Mudah' && q.start.data.questions.length === 5);
  check('quiz/start tidak membocorkan kunci/penjelasan', noLeak(q.start.data?.questions || []));
  check('5/5 benar: naik ke Sedang',
    q.submit.status === 200 && q.submit.data.benar === 5 &&
    q.submit.data.adapt.nextLevel === 'Sedang' && q.submit.data.adapt.delta === 1 &&
    q.submit.data.adapt.saranUlang === false, JSON.stringify(q.submit.data?.adapt));
  check('state menjadi Sedang dipelajari', q.submit.data?.topicState === 'Sedang dipelajari');
  r = await call('POST', '/quiz/submit', { sessionId: q.start.data.sessionId, jawaban: [] });
  check('quiz/submit dua kali -> 409', r.status === 409);
  r = await call('POST', '/quiz/submit', { sessionId: 99999999, jawaban: [] });
  check('quiz/submit sesi asing -> 404', r.status === 404);

  q = await runQuiz(3);
  check('level kuis kedua = Sedang', q.start.data?.level === 'Sedang');
  check('3 benar: level tetap', q.submit.data?.adapt?.nextLevel === 'Sedang' && q.submit.data.adapt.delta === 0);

  q = await runQuiz(0);
  check('0 benar: turun ke Mudah + saranUlang',
    q.submit.data?.adapt?.nextLevel === 'Mudah' && q.submit.data.adapt.saranUlang === true,
    JSON.stringify(q.submit.data?.adapt));
  check('jawaban kosong dinilai salah', q.submit.data?.benar === 0);

  section('Kartu');
  r = await call('PUT', '/cards/zz-c-01/status', { status: 'ngawur' });
  check('status kartu tidak valid -> 400', r.status === 400);
  r = await call('PUT', '/cards/tidak-ada/status', { status: 'Dikuasai' });
  check('kartu tidak ada -> 404', r.status === 404);
  let allOk = true;
  for (let i = 1; i <= 10; i++) {
    const id = `zz-c-${String(i).padStart(2, '0')}`;
    r = await call('PUT', `/cards/${id}/status`, { status: 'Dikuasai' });
    if (r.status !== 200) allOk = false;
  }
  check('10 kartu ditandai Dikuasai', allOk);
  r = await call('PUT', '/cards/zz-c-01/status', { status: 'Sedang dipelajari' });
  check('status kartu dapat diubah lagi', r.status === 200);
  await call('PUT', '/cards/zz-c-01/status', { status: 'Dikuasai' });

  section('Kuis sampai topik Dikuasai');
  q = await runQuiz(5);
  check('Mudah -> Sedang', q.submit.data?.adapt?.nextLevel === 'Sedang');
  q = await runQuiz(5);
  check('Sedang -> Sulit', q.submit.data?.adapt?.nextLevel === 'Sulit');
  q = await runQuiz(5);
  check('kuis Sulit 5/5 + 100% kartu -> Dikuasai',
    q.start.data?.level === 'Sulit' && q.submit.data?.topicState === 'Dikuasai' && q.submit.data.pct === 1,
    JSON.stringify({ lv: q.start.data?.level, st: q.submit.data?.topicState, pct: q.submit.data?.pct }));

  section('Progres: hasil akhir');
  r = await call('GET', '/progress');
  check('progress: 10 kartu Dikuasai',
    Object.values(r.data?.cards || {}).filter((c) => c.status === 'Dikuasai').length === 10);
  check('progress: riwayat kuis tercatat (6 sesi)', (r.data?.quizSessions || []).length === 6,
    `dapat ${(r.data?.quizSessions || []).length}`);
  check('progress: skor terakhir tersimpan', typeof r.data?.topics?.[TOPIC]?.lastQuizScore === 'string');
} catch (e) {
  fail += 1;
  console.log(`\n  GAGAL skrip berhenti karena error: ${e.stack || e}`);
} finally {
  server.close();
  try {
    await cleanup();
    console.log('\nData uji dihapus.');
  } catch (e) {
    console.log(`\nPERINGATAN: gagal menghapus data uji (${e.message}). Hapus manual topik "${TOPIC}" dan user test-api-*.`);
  }
  await pool.end();
}

console.log(`\nHasil: ${pass} lulus, ${fail} gagal`);
process.exit(fail ? 1 : 0);
