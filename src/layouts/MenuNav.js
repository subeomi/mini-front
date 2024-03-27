import { useState } from "react";

const menuList = ['equip', 'trait', 'skilltree', 'skillCustom'];

const MenuNav = ({ menu, setMenu }) => {

    const translationMenu = (item) => {
        switch (item) {
            case 'equip': return '장비정보';
            case 'skilltree': return '스킬트리';
            case 'skillCustom': return '스킬상세';
            case 'trait': return '보조특성';
            default: return item;
        }
    }

    return (
        <div className="flex items-center justify-center text-white mb-4">
            {menuList?.map((item, idx) => (
                <div key={idx}
                    className={`flex items-center justify-center w-[100px] h-[40px] mr-4
                 ${item === menu ? 'bg-cat1 border-t-8 border-[rgb(35,41,50)]' : 'bg-cat3'}`}
                    onClick={() => setMenu(item)}
                >
                    {translationMenu(item)}
                </div>
            ))}
        </div>
    );
}

export default MenuNav;