const jobNameByJobGrowId = {};

const jobInfoMap = {
    '귀검사(남)': {
        '眞 웨펀마스터': [],
        '眞 아수라': [],
        '眞 소울브링어': [],
        '眞 버서커': [],
        '眞 검귀': []
    },

    '귀검사(여)': {
        '眞 소드마스터': [],
        '眞 데몬슬레이어': [],
        '眞 다크템플러': [],
        '眞 베가본드': [],
        '眞 블레이드': []
    },

    '격투가(여)': {
        '眞 넨마스터': [],
        '眞 스트리트파이터': [],
        '眞 그래플러': [],
        '眞 스트라이커': []
    },

    '격투가(남)': {
        '眞 넨마스터': [],
        '眞 스트리트파이터': [],
        '眞 그래플러': [],
        '眞 스트라이커': []
    },

    '거너(남)': {
        '眞 레인저': [],
        '眞 메카닉': [],
        '眞 런처': [],
        '眞 스핏파이어': [],
        '眞 어썰트': []
    },

    '거너(여)': {
        '眞 레인저': [],
        '眞 메카닉': [],
        '眞 런처': [],
        '眞 스핏파이어': []
    },

    '마법사(여)': {
        '眞 엘레멘탈마스터': [],
        '眞 마도학자': [],
        '眞 소환사': [],
        '眞 배틀메이지': [],
        '眞 인챈트리스': []
    },

    '마법사(남)': {
        '眞 엘레멘탈 바머': [],
        '眞 블러드 메이지': [],
        '眞 빙결사': [],
        '眞 디멘션워커': [],
        '眞 스위프트 마스터': []
    },

    '프리스트(남)': {
        '眞 크루세이더': [],
        '眞 퇴마사': [],
        '眞 인파이터': [],
        '眞 어벤저': []
    },

    '프리스트(여)': {
        '眞 크루세이더': [],
        '眞 이단심판관': [],
        '眞 미스트리스': [],
        '眞 무녀': []
    },

    '도적': {
        '眞 로그': [],
        '眞 쿠노이치': [],
        '眞 섀도우댄서': [],
        '眞 사령술사': []
    },

    '나이트': {
        '眞 엘븐나이트': [],
        '眞 카오스': [],
        '眞 드래곤나이트': [],
        '眞 팔라딘': []
    },

    '마창사': {
        '眞 뱅가드': [],
        '眞 듀얼리스트': [],
        '眞 다크 랜서': [],
        '眞 드래고니안 랜서': []
    },

    '총검사': {
        '眞 요원': [],
        '眞 트러블 슈터': [],
        '眞 히트맨': [],
        '眞 스페셜리스트': []
    },

    '아처': {
        '眞 뮤즈': [],
        '眞 트래블러': [],
        '眞 헌터': [],
        '眞 비질란테': []
    },

    '다크나이트': {
        '眞 다크나이트': []
    },

    '크리에이터': {
        '眞 크리에이터': []
    }

}

const gkM = jobInfoMap['귀검사(남)'];
const gkF = jobInfoMap['귀검사(여)'];
const figherF = jobInfoMap['격투가(여)'];
const figherM = jobInfoMap['격투가(남)'];
const gunnerM = jobInfoMap['거너(남)'];
const gunnerF = jobInfoMap['거너(여)'];
const mageM = jobInfoMap['마법사(남)'];
const mageF = jobInfoMap['마법사(여)'];
const priestM = jobInfoMap['프리스트(남)'];
const priestF = jobInfoMap['프리스트(여)'];
const rogue = jobInfoMap['도적'];
const knight = jobInfoMap['나이트'];
const lancer = jobInfoMap['마창사'];
const gunble = jobInfoMap['총검사'];
const archer = jobInfoMap['아처'];
const dk = jobInfoMap['다크나이트'];
const creator = jobInfoMap['크리에이터'];

gkM['眞 웨펀마스터'].push('물리');
gkM['眞 소울브링어'].push('마법');
gkM['眞 검귀'].push('물리');

gkF['眞 소드마스터'].push('물리');
gkF['眞 다크템플러'].push('마법');
gkF['眞 데몬슬레이어'].push('물리');
gkF['眞 베가본드'].push('물리');

figherF['眞 넨마스터'].push('마법');
figherF['眞 스트라이커'].push('물리');

figherM['眞 넨마스터'].push('마법');
figherM['眞 스트라이커'].push('물리');
figherM['眞 그래플러'].push('물리');

gunnerM['眞 메카닉'].push('마법');
gunnerM['眞 레인저'].push('물리');
gunnerM['眞 런처'].push('물리');
gunnerM['眞 어썰트'].push('물리');

gunnerF['眞 메카닉'].push('마법');
gunnerF['眞 레인저'].push('물리');
gunnerF['眞 런처'].push('물리');

mageM['眞 블러드 메이지'].push('물리');
mageM['眞 스위프트 마스터'].push('물리');
mageM['眞 엘레멘탈 바머'].push('마법');
mageM['眞 빙결사'].push('마법');

mageF['眞 엘레멘탈마스터'].push('마법');
mageF['眞 소환사'].push('마법');
mageF['眞 배틀메이지'].push('물리');

priestM['眞 어벤저'].push('마법');
priestM['眞 인파이터'].push('물리');

priestF['眞 무녀'].push('마법');
priestF['眞 미스트리스'].push('마법');
priestF['眞 이단심판관'].push('물리');

rogue['眞 로그'].push('물리');
rogue['眞 섀도우댄서'].push('물리');
rogue['眞 사령술사'].push('마법');
rogue['眞 쿠노이치'].push('마법');

knight['眞 엘븐나이트'].push('물리');
knight['眞 팔라딘'].push('물리');

lancer['眞 뱅가드'].push('물리');
lancer['眞 듀얼리스트'].push('물리');
lancer['眞 드래고니안 랜서'].push('마법');
lancer['眞 다크 랜서'].push('마법');

gunble['眞 히트맨'].push('물리');
gunble['眞 요원'].push('물리');
gunble['眞 트러블 슈터'].push('물리');
gunble['眞 스페셜리스트'].push('마법');

archer['眞 트래블러'].push('물리');
archer['眞 헌터'].push('물리');
archer['眞 비질란테'].push('마법');

export { jobInfoMap };