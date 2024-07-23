
// const menuList = ['equip', 'trait', 'skilltree', 'switching', 'avatar', 'creature', 'check'];
const menuList = ['equip','switching', 'avatar', 'creature', 'check'];

const MenuNav = ({ menu, setMenu }) => {

    const translationMenu = (item) => {
        switch (item) {
            case 'equip': return '장비정보';
            case 'skilltree': return '스킬트리';
            case 'skillCustom': return '스킬상세';
            case 'trait': return '보조특성';
            case 'switching': return '버프강화';
            case 'avatar': return '아바타';
            case 'creature': return '크리쳐';
            case 'check': return '진단';
            default: return item;
        }
    }

    return (
        <div className="flex items-center justify-center text-white mb-4">
            {menuList?.map((item, idx) => (
                <div key={idx}
                    className={`flex items-center justify-center w-[100px] h-[40px] mr-4 
                        cursor-pointer duration-200 transition-colors
                 ${item === menu ? 'border-2 border-[rgb(255,180,0)] transition-none bg-cat2' : 'bg-cat2 hover:bg-[rgb(40,50,57)]'}`}
                    onClick={() => setMenu(item)}
                >
                    {translationMenu(item)}
                </div>
            ))}
        </div>
    );
}

export default MenuNav;