// Repositori Konten: satu-satunya tempat yang membaca berkas JSON konten.
// Hanya data tampilan statis (topik & kartu). Soal kuis/tes penempatan dan
// penilaiannya ada di server (lihat src/logic).

import topicsJson from '../data/topics.json';
import flashcardsJson from '../data/flashcards.json';

export const ContentRepository = {
  getAllTopics() {
    return [...topicsJson.topics].sort((a, b) => a.urutan - b.urutan);
  },
  getTopics() {
    return this.getAllTopics();
  },
  getTopicById(id) {
    return topicsJson.topics.find((t) => t.id === id) || null;
  },
  getFlashcardsByTopic(topicId) {
    return flashcardsJson.cards.filter((c) => c.topicId === topicId);
  },
  getFlashcardById(cardId) {
    return flashcardsJson.cards.find((c) => c.id === cardId) || null;
  },
};
