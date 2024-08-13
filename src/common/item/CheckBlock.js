const CheckBlock = ({chk}) => {

    const chkBorderColors = (lvl) => {
        switch (lvl) {
            case 1: return 'border-r-red-500';
            case 2: return 'border-r-yellow-400';
            case 3: return 'border-r-emerald-400';
            case 4: return 'border-r-sky-400';
        }
    }

    if(!chk.hasOwnProperty('msg')){
        return '';
    }

    return (
        <div className={`bg-cat1 w-full min-h-[50px] ${chkBorderColors(chk?.lvl)} border-r-4 mb-2 flex items-center p-2`}>
            {chk.msg}
        </div>
    );
}

export default CheckBlock;