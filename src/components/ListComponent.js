import { useState } from "react";
import { getCharList, getCharProfile } from "../api/dnfAPI";
import { transServerId } from "../common/globalFunction";
import { Link, useNavigate } from "react-router-dom";

const initState = {
    characterName: ''
}

const ListComponent = () => {

    const nav = useNavigate();
    const [charList, setCharList] = useState([]);
    const [search, setSearch] = useState(initState);
    const [isSearching, setIsSearching] = useState(false);

    const getSearchHistory = () => {
        const search = localStorage.getItem('search.History');
        return search ? JSON.parse(search) : [];
    }

    const addSearchHistory = (keyword) => {
        let recent = getSearchHistory();

        const index = recent.indexOf(keyword);
        if (index !== -1) {
            recent.splice(index, 1);
        }

        recent.unshift(keyword);

        if (recent.length > 10) {
            recent = recent.slice(0, 10);
        }

        localStorage.setItem('search.History', JSON.stringify(recent));
    }

    const searchCool = () => {

        if (isSearching) {
            return;
        }

        setIsSearching(true);

        setTimeout(() => {
            getCharList(search).then(data => {
                if (data.data.massege === 'DNF_SYSTEM_INSPECT') {
                    nav('/server', { state: { message: 'DNF_SYSTEM_INSPECT' } });
                }

                addSearchHistory(search);
                setCharList(data.data.rows);
            }).catch(err => {
                console.log("캐릭터 검색 에러: " + err);
            }).finally(() => {
                setIsSearching(false);
            });

            setSearch(initState);
        }, 200);
    }

    const handleOnEnter = e => {
        if (e.key === 'Enter') {
            searchCool();
        }
    };

    console.log(search);
    console.log(charList);

    return (
        <div className="flex justify-center">
            <div className="w-[1000px] bg-white">

                <div className="flex justify-center">
                    <input
                        type="text"
                        className="border-2 p-2"
                        value={search.characterName}
                        placeholder="캐릭터명"
                        onChange={e => {
                            setSearch({ ...search, characterName: e.target.value });
                        }}
                        onKeyDown={handleOnEnter}
                    ></input>
                    <div id="searchButton">
                        <button
                            className="border-2 p-2"
                            onClick={searchCool}
                        >버튼</button>
                    </div>
                </div>

                <div className="p-2 flex flex-wrap gap-0 justify-center min-h-screen">
                    {charList.length > 0 && charList.map(char => (
                        <Link key={char.characterId}
                            className="w-[220px] h-[340px] bg-white border-2 rounded-xl border-slate-600 m-1 py-[10px] flex flex-col 
                        justify-center items-center hover:bg-slate-100 cursor-pointer"
                            to={`/character?serverId=${char.serverId}&characterId=${char.characterId}`}>
                            <div>
                                <img
                                    src={`https://img-api.neople.co.kr/df/servers/${char.serverId}/characters/${char.characterId}?zoom=1`} />
                            </div>
                            <p>
                                Lv.{char.level}
                            </p>
                            <p className="font-bold">
                                {char.characterName}
                            </p>
                            <span className="flex w-[180px] justify-center items-center">
                                <p className="text-[12px]">{char.jobGrowName}</p>
                                <i id="v-s"></i>
                                <p className="text-[14px]">{transServerId(char.serverId)}</p>
                            </span>
                            <span className="flex items-center">
                                <p className="text-[14px]">명성</p>
                                <p className="text-[#3392ff] ml-[5px]">{char.fame}</p>
                            </span>
                        </Link>
                    ))}

                </div>
            </div>
        </div>

    );
}

export default ListComponent;