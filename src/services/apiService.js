import axios from "axios";
import env from "react-dotenv";
import Cookies from 'universal-cookie';

//TODO here we should put the base url from the server side
axios.defaults.baseURL = env.SERVER_URL
const cookies = new Cookies()

export function getPrivate(path) {
    const token = localStorage.getItem("token")
    console.log(token)
    return axios.get(path, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export function postPrivate(path, body) {
    const token = localStorage.getItem("token")
    return axios.post(path, body, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export function putPrivate(path, id, data) {
    const token = localStorage.getItem("token")
    return axios.put(path + id, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export function getPublic(path) {
    return axios.get(path);
}

export function postPublic(path, body) {
    console.log(path)
    return axios.post(path, body);
}

export async function deletePrivate(path) {
    const token = localStorage.getItem("token")
    return axios.delete(path, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}