// Pengelola kuis: menyusun 5 soal dan menyimpan hasil sesi.
// Perubahan level diambil dari AdaptiveEngine.

import { ContentRepository } from '../storage/ContentRepository';
import { ProgressRepository } from '../storage/ProgressRepository';
import { AdaptiveEngine } from './AdaptiveEngine';

export const QuizManager = {
  async buildSession(topicId) {
    const topicProgress = await ProgressRepository.getTopicProgress(topicId);
    const questions = ContentRepository.getQuizQuestions(
      topicId,
      topicProgress.level,
      5
    );
    return { questions, level: topicProgress.level };
  },

  // jawaban: array index pilihan, urutan sama dengan questions
  async submit({ topicId, level, questions, jawaban }) {
    let benar = 0;
    const detail = questions.map((q, i) => {
      const ok = jawaban[i] === q.jawabanBenar;
      if (ok) benar += 1;
      return { questionId: q.id, benar: ok };
    });

    const adapt = AdaptiveEngine.evaluateQuiz({ currentLevel: level, benar });

    const allCardIds = ContentRepository.getFlashcardsByTopic(topicId).map(
      (c) => c.id
    );
    const pct = await ProgressRepository.getMasteredPercentage(
      topicId,
      allCardIds
    );
    const current = await ProgressRepository.getTopicProgress(topicId);
    const nextState = AdaptiveEngine.nextTopicState({
      currentState: current.state,
      levelKuis: level,
      benar,
      pctDikuasai: pct,
    });

    await ProgressRepository.setTopicProgress(topicId, {
      level: adapt.nextLevel,
      state: nextState,
      lastQuizScore: `${benar}/${questions.length}`,
    });
    await ProgressRepository.addQuizSession({
      topicId,
      level,
      benar,
      total: questions.length,
      timestamp: Date.now(),
    });

    return { benar, total: questions.length, detail, adapt, pct };
  },
};
