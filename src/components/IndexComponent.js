import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

const initState = {
    type: 'character',
    keyword: ''
}

const IndexComponent = () => {

    const nav = useNavigate();
    const [search, setSearch] = useState(initState);
    const [recentSearch, setRecentSearch] = useState([]);

    const getSearchHistory = () => {
        const search = localStorage.getItem('search.History');
        return search ? JSON.parse(search) : [];
    }

    const deleteSearchHistory = (index) => {
        let recent = getSearchHistory();

        recent.splice(index, 1);

        localStorage.setItem('search.History', JSON.stringify(recent));
        setRecentSearch(recent);
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

    const handleOnEnter = e => {
        if (e.key === 'Enter') {
            goSearch();
        }
    };

    useEffect(() => {
        const result = getSearchHistory();
        setRecentSearch(result);
    }, [])

    const goSearch = () => {
        const searchParams = createSearchParams({ type: search.type, keyword: search.keyword.trim() }).toString();
        addSearchHistory(search);
        nav(`/search?${searchParams}`);
    }

    const goRecent = (item) => {
        const searchParams = createSearchParams({ type: item.type, keyword: item.keyword }).toString();
        addSearchHistory(item);
        nav(`/search?${searchParams}`);
    }

    const translationType = (t) => {
        switch (t) {
            case "character": return "캐릭터"
            case "adventure": return "모험단"
        }
    }

    const handleSelect = (e) => {
        setSearch({ type: e.target.value })
    }

    console.log(recentSearch)
    console.log(search)

    return (
        <div className="flex justify-center">
            <div className="w-[500px] h-[300px] mt-14 p-4">
                <div
                    className="flex justify-center items-center mt-6 px-4 py-5 border-2 
                border-[rgb(35,41,50)] hover:border-[rgb(53,65,73)] rounded-md h-12 text-white">
                    <select className="bg-cat4 mr-2 cursor-pointer border-none focus:outline-none px-1 text-[14px]" 
                    onChange={handleSelect}
                    >
                        <option value="character">모든 서버</option>
                        <option value="adventure">모험단</option>
                    </select>
                    <input
                        type="text"
                        className="w-full focus:outline-none bg-transparent cursor-pointer"
                        value={search.keyword || ''}
                        maxLength="14"
                        placeholder="검색어"
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
                {recentSearch.length > 0 &&
                    <div className="p-4 flex flex-wrap justify-between items-center content-start bg-[rgb(35,41,50)] mt-4 rounded-md">
                        {recentSearch.map((item, index) => (
                            <div
                                className="py-2 px-3 text-[14px] flex items-center mx-2 relative cursor-pointer text-white w-[200px]"
                                key={index}
                                onClick={() => goRecent(item)}
                            >
                                <span className="text-[12px] text-gray-400 mr-2">
                                    {translationType(item.type)}
                                </span>
                                <span className="overflow-ellipsis">
                                    {item.keyword}
                                </span>
                                <button
                                    className='w-5 h-5 flex items-center justify-center absolute right-[-8px]'
                                    onClick={(e) => {
                                        deleteSearchHistory(index);
                                        e.stopPropagation();
                                    }}
                                >
                                    <span className="text-gray-100 text-[16px]">×</span>
                                </button>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}

export default IndexComponent;