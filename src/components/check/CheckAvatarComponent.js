import { checkAvatar } from "../../common/check/avatarFunction";

const CheckAvatarComponent = (avatar) => {

    const chkList = checkAvatar(avatar)

    return (
        <div>
            아바타입니다
        </div>
    );
}

export default CheckAvatarComponent;