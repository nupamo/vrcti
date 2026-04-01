export interface ResultInfo {
  nickname: string;
  description: string;
  avatar: string;
  avatarStyle: string;
}

const avatarUrls = {
  chiffon: 'https://booth.pximg.net/61a3b2d7-b4b1-4f97-9e48-ffe959b26ae9/i/5354471/c42b543c-a334-4f18-bd26-a5cf23e2a61b_base_resized.jpg',
  manuka: 'https://booth.pximg.net/8a7426aa-ba62-4ef0-9e7d-2c8ea96e7c9b/i/5058077/a18424fe-a56e-411a-9c47-27c56909593c_base_resized.jpg',
  shinano: 'https://booth.pximg.net/ed52788c-0b3b-4e38-9ded-1e5797daf0ef/i/6106863/07bd77df-a8ee-4244-8c4e-16cf7cb584bb_base_resized.jpg',
  mame: 'https://booth.pximg.net/c80ffe79-d9d7-4481-bc64-40d80bcd71e6/i/4340548/cb43c1f7-bbdf-4115-942a-491c32b1de24_base_resized.jpg',
  airi: 'https://booth.pximg.net/f420c992-4225-4ce0-b751-3a4acdceaab6/i/6082686/81021dbd-ca83-4c3b-8868-230e780b63a3_base_resized.jpg',
  lime: 'https://booth.pximg.net/61a3b2d7-b4b1-4f97-9e48-ffe959b26ae9/i/4876459/73a1c9e3-825d-4045-bf14-e07392ad7afa_base_resized.jpg',
  lumina: 'https://booth.pximg.net/87b70515-e32e-4a2e-bf41-317cf2c2177c/i/7502898/a2c93b99-de64-49f4-a76b-30ff769a5021_base_resized.jpg',
  sio: 'https://booth.pximg.net/817e9a9a-020c-4fac-8b21-96f80d6e25cb/i/5650156/95fc778d-3254-45ca-8a6e-2590dc30f87c_base_resized.jpg',
  milfy: 'https://booth.pximg.net/1ae5d9f5-29a4-4574-ab86-a316c22db92a/i/6571299/7bda05bb-f9d5-45a8-811a-b95ac555beb8_base_resized.jpg',
  kipfel: 'https://booth.pximg.net/c80ffe79-d9d7-4481-bc64-40d80bcd71e6/i/5813187/9163df6c-cc4e-4a07-ace2-d22e3be58be8_base_resized.jpg',
  milltina: 'https://booth.pximg.net/01965a9e-bce5-4027-bc0e-0b8e7df43c6e/i/6538026/182b133f-1c86-4ae8-8536-5e00f63b86cf_base_resized.jpg',
  rurune: 'https://booth.pximg.net/96d1d589-6879-4d30-8891-a2c6b8d64186/i/5957830/a4e0ae5b-7797-448b-80b1-e852c861e080_base_resized.jpg',
  mafuyu: 'https://booth.pximg.net/1ae5d9f5-29a4-4574-ab86-a316c22db92a/i/5007531/dfdc2835-e4db-44f8-85ed-20bf607ad64e_base_resized.jpg',
  karin: 'https://booth.pximg.net/61a3b2d7-b4b1-4f97-9e48-ffe959b26ae9/i/3470989/a70bc916-21f3-4b06-ae3a-eb302058a0b5_base_resized.jpg',
  chocolat: 'https://booth.pximg.net/61a3b2d7-b4b1-4f97-9e48-ffe959b26ae9/i/6405390/6e6332b4-d56c-4d2f-8f23-328f702949c8_base_resized.jpg',
  maya: 'https://booth.pximg.net/f420c992-4225-4ce0-b751-3a4acdceaab6/i/3390957/452e082f-67e8-480d-b697-9378977f41b0_base_resized.jpg'
}

export const results: Record<string, ResultInfo> = {
  "DEFS": {
    nickname: "퍼블릭의 독보적 슈퍼스타",
    description: "현실의 넘치는 텐션이 가상 세계를 뚫고 나오는 독보적인 존재감! 당신이 나타나는 곳마다 웃음꽃이 피고, 사람들은 당신의 에너지에 중독됩니다. 퍼블릭 월드의 심장 같은 존재네요.",
    avatar: avatarUrls.chiffon,
    avatarStyle: "밝고 귀여운 캐주얼 아바타, 감정 표현이 풍부한 표정 셰이프키."
  },
  "DECS": {
    nickname: "기믹에 미친 얼리어답터",
    description: "새로운 기술과 월드를 사냥하는 능동적인 모험가! 최신 아바타 기믹과 기술적 한계에 도전하며, 남들이 보지 못하는 메카닉적인 디테일을 파헤치는 데서 쾌감을 느낍니다.",
    avatar: avatarUrls.lumina,
    avatarStyle: "기능성 코디, 활동적인 테크웨어 스타일."
  },
  "DIFS": {
    nickname: "단 한 사람을 위한 안식처",
    description: "현실의 감정을 가감 없이 공유하며 소수의 인연과 영혼의 유대를 쌓는 로맨티스트. 시끄러운 퍼블릭보다는 단둘만의, 혹은 소수 정예만의 깊고 진한 대화를 선호합니다.",
    avatar: avatarUrls.shinano,
    avatarStyle: "편안하고 포근한 느낌의 니트웨어, 일상복 상하의."
  },
  "DICS": {
    nickname: "심해의 고독한 천재 개발자",
    description: "조용한 프라이빗 월드에서 묵묵히 코드를 짜고 유니티를 만지는 진정한 장인! 때로는 작업에 완전히 미쳐 잠도 잊은 채 당신만의 디지털 유토피아를 구축해나갑니다.",
    avatar: avatarUrls.karin,
    avatarStyle: "고도의 기믹이 들어간 테크니컬 아바타, 화려한 파티클 연출."
  },
  "GEFS": {
    nickname: "치명적인 매력의 쿨톤 인싸",
    description: "가벼운 기분으로 가상 세계의 사교를 정복하는 프로 인싸! 새로운 사람들과 웃고 떠들지만 선은 확실히 긋는, 차갑고도 매력적인 당신은 모두가 친해지고 싶어 하는 워너비입니다.",
    avatar: avatarUrls.milltina,
    avatarStyle: "트렌디한 아이돌풍 의상이나 스타일리시한 스트릿 패션."
  },
  "GECS": {
    nickname: "최적화에 진심인 정보 사냥꾼",
    description: "새로운 월드나 이벤트 정보를 누구보다 빠르게 낚아채는 효율의 정점! 감정 소모보다는 정보 습득과 경험의 가치를 중시하며, 가장 효율적인 경로로 가상 세계를 정복합니다.",
    avatar: avatarUrls.kipfel,
    avatarStyle: "깔끔한 고딕 스타일이나 미니멀한 룩."
  },
  "GIFS": {
    nickname: "구석 자리의 평화로운 관찰자",
    description: "현실의 나를 지키며 조용히 세상을 관조하는 평화주의자. 화려한 조명보다는 구석진 자리에서 지인들의 대화를 듣거나 배경을 즐기며 정서적 평온을 찾는 힐링 장인입니다.",
    avatar: avatarUrls.manuka,
    avatarStyle: "편안한 잠옷이나 부드러운 일상복 스타일."
  },
  "GICS": {
    nickname: "냉철한 시스템 감찰관",
    description: "VRChat의 모든 메커니즘을 객관적으로 해부하는 분석가! 감정에 휩쓸리지 않고 게임 자체의 기믹이나 소셜 시스템을 효율적으로 탐색하며, 문제의 핵심을 파고드는 데 능숙합니다.",
    avatar: avatarUrls.karin,
    avatarStyle: "정돈된 오피스룩이나 제복 스타일, 지적인 느낌의 안경 액세서리."
  },
  "DEFP": {
    nickname: "현실 망각! 불치병 로맨티스트",
    description: "철저하게 캐릭터에 몰입하여 또 다른 삶을 살아가는 낭만주의자! 당신에게 가상 세계는 현실보다 더 진짜 같은 꿈이며, 그 안에서의 따뜻한 교감을 진심으로 사랑합니다.",
    avatar: avatarUrls.milfy,
    avatarStyle: "판타지풍 로브나 화려한 파티 드레스, 소품을 활용한 연출."
  },
  "DECP": {
    nickname: "광기 어린 세계관 설계자",
    description: "완성된 캐릭터로서 새로운 세상을 누비는 개척자! 자신만의 확고한 컨셉을 가지고 상황을 이끌어나가며, 환경 전체를 당신의 무대로 만드는 지배적 아우라를 풍깁니다.",
    avatar: avatarUrls.lumina,
    avatarStyle: "전통 의상이나 강렬한 코스튬, 개성 있는 모자 또는 케이프."
  },
  "DIFP": {
    nickname: "가면 뒤의 신비로운 지배자",
    description: "본모습을 숨긴 채 소중한 사람들을 지키는 비밀스러운 수호자. 신비로운 페르소나 뒤에서 지인들과의 끈끈한 유대를 조용히 조율하며, 소수 정예 모임의 정신적 지주가 되기도 합니다.",
    avatar: avatarUrls.mame,
    avatarStyle: "얼굴을 가리는 마스크나 신비로운 분위기의 다크톤 로이터."
  },
  "DICP": {
    nickname: "신비주의 끝판왕: 아트 마스터",
    description: "비현실적인 캐릭터에 완벽히 동화되어 고독한 작업을 이어나가는 아티스트. 대중의 시선보다는 자신의 창작물과 설정의 완벽함에 집착하며 독보적인 세계를 구축합니다.",
    avatar: avatarUrls.maya,
    avatarStyle: "사이버펑크풍 의상, 개조된 메카닉 파츠가 돋보이는 외관."
  },
  "GEFP": {
    nickname: "천의 얼굴을 가진 유쾌한 광대",
    description: "가벼운 기분으로 아바타 뒤에 숨어 새로운 인격을 연기하는 천재 엔터테이너! 당신에게 만남은 곧 즐거운 공연이며, 유머러스한 연기로 퍼블릭을 들었다 놨다 합니다.",
    avatar: avatarUrls.milfy,
    avatarStyle: "만화 캐릭터 스타일의 의상, 과장된 액세서리나 무기 가방."
  },
  "GECP": {
    nickname: "완벽한 설계를 꿈꾸는 전략가",
    description: "철저한 계산 하에 역할을 수행하거나 상황극을 할 때 가장 빛나는 무대 위 전략가! 컨셉에 기술적 요소를 결합하여 타인에게 감탄과 경외를 선사하는 연출의 대가입니다.",
    avatar: avatarUrls.mame,
    avatarStyle: "수트 스타일의 정장이나 제카(Mecha) 아바타, 단정한 정복."
  },
  "GIFP": {
    nickname: "창고가 터져나가는 유행 민감러",
    description: "부담 없이 다양한 캐릭터를 번갈아 입으며 기분을 전환하는 패션 테러리스트(또는 아이콘)! 친구들과 아바타 쇼핑이나 사진 촬영하며 매 순간 새로운 페르소나를 즐깁니다.",
    avatar: avatarUrls.chocolat,
    avatarStyle: "여러 스타일의 데일리 룩, 귀여운 동물 귀나 꼬리 포인트."
  },
  "GICP": {
    nickname: "감정 증발! AI형 소셜 봇",
    description: "감정 수치 0%! 설정된 페르소나를 기계적으로 완벽히 유지하며 임무를 수행합니다. 질척한 교감보다는 명확한 역할 분담과 기술적 완성도만이 당신의 존재를 증명합니다.",
    avatar: avatarUrls.kipfel,
    avatarStyle: "안드로이드풍 디자인, 차가운 금속 광텍의 셰이더 적용."
  },
  "DEFAULT": {
    nickname: "미스테리한 여행자",
    description: "당신은 아직 정의되지 않은 독특한 스타일의 유저입니다. 여러 지표가 균형을 이루고 있어 상황에 따라 다양한 모습을 보여주네요!",
    avatar: avatarUrls.chiffon,
    avatarStyle: "여러 스타일이 섞인 커스텀 아바타, 개성 있는 액세서리."
  }
};
