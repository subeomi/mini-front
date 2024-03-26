import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCharProfile } from "../../api/dnfAPI";
import { findCharSkill, } from "../../common/skill/coolTimeFunction";
import CharProfileComponent from "../CharProfileComponent";
import EquipAndSkilsComponent from "./EquipAndSkillsComponent";
import SkillCustomComponent from "./SkillCustomComponent";
import SkilltreeComponent from "./SkilltreeComponent";
import MenuNav from "../../layouts/MenuNav";

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
    const [menu, setMenu] = useState('equip');

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
        if (menu === 'skillCustom') {
            return <SkillCustomComponent skills={skills} jobName={info.data.jobGrowName}></SkillCustomComponent>;
        } else if (menu === 'equip') {
            return <EquipAndSkilsComponent equipment={info.equipment.equipment} skills={skills}></EquipAndSkilsComponent>;
        } else if (menu === 'skilltree') {
            return <SkilltreeComponent skills={info.originSkill} jobSkill={info.jobSkill.skills}
                jobName={info.data.jobName} jobGrowName={info.data.jobGrowName} jobId={info.data.jobGrowId}></SkilltreeComponent>;
        }
    };

    return (
        <div className="flex justify-center h-screen mb-20">
            {info.equipment && (
                <>
                    <div name="equip"
                        className="w-[1000px]">

                        <CharProfileComponent title={info.title} serverId={profile.serverId} data={info.data}></CharProfileComponent>
                        <MenuNav menu={menu} setMenu={setMenu} />
                        {renderComponent()}
                    </div>
                </>
            )}
        </div>
    );
}

export default CharInfoComponent;