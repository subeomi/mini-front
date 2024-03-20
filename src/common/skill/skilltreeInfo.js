import skillImage from "../skillImages";

const skillGrid = {};

// 공용스킬
skillGrid['백스텝'] = { name: '백스텝', icon: skillImage['백스텝'], gridArea: '1 / 2' };
skillGrid['퀵 스탠딩'] = { name: '퀵 스탠딩', icon: skillImage['퀵 스탠딩'], gridArea: '1 / 3' };
skillGrid['기본기 숙련'] = { name: '기본기 숙련', icon: skillImage['기본기 숙련'], gridArea: '1 / 4' };
skillGrid['도약'] = { name: '도약', icon: skillImage['도약'], gridArea: '1 / 5' };
skillGrid['백스텝 강화'] = { name: '백스텝 강화', icon: skillImage['백스텝 강화'], gridArea: '1 / 6' };
skillGrid['크리티컬 히트'] = { name: '크리티컬 히트', icon: skillImage['크리티컬 히트'], gridArea: '1 / 7' };
skillGrid['백 어택'] = { name: '백 어택', icon: skillImage['백 어택'], gridArea: '1 / 8' };
skillGrid['고대의 기억'] = { name: '고대의 기억', icon: skillImage['고대의 기억'], gridArea: '1 / 9' };
skillGrid['불굴의 의지'] = { name: '불굴의 의지', icon: skillImage['불굴의 의지'], gridArea: '1 / 10' };
skillGrid['컨버전'] = { name: '컨버전', icon: skillImage['컨버전'], gridArea: '1 / 12' };
skillGrid['방어구 마스터리'] = { name: '방어구 마스터리', icon: skillImage['방어구 마스터리'], gridArea: '2 / 2' };

const bagicSkills = ['백스텝', '퀵 스탠딩', '기본기 숙련', '도약', '백스텝 강화', '크리티컬 히트', '백 어택', '고대의 기억', '불굴의 의지', '컨버전', '방어구 마스터리'];

export { skillGrid, bagicSkills };