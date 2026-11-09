import { PlacementTest } from './PlacementTest';
import { ContentRepository } from '../storage/ContentRepository';
import { Level } from '../constants/enums';

export const PlacementEngine = {
  /**
   * Evaluasi jawaban tes penempatan dan simpan ke ProgressRepository.
   * Mendukung format array objek { questionId, pilihanIndex } maupun array index pilihan langsung.
   * Mengembalikan hasil terformat yang siap dikonsumsi PlacementResultScreen: { [topicId]: { level, skor, total } }
   */
  async evaluate(answers) {
    const questions = ContentRepository.getPlacementQuestions();

    const choices = questions.map((q, idx) => {
      if (Array.isArray(answers)) {
        const found = answers.find(
          (a) => a && (a.questionId === q.id || a.questionIndex === idx)
        );
        if (found !== undefined && typeof found.pilihanIndex === 'number') {
          return found.pilihanIndex;
        }
        if (typeof answers[idx] === 'number') {
          return answers[idx];
        }
      }
      return -1;
    });

    const result = await PlacementTest.submit(questions, choices);

    const formatted = {};
    const topics = ContentRepository.getTopics();
    topics.forEach((t) => {
      const topicData = result.perTopic?.[t.id] || { benar: 0, total: 3 };
      formatted[t.id] = {
        level: result.perTopicLevel?.[t.id] || Level.MUDAH,
        skor: topicData.benar ?? 0,
        total: topicData.total ?? 3,
      };
    });

    return formatted;
  },
};

export default PlacementEngine;

