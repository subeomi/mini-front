import { transFameRank } from "../../common/check/checkFunction";
import { checkCreature } from "../../common/check/creatureFunction";
import CheckBlock from "../../common/item/CheckBlock";

const CheckCreatureComponent = (creature) => {

    const chkList = checkCreature(creature)

    const creatureArtiGridSlot = {
        RED: '1/5',
        BLUE: '2/5',
        GREEN: '3/5'
    }

    console.log(chkList)

    return (
        <div className="flex md:flex-row flex-col">
            <div className="flex md:w-[50%]">
                <div className="grid grid-cols-[repeat(5,42px)] grid-rows-[repeat(3,46px)]">
                    {creature?.itemId && (
                        <div style={{ gridArea: '2 / 2' }} className={`m-[2px]`}>
                            <img width={`42px`} src={`https://img-api.neople.co.kr/df/items/${creature?.itemId}`} />
                        </div>
                    )}
                    {creature?.artifact?.map((item, index) => {
                        const gridItem = creatureArtiGridSlot[item.slotColor];
                        if (!gridItem) return null;
                        return (
                            <div
                                key={item.itemId}
                                style={{ gridArea: gridItem }}
                                className={`m-[2px]`}>
                                <img width={`42px`} src={`https://img-api.neople.co.kr/df/items/${item.itemId}`} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="md:w-[50%] md:mt-0 mt-4">
                {chkList.map(item => {
                    if (!item.hasOwnProperty('msg')) {
                        return null;
                    } else {
                        return <CheckBlock key={item.msg} chk={item}></CheckBlock>
                    }
                })}
            </div>
        </div>
    );
}

export default CheckCreatureComponent;