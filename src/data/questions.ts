export interface Question {
  id: number;
  indicator: 'S' | 'C' | 'D' | 'G' | 'E' | 'P' | 'F' | 'T';
  text: string;
}

export const questions: Question[] = [
  // S (Sync) vs C (Concept)
  { indicator: 'S', text: "나는 인게임에서도 내 실제 목소리와 성격을 그대로 사용하는 편이다." },
  { indicator: 'S', text: "내 아바타는 내 현실 성별이나 특징을 반영하고 있다." },
  { indicator: 'S', text: "생긴게 달라도 가상 세계의 나도 결국 나라고 생각한다." },
  { indicator: 'C', text: "내 현실 정보는 물어보지 않으면 알려주지 않는 편이다." },
  { indicator: 'S', text: "현실의 지인(가족, 친구)이 내 VRChat 플레이를 봐도 부끄럽지 않다." },
  { indicator: 'C', text: "아바타를 바꿀 때마다 그 아바타의 외형에 맞춰 말투나 행동을 조금씩 바꾼다." },

  // D (Deep) vs G (Gamer)
  { indicator: 'D', text: "VRChat에서 일어난 일 때문에 현실에 지장이 가는 일이 있다." },
  { indicator: 'D', text: "나는 가상 세계에서 누군가 나를 만지면 실제로 감각이 느껴지는 것 같다." },
  { indicator: 'D', text: "나는 VR이 아니면 로그인 하지 않는 편이다." },
  { indicator: 'G', text: "디스코드로 이미 좋아하는 친구들과 대화중이라면 굳이 VRChat에 접속하려는 생각은 들지 않는다." },
  { indicator: 'G', text: "거울을 보며 떠들기보다는 월드 탐방을 더 좋아한다." },

  // E (Explorer) vs P (Private)
  { indicator: 'E', text: "나는 친구가 있어도 퍼블릭에 가곤 한다." },
  { indicator: 'E', text: "처음 보는 유저가 있으면 먼저 말을 걸려고 한다." },
  { indicator: 'P', text: "나는 친구가 없으면 VRChat에 접속하지 않는다." },
  { indicator: 'P', text: "새로운 월드가 나오면 혼자보다는 친구들과 함께 탐험하고 싶다." },
  { indicator: 'P', text: "자주 보지 않는 사람은 친구목록에 있을 필요가 없다고 생각한다." },
  { indicator: 'P', text: "사람 많은 인스턴스는 꺼리는 편이다." },
  { indicator: 'P', text: "초록색보다 주황색인 경우가 많다." },

  // F (Friendly) vs T (Technical)
  { indicator: 'T', text: "나는 유니티나 블렌더 작업을 하다가 VRChat 접속을 포기할 때가 있다." },
  { indicator: 'T', text: "새로운 사람을 만나면 먼저 무슨 아바타인지가 궁금하다." },
  { indicator: 'F', text: "주변 친구들한테 아바타 언제 바꾸냐는 말을 자주 듣는다." },
  { indicator: 'F', text: "나는 작업할 때 MMD월드에 접속하거나 디스코드 서버를 둘러본다." },
  { indicator: 'F', text: "새로운 기능을 배우는 것보다, 친구들과 아무 목적 없이 거울 앞에 앉아 떠드는 시간이 더 소중하다." },
  { indicator: 'T', text: "다른 사람의 아바타를 볼 때 '예쁘다'는 생각보다 '어떤 기믹이나 쉐이더를 썼는지'가 먼저 궁금하다." },
  { indicator: 'T', text: "인게임에서 버그나 오류를 발견하면 짜증나기보다 왜 그런지 원인을 파헤쳐보고 싶다." }
].sort(() => Math.random() - 0.5)
  .map((q, i) => ({ ...q, id: i }) as Question);
