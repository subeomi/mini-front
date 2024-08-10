import { checkCreature } from "../../common/check/creatureFunction";

const CheckCreatureComponent = (creature) => {

    const chkList = checkCreature(creature)

    return (
        <div>
            크리쳐입니다
        </div>
    );
}

export default CheckCreatureComponent;