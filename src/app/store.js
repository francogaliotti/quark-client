import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import formReducer from '../features/formSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        form: formReducer
    }
})