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

// 캐릭터종류, 전직명으로 2차전직 추출 jobName, jobGrowName
export function getJob(baseJob, jobGrowName) {
  let job = '';
  switch (jobGrowName) {
    case "眞 소드마스터": job = "마제스티"; break;
    case "眞 데몬슬레이어": job = "디어사이드"; break;
    case "眞 베가본드": job = "검제"; break;
    case "眞 다크템플러": job = "네메시스"; break;
    case "眞 블레이드": job = "벤데타"; break;

    case "眞 넨마스터": if (baseJob.indexOf("(여)") != -1) job = "염제 폐월수화"; else job = "염황 광풍제월"; break;
    case "眞 그래플러": if (baseJob.indexOf("(여)") != -1) job = "얼티밋 디바"; else job = "그랜드 마스터"; break;
    case "眞 스트리트파이터": if (baseJob.indexOf("(여)") != -1) job = "용독문주"; else job = "명왕"; break;
    case "眞 스트라이커": if (baseJob.indexOf("(여)") != -1) job = "카이저"; else job = "패황"; break;

    case "眞 웨펀마스터": job = "검신"; break;
    case "眞 버서커": job = "블러드 이블"; break;
    case "眞 아수라": job = "인다라천"; break;
    case "眞 소울브링어": job = "다크로드"; break;
    case "眞 검귀": job = "악귀나찰"; break;


    case "眞 레인저": if (baseJob.indexOf("(여)") != -1) job = "크림슨 로제"; else job = "레이븐"; break;
    case "眞 런처": if (baseJob.indexOf("(여)") != -1) job = "스톰 트루퍼"; else job = "디스트로이어"; break;
    case "眞 메카닉": if (baseJob.indexOf("(여)") != -1) job = "옵티머스"; else job = "프라임"; break;
    case "眞 스핏파이어": if (baseJob.indexOf("(여)") != -1) job = "프레이야"; else job = "커맨더"; break;
    case "眞 어썰트": job = "엑스마키나"; break;


    case "眞 크루세이더": if (baseJob.indexOf("(여)") != -1) job = "세라핌"; else job = "세인트"; break;
    case "眞 인파이터": job = "저스티스"; break;
    case "眞 퇴마사": job = "태을선인"; break;
    case "眞 어벤저": job = "이모탈"; break;

    case "眞 엘레멘탈마스터": job = "오버마인드"; break;
    case "眞 배틀메이지": job = "아슈타르테"; break;
    case "眞 마도학자": job = "지니위즈"; break;
    case "眞 소환사": job = "이클립스"; break;
    case "眞 인챈트리스": job = "헤카테"; break;
    case "블랙 메이든": job = "헤카테"; break;

    case "眞 미스트리스": job = "리디머"; break;
    case "眞 무녀": job = "천선낭랑"; break;
    case "眞 이단심판관": job = "인페르노"; break;

    case "眞 로그": job = "알키오네"; break;
    case "眞 사령술사": job = "타나토스"; break;
    case "眞 섀도우댄서": job = "그림리퍼"; break;
    case "眞 쿠노이치": job = "시라누이"; break;

    case "眞 스위프트 마스터": job = "아이올로스"; break;
    case "眞 블러드 메이지": job = "뱀파이어 로드"; break;
    case "眞 엘레멘탈 바머": job = "오블리비언"; break;
    case "眞 디멘션워커": job = "어센션"; break;
    case "眞 빙결사": job = "이터널"; break;


    case "眞 팔라딘": job = "세이비어"; break;
    case "眞 엘븐나이트": job = "가이아"; break;
    case "眞 드래곤나이트": job = "드레드노트"; break;
    case "眞 카오스": job = "마신"; break;


    case "眞 뱅가드": job = "워로드"; break;
    case "眞 듀얼리스트": job = "듀란달"; break;
    case "眞 다크 랜서": job = "에레보스"; break;
    case "眞 드래고니안 랜서": job = "제노사이더"; break;

    case "眞 요원": job = "레퀴엠"; break;
    case "眞 트러블 슈터": job = "언터처블"; break;
    case "眞 스페셜리스트": job = "패스파인더"; break;
    case "眞 히트맨": job = "갓파더"; break;

    case "眞 다크나이트": job = "다크나이트(자각2)"; break;
    case "眞 크리에이터": job = "크리에이터(자각2)"; break;

    case "眞 뮤즈": job = "트렌드세터"; break;
    case "眞 트래블러": job = "셀레스티얼"; break;
    case "眞 헌터": job = "메이븐"; break;
    case "眞 비질란테": job = "프레데터"; break;
  }
  return job;
}

export function transformStatusArray(status) {
  const result = {};

  // map은 새로운 배열을 반환, forEach는 반환하지 않음
  status.forEach(item => {
    const category = getCategory(item.name);
    if (!result[category]) {
      // result[스탯]이 없으면 스탯 : [] 이렇게 값을 담은 빈 배열을 만듦.
      result[category] = [];
    }
    // result[스탯]에 값을 담음. 힘지체정 전부 값이 있으면 스탯[40, 40, 40, 40] 이런 식.
    result[category].push(item.value);
  });

  // entries는 객체를 배열[키,값]로 바꿔 출력함 {a:1} => ["a",1], [['스텟', [40, 40, 40, 40]]
  const transformedArray = Object.entries(result).map(([key, values]) => {
    // Set은 JS 내장객체, 배열 내 고유값을 저장 -> 중복값은 자동제거 후 객체형태로 반환 [1,1,2,2,3,3] -> {1,2,3}
    const uniqueValue = [...new Set(values)][0]; // Set은 전개연산자 ... 사용 시 배열로 반환
    return `${key}: ${uniqueValue}`;
  });

  return transformedArray;

  function getCategory(name) {
    switch (name) {
      case '힘':
      case '지능':
      case '체력':
      case '정신력':
        return '스텟';
      case '물리 공격력':
      case '마법 공격력':
      case '독립 공격력':
        return '공격력';
      case '물리 크리티컬 히트':
      case '마법 크리티컬 히트':
        return '크리티컬 히트';
      default:
        return name;
    }
  }
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
    "갈!",
    "운명",
    "탄생",
    "창조",
    "왜곡",
    "조율",
    "소멸",
    "바람",
    "수호",
    "방해",
    "냉기",
    "화염",
  ]

  return buffs.includes(b);
}

export function commaGold(price) {
  price = price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 골드" : ""

  return (<span className="text-[rgb(255,180,0)]">{price}</span>)
}

export function emblemColors(em) {
  if (em.itemName.includes('다색')) {
    return (
      <p className="text-[rgb(54,151,80)]">{em.itemName}</p>
    )
  } else if (em.itemName.includes('노란') || em.itemName.includes('옐로우')) {
    return (
      <p className="text-[rgb(255,244,104)]">{em.itemName}</p>
    )
  } else if (em.itemName.includes('푸른')) {
    return (
      <p className="text-[rgb(63,143,235)]">{em.itemName}</p>
    )
  } else if (em.itemName.includes('붉은')) {
    return (
      <p className="text-red-500">{em.itemName}</p>
    )
  } else if (em.itemName.includes('플래티넘')) {
    return (
      <p className="text-[rgb(255,120,0)]">{em.itemName}</p>
    )
  } else if (em.itemName.includes('녹색')) {
    return (
      <p className="text-[rgb(105,209,96)]">{em.itemName}</p>
    )
  } else if (em.itemName.includes('듀얼')) {
    return (
      <p className="text-[rgb(226,139,238)]">{em.itemName}</p>
    )
  }
}

export function emblemGrade(em) {
  if (em?.itemName?.includes('빛나는')) {
    return (
      <span className="text-[rgb(104,213,237)] mr-2">■</span>
    )
  } else if (em?.itemName?.includes('화려한')) {
    return (
      <span className="text-[rgb(179,107,255)] mr-2">■</span>
    )
  } else if (em?.itemName?.includes('찬란한')) {
    return (
      <span className="text-[rgb(255,100,255)] mr-2">◆</span>
    )
  }  else if (em?.itemName?.startsWith('플래티넘 엠블렘[') && em?.itemName?.endsWith(']')) {
    // "플래티넘 엠블렘[skillName]" 형식
    const skillName = em.itemName.slice(9, -1); // "플래티넘 엠블렘["를 잘라내고 뒤에 "]"를 제거
    return (
      <span className="text-[rgb(255,120,0)] mr-2">{skillName}</span>
    );
  } else if (em?.itemName?.includes('의 플래티넘 엠블렘')) {
    // "jobName의 플래티넘 엠블렘" 형식
    const jobName = em.itemName.split('의 플래티넘 엠블렘')[0]; // "의 플래티넘 엠블렘" 앞부분 추출
    return (
      <span className="text-[rgb(104,213,237)] mr-2">플엠(직업: {jobName})</span>
    );
  } else {
    return (<span className="text-red-500 mr-2">X</span>)
  }
}

export function transAvatarSlotName(slotName) {
  slotName = slotName ? slotName.includes('아바타')
    ? slotName == '스킨 아바타' ? slotName.replace('스킨 아바타', '피부')
      : slotName.replace(' 아바타', '') : slotName : "크리쳐"
  return slotName
}