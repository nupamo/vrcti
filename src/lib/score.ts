import type { Question } from "../data/questions";

// 결과 코드는 4개 축(E/I, S/C, D/G, A/U)의 조합 16가지뿐이다.
export const RESULT_CODES = [
  "ESDA", "ESDU", "ESGA", "ESGU", "ECDA", "ECDU", "ECGA", "ECGU",
  "ISDA", "ISDU", "ISGA", "ISGU", "ICDA", "ICDU", "ICGA", "ICGU",
] as const;

export type ResultCode = (typeof RESULT_CODES)[number];

// URL 파라미터 등 외부 입력을 결과 코드로 정규화한다. 유효하지 않으면 null.
export function parseResultCode(value: string | null | undefined): ResultCode | null {
  if (!value) return null;
  const code = value.trim().toUpperCase();
  return (RESULT_CODES as readonly string[]).includes(code) ? (code as ResultCode) : null;
}

// answers: 질문 id → "그렇다" 여부. 긍정 응답한 질문의 가중치만 누적한다.
export function calculateResultCode(
  questions: readonly Question[],
  answers: Readonly<Record<number, boolean>>,
): ResultCode {
  const scores: Record<string, number> = { E: 0, I: 0, S: 0, C: 0, D: 0, G: 0, A: 0, U: 0 };
  for (const q of questions) {
    if (!answers[q.id]) continue;
    for (const w of q.weights) scores[w.indicator] += w.score;
  }

  return [
    scores.E > scores.I ? "E" : "I",
    scores.S > scores.C ? "S" : "C",
    scores.D >= scores.G ? "D" : "G",
    scores.A > scores.U ? "A" : "U",
  ].join("") as ResultCode;
}

// Fisher–Yates 셔플. 원본 배열은 건드리지 않는다.
export function shuffle<T>(items: readonly T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
