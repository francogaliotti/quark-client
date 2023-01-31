import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { postPublic } from '../services/apiService'

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
            sessionStorage.setItem("sesskey", action.payload.sesskey)
            sessionStorage.setItem("token", action.payload.token)
            const cookies = new Cookies()
            cookies.set('username', action.payload.moodleUserData.username)
            state.user = action.payload
            console.log(action.payload)           
        },
        logout: async (state) => {
            sessionStorage.removeItem("sesskey")
            sessionStorage.removeItem("token")
            const cookies = new Cookies()
            cookies.remove('myCookieName')
            cookies.remove('username')
            const res = await postPublic(`/sesskey/`, {
                'id': state.user.id,
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