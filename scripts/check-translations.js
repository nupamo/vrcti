// 번역 데이터 점검 스크립트.
// 실제 데이터 모듈을 불러와 ko/en/ja/zh 묶음을 모두 찾아 다음을 검사한다.
//   1. 네 언어가 모두 있고 비어 있지 않은지
//   2. 다른 언어의 문자가 섞여 있지 않은지 (예: 영어 문구에 한글)
//   3. UI 문구의 키와 {placeholder}가 언어 간에 일치하는지
//   4. 16개 결과 코드와 지표 설명이 빠짐없이 정의돼 있는지
// 실행: pnpm check:i18n  (TypeScript 파일을 직접 불러오므로 Node 22.18 이상 필요)
import { indicatorDescriptions } from '../src/data/indicators.ts';
import { questions } from '../src/data/questions.ts';
import { results } from '../src/data/results.ts';
import { uiTranslations } from '../src/data/ui.ts';
import { RESULT_CODES } from '../src/lib/score.ts';

const LANGS = ['ko', 'en', 'ja', 'zh'];

const SCRIPTS = {
  hangul: ['Korean (Hangul)', /[가-힯ᄀ-ᇿ㄰-㆏]/],
  kana: ['Japanese (Kana)', /[぀-ゟ゠-ヿ]/],
  hanzi: ['Chinese/Japanese (Hanzi/Kanji)', /[一-鿿]/],
};

// 언어별로 들어가면 안 되는 문자 체계
const FORBIDDEN = {
  ko: ['kana'],
  ja: ['hangul'],
  zh: ['hangul', 'kana'],
  en: ['hangul', 'kana', 'hanzi'],
};

let errors = 0;
let checked = 0;

function fail(where, message) {
  console.error(`[${where}] ${message}`);
  errors++;
}

function checkText(where, lang, text) {
  if (typeof text !== 'string' || text.trim() === '') {
    fail(where, `${lang} 번역이 없거나 비어 있습니다.`);
    return;
  }
  checked++;
  // 허용되는 placeholder·해시태그·URL은 제외하고 검사
  const clean = text.replace(/\{\w+\}|#\w+|https?:\/\/\S+/g, '');
  for (const key of FORBIDDEN[lang]) {
    const [label, regex] = SCRIPTS[key];
    if (regex.test(clean)) fail(where, `${lang} 문구에 다른 언어 문자(${label})가 섞여 있습니다: "${text}"`);
  }
}

const isLangBundle = (value) => LANGS.some((lang) => typeof value[lang] === 'string');

// 객체를 훑으며 { ko, en, ja, zh } 형태의 묶음을 찾아 검사한다.
function walk(where, value) {
  if (value === null || typeof value !== 'object') return;
  if (isLangBundle(value)) {
    LANGS.forEach((lang) => checkText(where, lang, value[lang]));
    return;
  }
  for (const [key, child] of Object.entries(value)) walk(`${where}.${key}`, child);
}

// 언어가 최상위 키인 사전({ ko: {...}, en: {...} })의 키 일치 여부 검사
function checkKeyParity(where, dict) {
  const baseKeys = Object.keys(dict.ko);
  for (const lang of LANGS) {
    if (!dict[lang]) {
      fail(where, `${lang} 항목이 없습니다.`);
      continue;
    }
    const keys = Object.keys(dict[lang]);
    baseKeys.filter((k) => !keys.includes(k)).forEach((k) => fail(`${where}.${lang}`, `"${k}" 키가 없습니다.`));
    keys.filter((k) => !baseKeys.includes(k)).forEach((k) => fail(`${where}.${lang}`, `ko에 없는 "${k}" 키가 있습니다.`));
  }
}

const placeholders = (text) => (String(text).match(/\{\w+\}/g) || []).sort().join(',');

// 질문 / 결과
walk('questions', questions);
walk('results', results);
for (const code of RESULT_CODES) {
  if (!results[code]) fail('results', `결과 코드 ${code}의 설명이 없습니다.`);
}
if (!results.DEFAULT) fail('results', 'DEFAULT 결과가 없습니다.');

// UI 문구
checkKeyParity('ui', uiTranslations);
for (const lang of LANGS) {
  for (const [key, text] of Object.entries(uiTranslations[lang] ?? {})) {
    checkText(`ui.${lang}.${key}`, lang, text);
    if (placeholders(text) !== placeholders(uiTranslations.ko[key])) {
      fail(`ui.${lang}.${key}`, 'placeholder({…})가 ko와 다릅니다.');
    }
  }
}

// 지표 설명 (name은 전 언어 공통 영문 표기이므로 description만 검사)
checkKeyParity('indicators', indicatorDescriptions);
for (const lang of LANGS) {
  for (const [key, info] of Object.entries(indicatorDescriptions[lang] ?? {})) {
    checkText(`indicators.${lang}.${key}`, lang, info.description);
  }
}

console.log(`번역 문자열 ${checked}개 점검 완료.`);
if (errors > 0) {
  console.error(`\n점검 실패: 문제 ${errors}건`);
  process.exit(1);
}
console.log('점검 통과: 누락되거나 다른 언어가 섞인 문구가 없습니다.');
