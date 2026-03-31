export interface ResultInfo {
  nickname: string;
  description: string;
  avatar: string;
  avatarStyle: string;
}

const avatarUrls = {
  chiffon: 'https://booth.pximg.net/61a3b2d7-b4b1-4f97-9e48-ffe959b26ae9/i/5354471/c42b543c-a334-4f18-bd26-a5cf23e2a61b_base_resized.jpg'
}

export const results: Record<string, ResultInfo> = {
  "SDEF": {
    nickname: "퍼블릭의 아이돌",
    description: "현실의 활기찬 성격을 가상 세계에서도 그대로 보여주는 당신! 사람들과 어울리는 것을 좋아하며 감정 몰입도도 높아서 친구들에게 인기가 많아요.",
    avatar: avatarUrls.chiffon,
    avatarStyle: "밝고 귀여운 캐주얼 아바타, 감정 표현이 풍부한 표정 셰이프키."
  },
  "SDET": {
    nickname: "기술적인 탐험가",
    description: "새로운 기술과 월드를 탐험하는 능동적인 모험가입니다. 몰입도도 높고 퍼블릭에서도 활발히 활동하며 최신 아바타 기믹에 관심이 많습니다.",
    avatar: avatarUrls.chiffon,
    avatarStyle: "기능성 코디, 활동적인 테크웨어 스타일."
  },
  "SDPF": {
    nickname: "친밀한 동반자",
    description: "현실의 감정을 가감 없이 공유하며 소수의 지인들과 깊은 유대를 쌓는 것을 선호합니다. 화려한 장소보다는 마음이 편안한 아지트에서 힐링을 즐겨요.",
    avatar: avatarUrls.chiffon,
    avatarStyle: "편안하고 포근한 느낌의 니트웨어, 일상복 상하의."
  },
  "SDPT": {
    nickname: "심해형 유니티 장인",
    description: "조용한 프라이빗 월드에서 묵묵히 코드를 짜고 유니티를 만지는 진정한 기술자! 때로는 몰입하고 때로는 관조하며 자신만의 세계를 구축합니다.",
    avatar: avatarUrls.chiffon,
    avatarStyle: "고도의 기믹이 들어간 테크니컬 아바타, 화려한 파티클 연출."
  },
  "SGEF": {
    nickname: "가벼운 소셜라이저",
    description: "가상 세계를 가볍게 즐기는 사교가형입니다. 새로운 사람들과 대화하는 것을 즐기지만, 현실과의 적절한 거리를 유지하며 유쾌한 시간을 보냅니다.",
    avatar: avatarUrls.chiffon,
    avatarStyle: "트렌디한 아이돌풍 의상이나 스타일리시한 스트릿 패션."
  },
  "SGET": {
    nickname: "효율적 월드 투어러",
    description: "새로운 게임 월드나 이벤트에 관심이 많고 리서치하는 능력이 뛰어납니다. 감정적인 소모보다는 정보 습득과 경험의 효율성을 중시합니다.",
    avatar: avatarUrls.chiffon,
    avatarStyle: "깔끔한 고딕 스타일이나 미니멀한 룩."
  },
  "SGPF": {
    nickname: "잔잔한 힐링 관조자",
    description: "현실의 나로 접속하지만 조용히 지인들과 시간을 보내는 것을 선호합니다. 화려한 기믹보다는 소박한 대화와 안정감을 중시해요.",
    avatar: avatarUrls.chiffon,
    avatarStyle: "편안한 잠옷이나 부드러운 일상복 스타일."
  },
  "SGPT": {
    nickname: "시스템적 분석가",
    description: "VRChat의 여러 시스템을 객관적인 시선으로 바라봅니다. 감정에 휩쓸리지 않고 게임 자체의 기믹이나 소셜 시스템을 효율적으로 탐색합니다.",
    avatar: avatarUrls.chiffon,
    avatarStyle: "정돈된 오피스룩이나 제복 스타일, 지적인 느낌의 안경 액세서리."
  },
  "CDEF": {
    nickname: "낭만적인 롤플레이어",
    description: "철저하게 캐릭터에 몰입하지만, 사람들과 따뜻한 교류를 즐기는 로맨티스트입니다. 가상 세계에서의 또 다른 삶을 진심으로 즐기고 계시네요.",
    avatar: avatarUrls.chiffon,
    avatarStyle: "판타지풍 로브나 화려한 파티 드레스, 소품을 활용한 연출."
  },
  "CDET": {
    nickname: "세계관 구축자",
    description: "완성된 캐릭터로서 새로운 세상을 누비는 개척자입니다. 자신만의 컨셉을 가지고 환경에 적극적으로 참여하며 독보적인 존재감을 뽐냅니다.",
    avatar: avatarUrls.chiffon,
    avatarStyle: "전통 의상이나 강렬한 코스튬, 개성 있는 모자 또는 케이프."
  },
  "CDPF": {
    nickname: "비밀스러운 수호자",
    description: "자신의 진짜 모습은 철저히 숨긴 채 캐릭터로서 소중한 사람들을 지킵니다. 신비로운 분위기를 풍기며 지인들과의 끈끈한 유대감을 중시합니다.",
    avatar: avatarUrls.chiffon,
    avatarStyle: "얼굴을 가리는 마스크나 신비로운 분위기의 다크톤 로이터."
  },
  "CDPT": {
    nickname: "은둔형 컨셉 장인",
    description: "비현실적인 캐릭터에 완벽히 동화되어 자신만의 고독한 작업을 이어나갑니다. 대중의 눈보다는 자신의 창작물과 설정의 완성도를 더 높게 평가합니다.",
    avatar: avatarUrls.chiffon,
    avatarStyle: "사이버펑크풍 의상, 개조된 메카닉 파츠가 돋보이는 외관."
  },
  "CGEF": {
    nickname: "연기파 감성가",
    description: "가벼운 기분으로 아바타 뒤에 숨어 새로운 인격을 연기하는 것을 즐깁니다. 퍼블릭에서의 다양한 만남을 엔터테인먼트로 생각하는 유머러스한 사교가입니다.",
    avatar: avatarUrls.chiffon,
    avatarStyle: "만화 캐릭터 스타일의 의상, 과장된 액세서리나 무기 가방."
  },
  "CGET": {
    nickname: "전략적 캐릭터 전문가",
    description: "게임 내에서 특정 역할을 수행하거나 상황극을 할 때 가장 빛납니다. 컨셉에 기술적인 요소를 결합하여 타인에게 놀라움을 선사하는 매력이 있습니다.",
    avatar: avatarUrls.chiffon,
    avatarStyle: "수트 스타일의 정장이나 제카(Mecha) 아바타, 단정한 정복."
  },
  "CGPF": {
    nickname: "아바타 수집가",
    description: "부담 없이 다양한 캐릭터를 번갈아 사용하는 것을 선호합니다. 소수의 믿을 수 있는 친구들과 함께 아바타 쇼핑이나 사진 촬영을 하는 시간이 가장 즐겁습니다.",
    avatar: avatarUrls.chiffon,
    avatarStyle: "여러 스타일의 데일리 룩, 귀여운 동물 귀나 꼬리 포인트."
  },
  "CGPT": {
    nickname: "기계적인 역할수행자",
    description: "감정에 치우치지 않고 설정된 페르소나를 기계적으로 완벽히 유지합니다. 감성적인 교류보다는 깔끔한 역할 분담과 기술적 완성도를 선호합니다.",
    avatar: avatarUrls.chiffon,
    avatarStyle: "안드로이드풍 디자인, 차가운 금속 광텍의 셰이더 적용."
  },
  "DEFAULT": {
    nickname: "미스테리한 여행자",
    description: "당신은 아직 정의되지 않은 독독특한 스타일의 유저입니다. 여러 지표가 균형을 이루고 있어 상황에 따라 다양한 모습을 보여주네요!",
    avatar: avatarUrls.chiffon,
    avatarStyle: "여러 스타일이 섞인 커스텀 아바타, 개성 있는 액세서리."
  }
};
