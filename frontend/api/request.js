import axios from "axios";
import {paths} from "./paths";

const URL = "http://localhost:8000/api/";

const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('authtoken', token)
}

const getTokenFromLocalStorage = () => {
    return localStorage.getItem('authtoken')
}

export const request = async ({type, path, data = null, updateState}) => {
    try {
        const url = `${URL}${paths[path]}`;
        const token = getTokenFromLocalStorage()
        const headers = token ? {Authorization: `Token ${token}`} : {}
        let response;

        if (type === "get" || type === "delete") {
            response = await axios[type](url, {headers});
        } else {
            response = await axios[type](url, data, {headers});
        }

        console.log(response);

        if (path === "register" && response.data.token) {
            saveTokenToLocalStorage(response.data.token);
        }

        updateState(path, "data", response.data);
    } catch (error) {
        updateState(path, "error", error.message);
        throw error;
    }
};
