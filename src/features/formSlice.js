import { createSlice } from '@reduxjs/toolkit'
import { postPublic } from '../services/apiService'

export const formSlice = createSlice({
    name: "form",
    initialState: {
        correctCount: 0
    },
    reducers: {
        addAnswer: (state, action) => {
            console.log(action.payload)
            state.correctCount++
            console.log(state.correctCount)
        },
        sendForm: (state) => {
            console.log("El resultado es: ", state.correctCount)            
        },
        backToZero: (state) => {
            state.correctCount = 0
            console.log("es 0: ",state.correctCount)
        }
    }
})

export const { addAnswer, sendForm, backToZero } = formSlice.actions

export const getAnswers = (state) => state.form;

export default formSlice.reducer;