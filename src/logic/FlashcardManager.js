// Pengelola flashcard: menyusun urutan kartu untuk satu sesi belajar.
// Mode:
//   'semua'  -> semua kartu topik, urutan sesuai JSON
//   'ulang'  -> hanya kartu dengan status Baru atau Sedang dipelajari
//
// Siswa menilai sendiri dengan "Sudah paham" / "Ulangi lagi".
// "Ulangi lagi" memindahkan kartu ke akhir tumpukan (dipakai di screen).

import { CardStatus } from '../constants/enums';
import { ContentRepository } from '../storage/ContentRepository';
import { ProgressRepository } from '../storage/ProgressRepository';

export const FlashcardManager = {
  async buildSession(topicId, mode = 'semua') {
    const all = ContentRepository.getFlashcardsByTopic(topicId);
    const progress = await ProgressRepository.getAll();
    const withStatus = all.map((c) => ({
      ...c,
      status: progress.cards[c.id]?.status || CardStatus.BARU,
    }));
    if (mode === 'ulang') {
      return withStatus.filter((c) => c.status !== CardStatus.DIKUASAI);
    }
    return withStatus;
  },

  async markPaham(cardId) {
    await ProgressRepository.setCardStatus(cardId, CardStatus.DIKUASAI);
  },

  async markUlangi(cardId) {
    const prev = await ProgressRepository.getCardStatus(cardId);
    const next =
      prev === CardStatus.BARU ? CardStatus.SEDANG_DIPELAJARI : prev;
    await ProgressRepository.setCardStatus(cardId, next);
  },
};
