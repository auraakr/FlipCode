// PlacementTest: mengatur tes awal 9 soal (3 per topik).
// Aturan level awal (per topik):
//   benar 0-1 -> Mudah
//   benar 2   -> Sedang
//   benar 3   -> Sulit (topik ditandai "Sudah dikuasai awal")

import { Level } from '../constants/enums';
import { ContentRepository } from '../storage/ContentRepository';
import { ProgressRepository } from '../storage/ProgressRepository';

export const PlacementTest = {
  loadQuestions() {
    return ContentRepository.getPlacementQuestions();
  },

  // jawaban: array berisi index pilihan yang dipilih siswa, urutan sama dengan questions
  evaluate(questions, jawaban) {
    const perTopic = {};
    questions.forEach((q, i) => {
      const benar = jawaban[i] === q.jawabanBenar;
      if (!perTopic[q.topicId]) perTopic[q.topicId] = { benar: 0, total: 0 };
      perTopic[q.topicId].total += 1;
      if (benar) perTopic[q.topicId].benar += 1;
    });

    const perTopicLevel = {};
    Object.entries(perTopic).forEach(([topicId, { benar }]) => {
      if (benar <= 1) perTopicLevel[topicId] = Level.MUDAH;
      else if (benar === 2) perTopicLevel[topicId] = Level.SEDANG;
      else perTopicLevel[topicId] = Level.SULIT;
    });
    return { perTopic, perTopicLevel };
  },

  async submit(questions, jawaban) {
    const result = this.evaluate(questions, jawaban);
    await ProgressRepository.savePlacementResult(result.perTopicLevel);
    await ProgressRepository.markPlacementDone();
    return result;
  },
};
