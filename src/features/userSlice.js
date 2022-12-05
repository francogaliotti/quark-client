import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

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
            localStorage.setItem("username", action.payload.username)
            localStorage.setItem("sesskey", action.payload.sesskey)
            state.user = action.payload
            console.log(state.user)
        },
        logout: async (state) => {
            localStorage.removeItem("username")
            localStorage.removeItem("sesskey")
            const res = await axios.post(`https://api-perfil.uc.r.appspot.com/sesskey/`, {
                'id': 4, //aca tiene que ir state.user.id
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