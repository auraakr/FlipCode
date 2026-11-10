// Pengelola flashcard: menyusun urutan kartu satu sesi belajar dan menyimpan
// status kartu ke server.
//   'semua' -> semua kartu topik
//   'ulang' -> hanya kartu berstatus Baru atau Sedang dipelajari

import { api } from '../api/client';
import { CardStatus } from '../constants/enums';
import { ProgressRepository } from '../storage/ProgressRepository';

export const FlashcardManager = {
  async buildSession(topicId, mode = 'semua') {
    const [{ cards }, progress] = await Promise.all([
      api.get(`/topics/${topicId}/cards`),
      ProgressRepository.getAll(),
    ]);
    const withStatus = cards.map((c) => ({
      ...c,
      status: progress.cards[c.id]?.status || CardStatus.BARU,
    }));
    return mode === 'ulang'
      ? withStatus.filter((c) => c.status !== CardStatus.DIKUASAI)
      : withStatus;
  },

  async markPaham(cardId) {
    await ProgressRepository.setCardStatus(cardId, CardStatus.DIKUASAI);
  },

  async markUlangi(cardId) {
    const prev = await ProgressRepository.getCardStatus(cardId);
    const next = prev === CardStatus.BARU ? CardStatus.SEDANG_DIPELAJARI : prev;
    await ProgressRepository.setCardStatus(cardId, next);
  },
};
