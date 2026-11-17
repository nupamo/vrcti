// 가능한 모든 응답 조합(2^질문 수)에 대해 결과 코드 분포를 계산한다.
// 앱과 동일한 질문 데이터·계산 함수를 그대로 가져와 쓰므로 로직이 어긋나지 않는다.
// 실행: pnpm analyze  (TypeScript 파일을 직접 불러오므로 Node 22.18 이상 필요)
import { questions } from '../src/data/questions.ts';
import { calculateResultCode, RESULT_CODES } from '../src/lib/score.ts';

const totalPatterns = 2 ** questions.length;
const counts = Object.fromEntries(RESULT_CODES.map((code) => [code, 0]));

for (let pattern = 0; pattern < totalPatterns; pattern++) {
  const answers = {};
  questions.forEach((q, j) => {
    answers[q.id] = Boolean((pattern >> j) & 1);
  });
  counts[calculateResultCode(questions, answers)]++;
}

console.log(`\n--- 결과 분포 (전체 ${totalPatterns.toLocaleString()}개 응답 조합) ---`);
Object.entries(counts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([code, count]) => {
    console.log(`${code}: ${count} (${((count / totalPatterns) * 100).toFixed(2)}%)`);
  });

const unreachable = RESULT_CODES.filter((code) => counts[code] === 0);
if (unreachable.length > 0) {
  console.error(`\n나올 수 없는 결과 코드가 있습니다: ${unreachable.join(', ')}`);
  process.exit(1);
}
