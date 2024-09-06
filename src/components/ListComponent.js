import { useEffect, useState } from "react";
import { getCharList, getCharProfile } from "../api/dnfAPI";
import { transServerId } from "../common/globalFunction";
import { Link, createSearchParams, useLocation, useNavigate } from "react-router-dom";

const initState = {
    type: 'character',
    keyword: ''
}

const ListComponent = () => {

    const nav = useNavigate();
    const location = useLocation();
    const [charList, setCharList] = useState([]);
    const [search, setSearch] = useState(initState);
    const [isSearching, setIsSearching] = useState(false);
    const [recentSearch, setRecentSearch] = useState([]);

    const getSearchHistory = () => {
        const search = localStorage.getItem('search.History');
        return search ? JSON.parse(search) : [];
    }

    const addSearchHistory = (search) => {
        let recent = getSearchHistory();

        recent = recent.filter(item => item.type !== search.type || item.keyword !== search.keyword);

        recent.unshift(search);

        if (recent.length > 10) {
            recent = recent.slice(0, 10);
        }

        localStorage.setItem('search.History', JSON.stringify(recent));
        setRecentSearch(recent);
    }

    const goSearch = () => {
        const searchParams = createSearchParams({ type: search.type, keyword: search.keyword.trim() }).toString();
        addSearchHistory(search);
        nav(`/search?${searchParams}`);
    }

    const searchCool = (k) => {

        if (isSearching) {
            return;
        }

        setIsSearching(true);

        setTimeout(() => {
            getCharList(k).then(data => {
                if (data.data.message === 'DNF_SYSTEM_INSPECT') {
                    nav('/server', { state: { message: 'DNF_SYSTEM_INSPECT' } });
                }

                setCharList(data.data);
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
            goSearch();
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const keyword = searchParams.get("keyword");
        const type = searchParams.get("type");

        searchCool({ type: type, keyword: keyword });

    }, [location.search])

    // console.log('search: ', search);
    console.log(charList);

    return (
        <div className="text-white">
            <div className="md:w-[1000px] flex flex-col justify-center">
                <div
                    className="flex justify-center items-center mt-6 px-4 py-5 border-2 w-[90%] md:w-[468px] m-auto my-4
                border-[rgb(35,41,50)] hover:border-[rgb(53,65,73)] rounded-md h-12 text-white">
                    <input
                        type="text"
                        className="w-full focus:outline-none bg-transparent cursor-pointer"
                        value={search.keyword || ''}
                        maxLength="14"
                        placeholder="캐릭터명"
                        onChange={e => {
                            setSearch({ ...search, keyword: e.target.value });
                        }}
                        onKeyDown={handleOnEnter}
                    ></input>
                    <div id="searchButton">
                        <button
                            className="h-9 w-9"
                            onClick={goSearch}
                        >버튼</button>
                    </div>
                </div>

                <div className="md:p-2 flex flex-wrap gap-0 justify-center min-h-screen">
                    {charList && charList.length > 0 && charList.map((char, index) => (
                        <Link key={char.characterId}
                            className={`bg-[rgb(35,41,50)] w-[45%] md:w-[230px] md:h-[340px] h-[280px] rounded-md m-1 py-[10px] flex flex-col 
                            justify-center items-center hover:bg-[rgb(40,50,57)] cursor-pointer relative`}

                            to={`/character?serverId=${char.serverId}&characterId=${char.characterId}`}>
                                    <span className="text-[10px] md:text-[12px] absolute top-3 left-4">{char.jobGrowName}</span>
                                    <span className="text-[12px] md:text-[14px] absolute top-3 right-4">{transServerId(char.serverId)}</span>
                            <div className="h-[70%] overflow-hidden">
                                <img
                                    src={`https://img-api.neople.co.kr/df/servers/${char.serverId}/characters/${char.characterId}?zoom=1`} />
                            </div>
                            <div className="text-[12px] md:text-[14px] flex flex-col justify-center items-center">

                                <div className="flex items-center">
                                    <span className="text-[#3e965b]">
                                        {char.adventureName || '-'}
                                    </span>
                                    <div className="v-s" />
                                    <span>
                                        {char.guildName && char.guildName !== 'null' ? char.guildName : '-'}
                                    </span>
                                </div>

                                <p className="text-[14px] md:text-[16px] font-bold py-[1px]">
                                    {char.characterName}
                                </p>
                                <span className="flex items-center">
                                    <p className="">명성</p>
                                    <p className="text-[#3392ff] ml-[5px]">{char.fame || 0}</p>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default ListComponent;