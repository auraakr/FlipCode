# FlipCode — Adaptive Flashcard Learning App

Aplikasi belajar pemrograman dasar berbasis flashcard dengan jalur belajar
adaptif. UTS Mobile Programming, Kelompok 8, IK300, Universitas Pendidikan
Indonesia.

## Stack

- **React Native + Expo** (SDK 51)
- **React Navigation** (native-stack + bottom-tabs)
- **react-native-reanimated**, **react-native-gesture-handler**
- **AsyncStorage** untuk progres belajar
- **Konten** dalam berkas JSON (`src/data/`)

Tanpa server, tanpa login, tanpa database cloud.

## Jalankan di lokal

Butuh Node.js 18+ dan aplikasi **Expo Go** di HP, atau emulator Android/iOS.

```bash
npm install
npm start
```

Lalu pindai QR dengan Expo Go, atau tekan `a` (Android) / `i` (iOS) di terminal.

## Struktur folder

```
flipcode/
├── App.js                     # entry point
├── app.json                   # konfigurasi Expo
├── babel.config.js
├── package.json
└── src/
    ├── navigation/
    │   └── AppNavigator.js    # alur: Welcome -> Tes Awal -> MainTabs
    ├── screens/               # 1 berkas per layar
    │   ├── WelcomeScreen.js
    │   ├── PlacementTestScreen.js
    │   ├── PlacementResultScreen.js
    │   ├── HomeScreen.js      # Beranda / Learning Path (tab)
    │   ├── FlashcardScreen.js
    │   ├── QuizScreen.js      # soal + feedback dalam satu layar
    │   ├── QuizResultScreen.js
    │   ├── ProgressScreen.js  # tab
    │   └── SettingsScreen.js  # tab
    ├── components/            # komponen pakai ulang
    │   ├── Flashcard.js       # kartu dua sisi
    │   ├── LevelBadge.js
    │   ├── ProgressBar.js
    │   └── PrimaryButton.js
    ├── logic/                 # LAPISAN LOGIKA (lihat class diagram)
    │   ├── PlacementTest.js   # mengatur tes awal 9 soal
    │   ├── AdaptiveEngine.js  # aturan naik/turun level
    │   ├── FlashcardManager.js
    │   └── QuizManager.js
    ├── storage/               # LAPISAN DATA
    │   ├── ContentRepository.js  # baca JSON konten
    │   └── ProgressRepository.js # baca/tulis AsyncStorage
    ├── data/                  # KONTEN (silakan diisi oleh penulis konten)
    │   ├── topics.json
    │   ├── flashcards.json    # target 30 kartu (10/topik)
    │   ├── questions.json     # target 45 soal (15/topik: 5 Mudah/Sedang/Sulit)
    │   └── placementTest.json # 9 soal (3/topik)
    └── constants/
        ├── enums.js           # Level, CardStatus, TopicState, QuestionType
        ├── storageKeys.js
        └── theme.js           # warna, spacing, typography
```

## Tiga lapis (sesuai arsitektur di PPT)

1. **Presentasi** → `src/screens` dan `src/components`
2. **Logika** → `src/logic` (PlacementTest, AdaptiveEngine, FlashcardManager, QuizManager)
3. **Data** → `src/storage` (ContentRepository baca JSON, ProgressRepository tulis AsyncStorage)

Lapisan presentasi tidak boleh langsung menyentuh AsyncStorage; selalu lewat
`ProgressRepository`. Lapisan logika tidak boleh langsung menyentuh JSON;
selalu lewat `ContentRepository`.

## Aturan adaptif (ada di AdaptiveEngine.js)

**Tes awal (per topik, 3 soal):**
| Benar | Level awal |
|---|---|
| 0–1 | Mudah |
| 2 | Sedang |
| 3 | Sulit |

**Kuis (5 soal per sesi):**
| Benar | Keputusan |
|---|---|
| 4–5 | Level naik |
| 3 | Level tetap |
| 0–2 | Level turun + saran ulang flashcard |

**Topik dikuasai:** kuis level Sulit benar 4–5 **dan** minimal 70% kartu
berstatus Dikuasai.

Semua konstanta ada di `src/logic/AdaptiveEngine.js`. Ubah di satu tempat,
seluruh aplikasi ikut berubah.

## Pembagian tugas (lihat PPT slide 14)

| Peran | Fokus kode |
|---|---|
| Desainer UI (Aisyah) | `components/`, `screens/*` tampilan, `constants/theme.js` |
| Pengembang 1 (Arya) | `screens/HomeScreen`, `FlashcardScreen`, `storage/ProgressRepository` |
| Pengembang 2 (Aura) | `screens/QuizScreen`, `PlacementTestScreen`, `logic/QuizManager`, `logic/PlacementTest`, `logic/AdaptiveEngine` |
| Penulis Konten (Azmi) | `src/data/*.json` |
| Penguji (Citra) | skenario uji + bantu laporan |

## Mengisi konten

Buka `src/data/`. Setiap berkas sudah berisi satu contoh entri untuk
menunjukkan formatnya. Hapus field `_catatan` saat sudah tidak perlu.

Minimal yang harus diisi supaya aplikasi bisa dites:
- `placementTest.json` → 9 soal (3/topik)
- `questions.json` → setidaknya 5 soal per topik per level
- `flashcards.json` → beberapa kartu per topik

Aplikasi tidak perlu di-build ulang: cukup simpan JSON lalu reload (tekan `r`
di terminal Expo).

## Pengujian cepat alur

1. Hapus data aplikasi (Pengaturan → Reset Progres).
2. Welcome → Mulai → kerjakan 9 soal tes awal → lihat level per topik.
3. Beranda → pilih topik → buka Flashcard, tandai 'Sudah paham'/'Ulangi lagi'.
4. Kembali ke Beranda → buka Kuis → jawab 5 soal → cek hasil dan perubahan level.
5. Tab Progres → cek persentase kartu dikuasai.

## Catatan ikon dan splash

Folder `assets/` sengaja kosong. Letakkan di sini:
- `icon.png` (1024×1024)
- `splash.png` (1284×2778)
- `adaptive-icon.png` (1024×1024, foreground Android)
- `favicon.png` (48×48, untuk web)

Expo akan membuat placeholder otomatis saat pertama kali `npm start`
kalau berkas belum ada, jadi aman untuk pengujian awal.
