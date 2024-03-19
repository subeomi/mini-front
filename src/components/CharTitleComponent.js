import ispinsImage from '../assets/images/icon/monster/Ispins.png';
import myreImage from '../assets/images/icon/monster/Myre.png';
import duskyImage from '../assets/images/icon/monster/Largo.png';
import bakalImage from '../assets/images/icon/monster/Bakal.png';

const CharTitlecomponent = ({ title }) => {
    return (
        <div className="w-[45%] text-white mb-10 mt-2 p-2">
            <div>
                {title["바칼 레이드"] &&
                    <div>
                        <span className="font-bold text-[18px]">레이드</span>
                        <div className='my-4 flex gap-x-[22px]'>
                            <div className='relative w-[42px] h-[42px] rounded-sm border-2 border-gray-500 flex justify-center items-center'>
                                <img src={bakalImage} alt="Ispins" className='h-[30px] w-[30px] flex-shrink-0' />
                                <div className='absolute text-[14px] px-[5px] h-6 flex items-center justify-center -right-5 -top-3 bg-[rgb(23,27,36)] rounded'>
                                    {title["바칼 레이드"]}x
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {(title["어둑섬"] || title["차원회랑"] || title["이스핀즈"]) &&
                    <div>
                        <span className="font-bold text-[18px]">레기온</span>
                        <div className="mt-4 flex gap-x-[22px]">
                            {title["어둑섬"] &&
                                <div className='relative w-[42px] h-[42px] rounded-sm border-2 border-[rgb(40,50,57)] flex justify-center items-center'>
                                    <img src={duskyImage} alt="Ispins" className='h-[30px] w-[30px] flex-shrink-0' />
                                    <div className='absolute text-[14px] px-[5px] h-6 flex items-center justify-center -right-5 -top-3 bg-[rgb(23,27,36)] rounded'>
                                        {title["어둑섬"]}x
                                    </div>
                                </div>
                            }
                            {title["차원회랑"] &&
                                <div className='relative w-[42px] h-[42px] rounded-sm border-2 border-[rgb(40,50,57)] flex justify-center items-center'>
                                    <img src={myreImage} alt="Ispins" className='h-[30px] w-[30px] flex-shrink-0' />
                                    <div className='absolute text-[14px] px-[5px] h-6 flex items-center justify-center -right-5 -top-3 bg-[rgb(23,27,36)] rounded'>
                                        {title["차원회랑"]}x
                                    </div>
                                </div>
                            }
                            {title["이스핀즈"] &&
                                <div className='relative w-[42px] h-[42px] rounded-sm border-2 border-[rgb(40,50,57)] flex justify-center items-center'>
                                    <img src={ispinsImage} alt="Ispins" className='h-[30px] w-[30px] flex-shrink-0' />
                                    <div className='absolute text-[14px] px-[5px] h-6 flex items-center justify-center -right-5 -top-3 bg-[rgb(23,27,36)] rounded'>
                                        {title["이스핀즈"]}x
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default CharTitlecomponent;