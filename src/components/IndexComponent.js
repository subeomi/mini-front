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
        const searchParams = createSearchParams({ type: search.type, keyword: search.keyword }).toString();
        addSearchHistory(search);
        nav(`/search?${searchParams}`);
    }

    const goRecent = (item) => {
        const searchParams = createSearchParams({ type: item.type, keyword: item.keyword }).toString();
        nav(`/search?${searchParams}`);
    }

    console.log(recentSearch)

    return (
        <div className="flex justify-center">
            <div className="w-[500px] h-[300px] bg-white">

                <div className="flex justify-center">
                    <input
                        type="text"
                        className="border-2 p-2"
                        value={search.keyword || ''}
                        placeholder="캐릭터명"
                        onChange={e => {
                            setSearch({ ...search, keyword: e.target.value });
                        }}
                        onKeyDown={handleOnEnter}
                    ></input>
                    <div id="searchButton">
                        <button
                            className="border-2 p-2"
                            onClick={goSearch}
                        >버튼</button>
                    </div>
                </div>
                {recentSearch.length > 0 &&
                    <div className="m-4 flex justify-center items-center">
                        {recentSearch.map((item, index) => (
                            <div
                                className="py-1 px-3 text-[14px] bg-gray-100 flex mx-2 relative cursor-pointer"
                                key={index}
                                onClick={() => goRecent(item)}
                            >
                                <span>
                                    {item.keyword}
                                </span>
                                <button
                                    className='w-4 h-4 bg-white rounded-full flex items-center justify-center absolute right-[-8px] top-[-9px]'
                                    onClick={(e) => {
                                        deleteSearchHistory(index);
                                        e.stopPropagation();
                                    }}
                                >
                                    <span className="block text-gray-500 text-sm">×</span>
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