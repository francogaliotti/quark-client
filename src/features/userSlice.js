import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { postPublic } from "../services/apiService";
import env from "react-dotenv";

const moodleLogout = async (key) => {
  window.location.href = `http://${env.MOODLE_URL}/login/logout.php?sesskey=${key}`;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      const cookies = new Cookies();
      cookies.set("username", action.payload.moodleUserData.username);
      state.user = action.payload;
      if (action.payload.sesskey) {
        cookies.set("sesskey", action.payload.sesskey);
      }
    },
    logout: async (state) => {
      const cookies = new Cookies();
      const sesskeyCookie = cookies.get("sesskey");
      const res = await postPublic(`/sesskey/`, {
        id: state.user.id,
        sesskey: null,
      });
      await moodleLogout(sesskeyCookie);
      // Obtenemos todas las cookies actuales
      const allCookies = cookies.getAll();
      // Recorremos todas las cookies y las eliminamos
      for (const cookieName in allCookies) {
        cookies.remove(cookieName);
      }
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
