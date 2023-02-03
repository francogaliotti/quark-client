import axios from "axios";
import env from "react-dotenv";
import Cookies from 'universal-cookie';

//TODO here we should put the base url from the server side
axios.defaults.baseURL = env?.SERVER_URL || "http://34.71.113.200:3030/"
const cookies = new Cookies()
const token = cookies.get("QuarkSession")

export async function getPrivate(path) {
    return axios.get(path, {
        headers: { QuarkSession: token },
    });
}

export async function postPrivate(path, body) {
    return axios.post(path, body, {
        headers: { QuarkSession: token },
    });
}

export async function putPrivate(path, data) {
    return axios.put(path, data, {
        headers: { QuarkSession: token },
    });
}

export async function getPublic(path) {
    return axios.get(path);
}

export async function postPublic(path, body) {
    console.log(path)
    return axios.post(path, body);
}

export async function putPublic(path, body) {
    console.log(path)
    return axios.put(path, body);
}

export async function deletePublic(path) {
    console.log(path)
    return axios.delete(path);
}

export async function deletePrivate(path) {
    const token = localStorage.getItem("token")
    return axios.delete(path, {
        headers: { QuarkSession: token },
    })
}