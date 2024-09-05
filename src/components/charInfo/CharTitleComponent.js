import { Link } from 'react-router-dom';

const CharTitlecomponent = ({ data }) => {

    const altList = Array.isArray(data?.alt) && data.alt

    return (
        <div className="md:w-[45%] w-full overflow-scroll flex flex-col md:mb-0 mb-8 text-white justify-center items-center">
            <div className='mx-auto'>
                {altList?.filter(item => item.characterId !== data.characterId).map((item, index) => (
                    <Link key={item?.characterId}
                        className='h-[35px] mb-1 hover:bg-[rgb(35,41,50)] p-2 text-[13px] cursor-pointer w-full flex'
                        to={`/character?serverId=${item.serverId}&characterId=${item.characterId}`}>
                        <div className='flex  justify-center'>
                            <img className="w-[20px] h-[20px]"
                                src={`https://img-api.neople.co.kr/df/servers/${item.serverId}/characters/${item.characterId}?zoom=1`} />
                            <div className='w-[140px]'>{item.characterName}</div>
                            <div className='text-[#3392ff] w-[40px]'>{item.fame}</div>
                            <div className='ml-2'>{item.jobGrowName}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CharTitlecomponent;