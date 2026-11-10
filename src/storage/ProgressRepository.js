// Repositori Progres: membaca & menulis progres lewat API server.
// Bentuk getAll():
// { topics: {[topicId]: {level,state,lastQuizScore}}, cards: {[cardId]: {status,lastSeenAt}},
//   quizSessions: [...], placementDone, placementResult }
// Level topik, sesi kuis, dan hasil tes penempatan ditulis server saat submit.

import { api } from '../api/client';
import { CardStatus } from '../constants/enums';

export const ProgressRepository = {
  async getAll() {
    const data = await api.get('/progress');
    return {
      topics: {},
      cards: {},
      quizSessions: [],
      placementDone: false,
      placementResult: null,
      ...data,
    };
  },

  async reset() {
    await api.delete('/progress');
  },

  async isPlacementDone() {
    return (await this.getAll()).placementDone;
  },

  async setCardStatus(cardId, status) {
    await api.put(`/cards/${cardId}/status`, { status });
  },

  async getCardStatus(cardId) {
    const all = await this.getAll();
    return all.cards[cardId]?.status || CardStatus.BARU;
  },
};
