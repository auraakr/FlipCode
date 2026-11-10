// Spesifikasi OpenAPI 3 untuk FlipCode API. Ditampilkan sebagai Swagger UI di /docs.
// Kalau mengubah endpoint di routes/, perbarui juga berkas ini.

const json = (schema, example) => ({
  'application/json': { schema, ...(example ? { example } : {}) },
});
const ref = (name) => ({ $ref: `#/components/schemas/${name}` });
const err = (description) => ({ description, content: json(ref('Error')) });
const secured = [{ bearerAuth: [] }];

export const openapi = {
  openapi: '3.0.3',
  info: {
    title: 'FlipCode API',
    version: '0.1.0',
    description:
      'Backend FlipCode. Semua endpoint selain /auth/register, /auth/login, dan /health ' +
      'butuh token: login dulu, salin `token`, klik tombol **Authorize** di kanan atas, lalu tempel.',
  },
  servers: [{ url: '/', description: 'Server saat ini' }],
  tags: [
    { name: 'Auth' },
    { name: 'Konten' },
    { name: 'Tes Awal' },
    { name: 'Kuis' },
    { name: 'Progres' },
  ],
  components: {
    securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
    schemas: {
      Error: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Pesan error' } },
      Level: { type: 'string', enum: ['Mudah', 'Sedang', 'Sulit'] },
      TopicState: { type: 'string', enum: ['Belum mulai', 'Sedang dipelajari', 'Dikuasai'] },
      CardStatus: { type: 'string', enum: ['Baru', 'Sedang dipelajari', 'Dikuasai'] },
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          nama: { type: 'string' },
          email: { type: 'string' },
          placementDone: { type: 'boolean' },
        },
      },
      AuthResult: {
        type: 'object',
        properties: { token: { type: 'string' }, user: ref('User') },
      },
      Topic: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'variabel' },
          nama: { type: 'string' },
          deskripsi: { type: 'string' },
          urutan: { type: 'integer' },
        },
      },
      Card: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'var-01' },
          topicId: { type: 'string' },
          depan: { type: 'string' },
          belakang: { type: 'object', description: 'Isi sisi belakang (penjelasan, contoh kode, analogi)' },
          relatedQuestionIds: { type: 'array', items: { type: 'string' } },
        },
      },
      Question: {
        type: 'object',
        description: 'Soal untuk klien. Tidak berisi kunci jawaban.',
        properties: {
          id: { type: 'string', example: 'q-var-mudah-01' },
          topicId: { type: 'string' },
          level: { type: 'string', nullable: true },
          tipe: { type: 'string', example: 'pilihan_ganda' },
          pertanyaan: { type: 'string' },
          pilihan: { type: 'array', items: { type: 'string' } },
        },
      },
      AnswerInput: {
        type: 'object',
        required: ['questionId', 'pilihan'],
        properties: {
          questionId: { type: 'string' },
          pilihan: { type: 'integer', description: 'Index pilihan (mulai 0)' },
        },
      },
      AnswerDetail: {
        type: 'object',
        properties: {
          questionId: { type: 'string' },
          topicId: { type: 'string' },
          dipilih: { type: 'integer', nullable: true },
          jawabanBenar: { type: 'integer' },
          benar: { type: 'boolean' },
          penjelasan: { type: 'string' },
          relatedCardIds: { type: 'array', items: { type: 'string' } },
        },
      },
      SubmitBody: {
        type: 'object',
        required: ['sessionId', 'jawaban'],
        properties: {
          sessionId: { type: 'integer' },
          jawaban: { type: 'array', items: ref('AnswerInput') },
        },
      },
    },
  },
  paths: {
    '/health': {
      get: {
        tags: ['Auth'],
        summary: 'Cek server hidup',
        responses: { 200: { description: 'OK', content: json({ type: 'object' }, { ok: true }) } },
      },
    },

    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Daftar akun baru',
        requestBody: {
          required: true,
          content: json(
            {
              type: 'object',
              required: ['nama', 'email', 'password'],
              properties: {
                nama: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string', minLength: 6 },
              },
            },
            { nama: 'Tes', email: 'tes@mail.com', password: '123456' }
          ),
        },
        responses: {
          201: { description: 'Akun dibuat', content: json(ref('AuthResult')) },
          400: err('Data tidak lengkap atau password kurang dari 6 karakter'),
          409: err('Email sudah terdaftar'),
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Masuk dan ambil token',
        requestBody: {
          required: true,
          content: json(
            {
              type: 'object',
              required: ['email', 'password'],
              properties: { email: { type: 'string' }, password: { type: 'string' } },
            },
            { email: 'tes@mail.com', password: '123456' }
          ),
        },
        responses: {
          200: { description: 'Berhasil', content: json(ref('AuthResult')) },
          401: err('Email atau password salah'),
        },
      },
    },
    '/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Data user yang sedang login',
        security: secured,
        responses: {
          200: { description: 'OK', content: json({ type: 'object', properties: { user: ref('User') } }) },
          401: err('Token tidak ada atau tidak valid'),
        },
      },
    },

    '/topics': {
      get: {
        tags: ['Konten'],
        summary: 'Daftar topik (terurut)',
        security: secured,
        responses: {
          200: {
            description: 'OK',
            content: json({ type: 'object', properties: { topics: { type: 'array', items: ref('Topic') } } }),
          },
          401: err('Token tidak ada atau tidak valid'),
        },
      },
    },
    '/topics/{id}/cards': {
      get: {
        tags: ['Konten'],
        summary: 'Semua flashcard dalam satu topik',
        security: secured,
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'variabel' }],
        responses: {
          200: {
            description: 'OK',
            content: json({ type: 'object', properties: { cards: { type: 'array', items: ref('Card') } } }),
          },
          401: err('Token tidak ada atau tidak valid'),
        },
      },
    },
    '/cards/{id}': {
      get: {
        tags: ['Konten'],
        summary: 'Satu flashcard',
        security: secured,
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'var-01' }],
        responses: {
          200: { description: 'OK', content: json({ type: 'object', properties: { card: ref('Card') } }) },
          404: err('Kartu tidak ditemukan'),
        },
      },
    },

    '/placement/start': {
      post: {
        tags: ['Tes Awal'],
        summary: 'Mulai tes awal (3 soal per topik, tanpa kunci jawaban)',
        security: secured,
        responses: {
          201: {
            description: 'Sesi dibuat',
            content: json({
              type: 'object',
              properties: { sessionId: { type: 'integer' }, questions: { type: 'array', items: ref('Question') } },
            }),
          },
        },
      },
    },
    '/placement/submit': {
      post: {
        tags: ['Tes Awal'],
        summary: 'Kirim jawaban tes awal dan tentukan level awal per topik',
        description: 'Benar 0-1 per topik = Mudah, 2 = Sedang, 3 = Sulit (topik langsung Dikuasai).',
        security: secured,
        requestBody: { required: true, content: json(ref('SubmitBody')) },
        responses: {
          200: {
            description: 'Hasil',
            content: json(
              {
                type: 'object',
                properties: {
                  perTopic: { type: 'object', description: '{ topicId: { benar, total } }' },
                  perTopicLevel: { type: 'object', description: '{ topicId: Level }' },
                  detail: { type: 'array', items: ref('AnswerDetail') },
                },
              },
              { perTopic: { variabel: { benar: 2, total: 3 } }, perTopicLevel: { variabel: 'Sedang' } }
            ),
          },
          404: err('Sesi tidak ditemukan'),
          409: err('Sesi sudah dikirim'),
        },
      },
    },

    '/quiz/start': {
      post: {
        tags: ['Kuis'],
        summary: 'Mulai kuis (5 soal sesuai level user di topik itu)',
        security: secured,
        requestBody: {
          required: true,
          content: json(
            { type: 'object', required: ['topicId'], properties: { topicId: { type: 'string' } } },
            { topicId: 'variabel' }
          ),
        },
        responses: {
          201: {
            description: 'Sesi dibuat. Soal tidak berisi kunci jawaban.',
            content: json({
              type: 'object',
              properties: {
                sessionId: { type: 'integer' },
                topicId: { type: 'string' },
                level: ref('Level'),
                questions: { type: 'array', items: ref('Question') },
              },
            }),
          },
          404: err('Topik tidak ditemukan atau belum ada soal untuk topik/level ini'),
        },
      },
    },
    '/quiz/submit': {
      post: {
        tags: ['Kuis'],
        summary: 'Kirim jawaban kuis; server menilai dan menghitung level baru',
        description:
          'Benar 4-5: level naik. Benar 3: tetap. Benar 0-2: turun dan `saranUlang` bernilai true. ' +
          'Topik Dikuasai kalau kuis level Sulit benar 4-5 dan minimal 70% kartu topik berstatus Dikuasai.',
        security: secured,
        requestBody: { required: true, content: json(ref('SubmitBody')) },
        responses: {
          200: {
            description: 'Hasil',
            content: json(
              {
                type: 'object',
                properties: {
                  benar: { type: 'integer' },
                  total: { type: 'integer' },
                  detail: { type: 'array', items: ref('AnswerDetail') },
                  adapt: {
                    type: 'object',
                    properties: {
                      nextLevel: ref('Level'),
                      delta: { type: 'integer' },
                      saranUlang: { type: 'boolean' },
                    },
                  },
                  pct: { type: 'number', description: 'Persentase kartu Dikuasai di topik (0..1)' },
                  topicState: ref('TopicState'),
                },
              },
              { benar: 4, total: 5, adapt: { nextLevel: 'Sedang', delta: 1, saranUlang: false }, pct: 0.3, topicState: 'Sedang dipelajari' }
            ),
          },
          404: err('Sesi tidak ditemukan'),
          409: err('Sesi sudah dikirim'),
        },
      },
    },

    '/progress': {
      get: {
        tags: ['Progres'],
        summary: 'Seluruh progres user',
        security: secured,
        responses: {
          200: {
            description: 'OK',
            content: json(
              {
                type: 'object',
                properties: {
                  topics: { type: 'object', description: '{ topicId: { level, state, lastQuizScore } }' },
                  cards: { type: 'object', description: '{ cardId: { status, lastSeenAt } }' },
                  quizSessions: { type: 'array', items: { type: 'object' } },
                  placementDone: { type: 'boolean' },
                  placementResult: { type: 'object', description: '{ topicId: Level }' },
                },
              },
              {
                topics: { variabel: { level: 'Sedang', state: 'Sedang dipelajari', lastQuizScore: '4/5' } },
                cards: { 'var-01': { status: 'Dikuasai', lastSeenAt: 1793706632000 } },
                quizSessions: [],
                placementDone: true,
                placementResult: { variabel: 'Sedang' },
              }
            ),
          },
        },
      },
      delete: {
        tags: ['Progres'],
        summary: 'Reset seluruh progres user (untuk menu Pengaturan)',
        security: secured,
        responses: { 200: { description: 'OK', content: json({ type: 'object' }, { ok: true }) } },
      },
    },
    '/cards/{id}/review': {
      post: {
        tags: ['Progres'],
        summary: "Penilaian diri kartu: 'paham' -> Dikuasai, 'ulangi' -> Sedang dipelajari (jika masih Baru)",
        security: secured,
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'var-01' }],
        requestBody: {
          required: true,
          content: json(
            { type: 'object', required: ['hasil'], properties: { hasil: { type: 'string', enum: ['paham', 'ulangi'] } } },
            { hasil: 'paham' }
          ),
        },
        responses: {
          200: { description: 'OK', content: json({ type: 'object' }, { ok: true, status: 'Dikuasai' }) },
          400: err("Hasil harus 'paham' atau 'ulangi'"),
          404: err('Kartu tidak ditemukan'),
        },
      },
    },
    '/cards/{id}/status': {
      put: {
        tags: ['Progres'],
        summary: 'Ubah status satu kartu (Sudah paham / Ulangi lagi)',
        security: secured,
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'var-01' }],
        requestBody: {
          required: true,
          content: json(
            { type: 'object', required: ['status'], properties: { status: ref('CardStatus') } },
            { status: 'Dikuasai' }
          ),
        },
        responses: {
          200: { description: 'OK', content: json({ type: 'object' }, { ok: true }) },
          400: err('Status tidak valid'),
          404: err('Kartu tidak ditemukan'),
        },
      },
    },
  },
};
