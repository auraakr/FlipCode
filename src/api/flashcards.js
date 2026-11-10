// Klien API flashcard. Status kartu dan aturan penilaian diri disimpan di server.
//   mode 'semua' -> semua kartu topik
//   mode 'ulang' -> hanya kartu berstatus Baru atau Sedang dipelajari

import { api } from './client';
import { CardStatus } from '../constants/enums';
import { ProgressRepository } from '../storage/ProgressRepository';

export const FlashcardApi = {
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

  markPaham: (cardId) => api.post(`/cards/${cardId}/review`, { hasil: 'paham' }),
  markUlangi: (cardId) => api.post(`/cards/${cardId}/review`, { hasil: 'ulangi' }),
};
