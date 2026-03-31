export interface Question {
  id: number;
  indicator: 'S' | 'C' | 'D' | 'G' | 'E' | 'P' | 'F' | 'T';
  text: string;
}

export const questions: Question[] = [
  // S (Sync) vs C (Concept)
  { id: 1, indicator: 'S', text: "나는 인게임에서도 내 실제 목소리와 성격을 그대로 사용하는 편이다." },
  { id: 2, indicator: 'S', text: "내 아바타는 내 현실 모습이나 취향을 솔직하게 반영하고 있다." },
  { id: 3, indicator: 'S', text: "가상 세계의 나도 결국 현실의 나라고 생각한다." },
  
  // D (Deep) vs G (Gamer)
  { id: 4, indicator: 'D', text: "나는 가상 세계에서 누군가 나를 만지면 실제로 감각이 느껴지는 것 같다." },
  { id: 5, indicator: 'D', text: "아바타가 슬픈 표정을 지으면 나도 실제로 슬퍼지는 것 같다." },
  { id: 6, indicator: 'D', text: "VR 월드의 풍경을 보며 실제로 여행 온 듯한 벅찬 감동을 느낀다." },

  // E (Explorer) vs P (Private)
  { id: 7, indicator: 'E', text: "나는 모르는 사람이 많은 퍼블릭 월드에 가는 것이 즐겁다." },
  { id: 8, indicator: 'E', text: "처음 보는 유저에게 먼저 말을 거는 것에 거부감이 없다." },
  { id: 9, indicator: 'E', text: "새로운 월드가 나오면 혼자보다는 사람들과 함께 탐험하고 싶어한다." },

  // F (Friendly) vs T (Technical)
  { id: 10, indicator: 'T', text: "나는 VRChat에 접속하면 사람들과 대화하기보다 유니티나 SDK 작업을 더 많이 한다." },
  { id: 11, indicator: 'T', text: "아바타에 새로운 기믹이나 OSC를 적용하는 과정이 가장 즐겁다." },
  { id: 12, indicator: 'T', text: "멋진 월드를 보면 어떻게 만들었는지 구조부터 분석하게 된다." },
];
