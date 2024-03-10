export function transServerId(serverId) {
  switch (serverId) {
    case "anton": return "안톤";
    case "bakal": return "바칼";
    case "cain": return "카인";
    case "casillas": return "카시야스";
    case "diregie": return "디레지에";
    case "hilder": return "힐더";
    case "prey": return "프레이";
    case "siroco": return "시로코";
    default: return "ERROR";
  }
}

export function transformStatusArray(status) {
  const result = [];

  function getStatCategory(statName) {
    switch (statName) {
      case '힘':
      case '지능':
      case '체력':
      case '정신력':
        return '스탯';
      case '물리 공격력':
      case '마법 공격력':
      case '독립 공격력':
        return '공격력';
      case '물리 크리티컬 히트':
      case '마법 크리티컬 히트':
        return '크리티컬 히트';
      default:
        return statName;
    }
  }

  const categorizedStats = status.reduce((acc, stat) => {
    const statCategory = getStatCategory(stat.name);
    if (!acc[statCategory]) {
      acc[statCategory] = { name: statCategory, value: stat.value };
    } else {
      acc[statCategory].value = stat.value;
    }
    return acc;
  }, {});

  for (const key in categorizedStats) {
    result.push(categorizedStats[key]);
  }

  return result;
}

export function isBuffInList(b) {
  const buffs = [
    "오버드라이브",
    "잔영의 케이가",
    "폭주",
    "살의의 파동",
    "귀혼일체",
    "신검합일",
    "광폭화",
    "오기조원",
    "컨제스트",
    "트레이스",
    "역혈기공",
    "강권",
    "뒷골목 싸움법",
    "반드시 잡는다!",
    "카이",
    "독바르기",
    "데스 바이 리볼버",
    "미라클 비전",
    "로보틱스",
    "오버 차지",
    "액티베이션",
    "마나 폭주",
    "공명",
    "윈드니스",
    "블러드 번",
    "경계망상",
    "엘리멘탈 번",
    "고대의 도서관",
    "환수 폭주",
    "전장의 여신",
    "금단의 저주",
    "영광의 축복",
    "성령의 메이스",
    "섀도우 박서",
    "추락하는 영혼",
    "열정의 챠크라",
    "광명의 챠크라",
    "용맹의 축복",
    "광적인 믿음",
    "신탁의 기원",
    "일곱개의 대죄",
    "셰이크 다운",
    "암흑의 의식",
    "화둔: 홍염",
    "암살자의 마음가짐",
    "워크라이",
    "브레인 스톰",
    "페이스풀",
    "폭음폭식",
    "마창 해방",
    "오러 랜스",
    "마나 익스트랙트",
    "다크니스",
    "임무 시작",
    "역전의 승부사",
    "전술 지휘",
    "코어 프렉시스",
    "러블리 템포",
    "익사이팅",
    "증폭",
    "오버플로우",
    "파동각인",
    "가드",
    "오토 가드",
    "류심 강",
    "공참타",
    "위상변화",
    "오라 실드",
    "쇼타임",
    "슈퍼아머",
    "이중 투척",
    "독 바르기",
    "뇌명 : 사나운 빛의 넨수",
    "태양의 숨결",
    "프렌지",
    "트랜스폼 : G-3 랩터",
    "트랜스폼 : G-2 롤링썬더",
    "카모플라쥬",
    "지의 식신 - 현무",
    "속성변환",
    "여행자의 직감",
    "썬더 해머 : 유피테르",
    "빛의 복수",
    "슬로우 힐",
    "검막",
    "카잔",
    "도발",
    "나선의 넨",
    "건가드",
    "갈증",
    "배쉬 스톡",
    "행오버",
    "흑염의 칼라",
    "폭발탄",
    "채찍질",
    "초월의 룬",
    "엘레멘탈 번",
    "보이드",
    "아크 방전",
    "워커 공격 중지",
    "블러드러스트",
    "약식소환 : 빅대디",
    "약식소환 : 트윙클 아티스트",
    "카리스마",
    "류심",
    "멸!",
    "갈!"
  ]

  return buffs.includes(b);
}


