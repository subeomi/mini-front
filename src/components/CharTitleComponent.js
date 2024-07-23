import ispinsImage from '../assets/images/icon/monster/Ispins.png';
import myreImage from '../assets/images/icon/monster/Myre.png';
import duskyImage from '../assets/images/icon/monster/Largo.png';
import bakalImage from '../assets/images/icon/monster/Bakal.png';
import { commaGold } from '../common/globalFunction';

const CharTitlecomponent = ({ price }) => {


    const title = Object.entries(price)
    const totalPrice = title.reduce((acc, [key, value]) => acc + Number(value), 0);
    const titleName = (n) => {
        switch (n) {
            case 'switching': return '버프강화';
            case 'avatar': return '아바타';
            case 'creature': return '크리쳐';
            case 'enchant': return '마법부여';
            case 'equip': return '장비';
            default: return n;
        }
    }
    return (
        <div className="w-[45%] text-white mb-10 mt-2 p-2">
            <div className='w-[300px]'>
                {title && title.map(([key,value], index) => (
                    <div key={index} className='flex justify-between text-[14px]'>
                        <span className=''>
                            {titleName(key)}
                        </span>
                        <span className=''>
                            {commaGold(value)}
                        </span>
                    </div>
                ))}
                <div className='mt-2 font-bold'>
                    <span>
                        합계 {commaGold(totalPrice)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CharTitlecomponent;