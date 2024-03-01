import axios from "axios";
import { useNavigate } from "react-router-dom";


const API_SERVER = "http://localhost:8080/api/";


export const getCharList = async (data) => {

    const res = await axios.get(API_SERVER + 'list', {
        params: data
    });

    return res;
}

export const getCharProfile = async (serverId, characterId) => {

    const res = await axios.get(API_SERVER + 'profile', {
        params: {
            serverId: serverId,
            characterId: characterId
        }
    });

    return res;
}