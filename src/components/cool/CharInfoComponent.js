import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCharProfile } from "../../api/dnfAPI";
import { isBuffInList, transServerId } from "../../common/globalFunction";
import { calOtherMath, checkAvatarSkillLvl, checkCommandCoolTime, checkCoolTimeNomalGear, checkCoolTimeOptions, checkCoolTimeRunes, checkCoolTimeTalisman, checkJobCoolTime, checkStackSkill, checkStackTalisman, checkTraitCoolTime, setCharMath, findWeaponCoolTime, isSummonerNotCommandSkill, calSkillCT, findCharSkill, } from "../../common/skill/coolTimeFunction";
import CharProfileComponent from "../CharProfileComponent";
import EquipAndSkilsComponent from "./EquipAndSkillsComponent";
import SkillCustomComponent from "./SkillCustomComponent";
import CharTitlecomponent from "../CharTitleComponent";

const initState = {
    serverId: "",
    characterId: ""
}

const CharInfoComponent = () => {

    const nav = useNavigate();
    const location = useLocation();
    const [info, setInfo] = useState({});
    const [profile, setProfile] = useState(initState);
    const [skills, setSkills] = useState({});
    const [custom, setCustom] = useState(false);

    useEffect(() => {

        const searchParams = new URLSearchParams(location.search);
        const serverId = searchParams.get("serverId");
        const characterId = searchParams.get("characterId");

        console.log(serverId);
        console.log(characterId);

        setProfile({ serverId: serverId, characterId: characterId })

        getCharProfile(serverId, characterId).then(data => {
            if (data.data.message === 'DNF_SYSTEM_INSPECT') {
                nav('/server', { state: { message: 'DNF_SYSTEM_INSPECT' } });
            }

            setInfo(data.data);
        })
    }, [location.search]);

    useEffect(() => {
        if (info) {
            setSkills(findCharSkill(info));
        }
    }, [info])

    console.log('coolTimeMath: ', skills?.math)
    console.log('skills: ', skills);

    const renderComponent = () => {
        if (custom) {
            return <SkillCustomComponent skills={skills}></SkillCustomComponent>;
        } else {
            return <EquipAndSkilsComponent equipment={info.equipment.equipment} skills={skills}></EquipAndSkilsComponent>;
        }
    };

    return (
        <div className="flex justify-center">
            {info.equipment && (
                <>
                    <div name="equip"
                        className="w-[1000px]">

                        <CharProfileComponent title={info.title} custom={custom} setCustom={setCustom} serverId={profile.serverId} data={info.data}></CharProfileComponent>
                        {renderComponent()}
                    </div>
                </>
            )}
        </div>
    );
}

export default CharInfoComponent;