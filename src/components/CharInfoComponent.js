import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCharProfile } from "../api/dnfAPI";
import MenuNav from "../layouts/MenuNav";
import AvatarComponent from "./avatar/AvatarComponent";
import CharProfileComponent from "./charInfo/CharProfileComponent";
import CheckInfoComponent from "./check/CheckInfoComponent";
import CreatureComponent from "./creature/CreatureComponent";
import EquipComponent from "./equip/EquipComponent";
import SwitchingComponent from "./switching/SwitchingComponent";

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
            // setSkills(findCharSkill(info));
            console.log('info: ', info)
        }
    }, [info])

    // console.log('coolTimeMath: ', skills?.math)
    // console.log('skills: ', skills);


    const renderComponent = () => {
        if (menu === 'equip') {
            return <EquipComponent equipment={info.equipment} skills={skills}></EquipComponent>;
        } else if (menu === 'switching') {
            return <SwitchingComponent switching={info.switching}></SwitchingComponent>
        } else if (menu === 'avatar') {
            return <AvatarComponent avatar={info.avatar}></AvatarComponent>
        } else if (menu === 'creature') {
            return <CreatureComponent creature={info.creature}></CreatureComponent>
        } else if (menu === 'check') {
            return <CheckInfoComponent
                creature={info.creature} avatar={info.avatar} equipment={info.equipment} switching={info.switching}
                jobGrowName={info.data.jobGrowName} jobName={info.data.jobName}
            ></CheckInfoComponent>
        }
    };

    return (
        <div className="mb-20">
            {info.equipment && (
                <div name="equip"
                    className="w-[1000px]">

                    <CharProfileComponent
                        serverId={profile.serverId} info={info}
                    ></CharProfileComponent>
                    <MenuNav menu={menu} setMenu={setMenu} />
                    {renderComponent()}
                </div>
            )}
        </div>
    );
}

export default CharInfoComponent;