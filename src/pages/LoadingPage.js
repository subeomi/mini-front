import BaseNav from "../layouts/BaseNav";

const LoadingPage = () => {

    return (
        <div>
            <div className="flex justify-center">
                <div className="md:max-w-[1000px] w-full">
                    <div className="flex flex-wrap justify-center md:justify-between md:flex-row items-center">
                        <div className="flex justify-center p-2 pt-4 text-white md:w-[45%]">
                            <div className="bg-cat1 animate-pulse w-[204px] h-[234px]">
                            </div>
                            <div className="ml-2 flex flex-col p-2">
                                <span className="w-[90px] h-[27px] bg-cat1 animate-pulse mb-3"></span>
                                <span className="w-[90px] h-[19px] bg-cat1 animate-pulse mb-1"></span>
                                <span className="w-[90px] h-[22px] bg-cat1 animate-pulse mb-1"></span>
                                <span className="w-[90px] h-[22px] bg-cat1 animate-pulse mb-1">
                                </span>
                            </div>
                        </div>
                        <div className="md:w-[45%] w-full flex flex-col md:mb-0 mb-8 justify-center items-center">
                            <div className="mx-auto">
                                {[...Array(5).keys()].map(i => (
                                    <div key={i + 'alts'}
                                        className='h-[31px] mb-2 bg-cat1 animate-pulse cursor-pointer w-[333px] flex'>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center text-white mb-4">
                        {[...Array(5).keys()].map(i => (
                            <div key={i + 'menu'}
                                className={`flex items-center justify-center w-[100px] h-[40px] cursor-pointer bg-cat1 animate-pulse
                        ${i < 4 && 'mr-4'}`}
                            >
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <div className="md:w-[90%] w-full p-2">
                            <div className="pb-2 font-bold flex justify-between">
                                <span className="w-[75px] h-[24px] bg-cat1 animate-pulse mb-2">
                                </span>
                            </div>
                            {[...Array(13).keys()].map(i => (
                                <div key={i + 'equip'}
                                    className="h-[75px] bg-cat1 cursor-pointer animate-pulse mb-1">
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingPage;