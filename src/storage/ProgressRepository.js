// Repositori Progres: satu-satunya tempat yang membaca & menulis
// AsyncStorage untuk data progres. Formatnya key-value berisi JSON.
//
// Bentuk data yang disimpan (StorageKeys.PROGRESS):
// {
//   version: 1,
//   topics: { [topicId]: { level, state, lastQuizScore } },
//   cards:  { [cardId]: { status, lastSeenAt } },
//   quizSessions: [ { id, topicId, level, benar, total, timestamp } ],
//   placementResult: { [topicId]: level }
// }

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/storageKeys';
import { Level, CardStatus, TopicState } from '../constants/enums';

const EMPTY = {
  version: 1,
  topics: {},
  cards: {},
  quizSessions: [],
  placementResult: null,
};

async function readAll() {
  try {
    const raw = await AsyncStorage.getItem(StorageKeys.PROGRESS);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw);
    return { ...EMPTY, ...parsed };
  } catch (e) {
    console.warn('ProgressRepository.readAll gagal:', e);
    return { ...EMPTY };
  }
}

async function writeAll(data) {
  try {
    await AsyncStorage.setItem(StorageKeys.PROGRESS, JSON.stringify(data));
  } catch (e) {
    console.warn('ProgressRepository.writeAll gagal:', e);
  }
}

export const ProgressRepository = {
  async getAll() {
    return readAll();
  },

  async reset() {
    await AsyncStorage.multiRemove([StorageKeys.PROGRESS, StorageKeys.PLACEMENT_DONE]);
  },

  async isPlacementDone() {
    const v = await AsyncStorage.getItem(StorageKeys.PLACEMENT_DONE);
    return v === '1';
  },

  async markPlacementDone() {
    await AsyncStorage.setItem(StorageKeys.PLACEMENT_DONE, '1');
  },

  async savePlacementResult(perTopicLevel) {
    const data = await readAll();
    data.placementResult = perTopicLevel;
    Object.entries(perTopicLevel).forEach(([topicId, level]) => {
      data.topics[topicId] = {
        level,
        state: level === Level.SULIT ? TopicState.DIKUASAI : TopicState.BELUM_MULAI,
        lastQuizScore: null,
      };
    });
    await writeAll(data);
  },

  async getTopicProgress(topicId) {
    const data = await readAll();
    return (
      data.topics[topicId] || {
        level: Level.MUDAH,
        state: TopicState.BELUM_MULAI,
        lastQuizScore: null,
      }
    );
  },

  async setTopicProgress(topicId, patch) {
    const data = await readAll();
    data.topics[topicId] = { ...(data.topics[topicId] || {}), ...patch };
    await writeAll(data);
  },

  async setCardStatus(cardId, status) {
    const data = await readAll();
    data.cards[cardId] = { status, lastSeenAt: Date.now() };
    await writeAll(data);
  },

  async getCardStatus(cardId) {
    const data = await readAll();
    return data.cards[cardId]?.status || CardStatus.BARU;
  },

  async addQuizSession(session) {
    const data = await readAll();
    data.quizSessions.push({ ...session, id: `qs-${Date.now()}` });
    await writeAll(data);
  },

  // Persentase kartu Dikuasai untuk topik tertentu, dipakai AdaptiveEngine.
  async getMasteredPercentage(topicId, allCardIds) {
    if (!allCardIds || allCardIds.length === 0) return 0;
    const data = await readAll();
    const mastered = allCardIds.filter(
      (id) => data.cards[id]?.status === CardStatus.DIKUASAI
    ).length;
    return mastered / allCardIds.length;
  },
};
