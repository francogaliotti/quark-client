import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'universal-cookie'

const moodleLogout = async (key) => {
    window.location.href = `http://localhost/moodle/login/logout.php?sesskey=${key}`
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        login: (state, action) => {
            sessionStorage.setItem("username", action.payload.username)
            sessionStorage.setItem("sesskey", action.payload.sesskey)
            sessionStorage.setItem("token", action.payload.token)
            const cookies = new Cookies()
            cookies.set('username', action.payload.username, {path:'/', maxAge: 5000})
            state.user = action.payload
            console.log(cookies.getAll())
            
        },
        logout: async (state) => {
            sessionStorage.removeItem("username")
            sessionStorage.removeItem("sesskey")
            sessionStorage.removeItem("token")
            const cookies = new Cookies()
            cookies.remove('myCookieName')
            cookies.remove('username')
            const res = await axios.post(`https://api-perfil.uc.r.appspot.com/sesskey/`, {
                'id': state.user.id, //aca tiene que ir state.user.id
                'sesskey': null
            })
            await moodleLogout(state.user.sesskey)
            state.user = null;
        }
    }
})

export const { login, logout } = userSlice.actions

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;