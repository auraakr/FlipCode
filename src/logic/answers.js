// Mengubah array index pilihan (urutan sama dengan soal) menjadi format API:
// [{ questionId, pilihan }]. Soal yang belum dijawab (-1) tidak dikirim.
export function toApiAnswers(questions, jawaban) {
  return questions
    .map((q, i) => ({ questionId: q.id, pilihan: jawaban[i] }))
    .filter((a) => typeof a.pilihan === 'number' && a.pilihan >= 0);
}
