// Repositori Konten: satu-satunya tempat yang membaca berkas JSON konten.
// Kalau nanti pindah ke API, cukup ubah berkas ini.

import topicsJson from '../data/topics.json';
import flashcardsJson from '../data/flashcards.json';
import questionsJson from '../data/questions.json';
import placementJson from '../data/placementTest.json';

export const ContentRepository = {
  getAllTopics() {
    return [...topicsJson.topics].sort((a, b) => a.urutan - b.urutan);
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
  // Ambil n soal acak untuk sesi kuis, sesuai topik dan level.
  getQuizQuestions(topicId, level, limit = 5) {
    const pool = questionsJson.questions.filter(
      (q) => q.topicId === topicId && q.level === level
    );
    return shuffle(pool).slice(0, limit);
  },
  // 9 soal tes awal (3 per topik), diurutkan topik.
  getPlacementQuestions() {
    const topics = topicsJson.topics.map((t) => t.id);
    const grouped = topics.flatMap((tid) => {
      const forTopic = placementJson.questions.filter((q) => q.topicId === tid);
      return shuffle(forTopic).slice(0, 3);
    });
    return grouped;
  },
  getQuestionById(qid) {
    return (
      questionsJson.questions.find((q) => q.id === qid) ||
      placementJson.questions.find((q) => q.id === qid) ||
      null
    );
  },
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
