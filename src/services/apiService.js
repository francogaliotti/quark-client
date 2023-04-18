import axios from "axios";
import Cookies from 'universal-cookie';

//TODO here we should put the base url from the server side
axios.defaults.baseURL = (process.env.REACT_APP_SERVER_URL) 
const cookies = new Cookies()
const token = cookies.get("QuarkSession")

export async function getPrivate(path) {
    console.log(axios.defaults.baseURL)
    const cookies = new Cookies()
const token = cookies.get("QuarkSession")
    return axios.get(path, {
        headers: { quarksession: token },
    });
}

export async function postPrivate(path, body) {
    const cookies = new Cookies()
    const token = cookies.get("QuarkSession")
    return axios.post(path, body, {
        headers: { quarksession: token },
    });
}

export async function putPrivate(path, data) {
    const cookies = new Cookies()
    const token = cookies.get("QuarkSession")
    return axios.put(path, data, {
        headers: { quarksession: token },
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

export async function deletePrivate(path) {
    const cookies = new Cookies()
    const token = cookies.get("QuarkSession")
    return axios.delete(path, {
        headers: { quarksession: token },
    })
}