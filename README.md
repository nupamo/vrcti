# VRCTI

VRChat 사용자의 플레이 성향을 4가지 지표 조합으로 분류하는 웹 테스트 프로젝트입니다. 질문 응답을 바탕으로 결과 코드를 계산하고, 유형 설명과 공유 기능까지 제공하는 인터랙티브 진단형 웹앱입니다.

## 프로젝트 한 줄 설명

VRChat 문화권의 감각을 반영해 만든 놀이형 성향 테스트 서비스이며, 실제로 반응 검증까지 이루어진 대표 프로젝트입니다.

## 핵심 지표

- **E / I**: Explorer / Inside
- **S / C**: Sync / Concept
- **D / G**: Deep / Gamer
- **A / U**: Adapt / Unique

최종 결과는 위 네 축의 조합으로 생성됩니다.

## 주요 기능

- 질문 기반 성향 테스트 진행
- 다국어 UI 지원 (한국어, 영어, 일본어, 중국어)
- 결과 코드 계산 및 유형별 설명 표시
- 결과 텍스트 복사
- X(Twitter) 공유 문구 생성
- 전체 지표 가이드 모달
- 브라우저 언어 감지
- 결과 화면 컨페티 연출

## 기술 스택

- React
- TypeScript
- Vite
- Framer Motion
- Tailwind CSS
- Lucide React
- canvas-confetti

## 프로젝트 구조

```text
src/
├─ data/
│  ├─ indicators.ts    # 지표 설명, 언어 타입 정의
│  ├─ questions.ts     # 질문 목록 및 가중치
│  └─ results.ts       # 결과 코드별 설명 데이터
├─ App.tsx             # 테스트 흐름 및 UI 전체
├─ main.tsx            # 앱 진입점
public/
├─ thumb.png           # 대표 썸네일
├─ thumb2.png          # 통계/홍보용 이미지
└─ sitemap.xml         # 검색엔진용 메타 파일
```

## 결과 계산 방식

각 질문은 특정 지표에 가중치를 부여합니다.
사용자가 긍정 응답을 선택한 질문들을 기준으로 지표별 점수를 누적한 뒤, 각 축에서 더 높은 쪽을 선택해 최종 4글자 결과 코드를 만듭니다.

예시:

- `E` 점수 > `I` 점수 이면 `E`
- `D` 점수 >= `G` 점수 이면 `D`

## 개발 환경 실행

```bash
pnpm install
pnpm dev
```

## 빌드

```bash
pnpm build
```

## 부가 스크립트

```bash
node analyze_distribution.js
pnpm exec tsx scripts/check-translations.js
```

- `analyze_distribution.js`: 결과 분포 분석용 스크립트
- `scripts/check-translations.js`: 번역 누락 여부 점검용 스크립트

## 서비스 관점에서의 확장 포인트

현재 구조만으로도 완성도가 높지만, 다음 방향으로 확장하기 좋습니다.

- 국가/언어별 결과 통계 페이지 연결
- 결과 유형별 상세 해설 강화
- 후속 테스트나 시리즈 프로젝트로 확장
- SNS 공유 흐름 최적화

## 프로젝트 특징

- 가벼운 테스트형 웹서비스이지만, 다국어 및 공유 흐름까지 고려되어 있습니다.
- URL 파라미터로 특정 결과를 직접 열 수 있는 구조를 지원합니다.
- VRChat 문화권의 성향 차이를 놀이형 포맷으로 풀어낸 프로젝트입니다.

## 라이선스

별도 라이선스가 명시되어 있지 않다면 저장소 소유자의 정책을 따릅니다.
