// Pembantu: acak array, bentuk soal untuk klien, dan penilaian jawaban.
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Versi aman untuk dikirim ke klien: TANPA jawaban_benar dan penjelasan.
export const toClientQuestion = (q) => ({
  id: q.id,
  topicId: q.topic_id,
  level: q.level,
  tipe: q.tipe,
  pertanyaan: q.pertanyaan,
  pilihan: q.pilihan,
});

// jawaban: [{ questionId, pilihan }]. Soal tanpa jawaban dihitung salah.
export function gradeAnswers(questions, jawaban) {
  const byId = new Map((jawaban || []).map((j) => [j.questionId, j.pilihan]));
  return questions.map((q) => {
    const dipilih = byId.has(q.id) ? byId.get(q.id) : null;
    return {
      questionId: q.id,
      topicId: q.topic_id,
      dipilih,
      jawabanBenar: q.jawaban_benar,
      benar: dipilih === q.jawaban_benar,
      penjelasan: q.penjelasan,
      relatedCardIds: q.related_card_ids || [],
    };
  });
}
