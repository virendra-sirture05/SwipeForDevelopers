import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice';
import feedReducer from './slice/feedSlice'
import connectionReducer from './slice/connectionSlice';
import requestReducer from './slice/requestSlice';
const appStore = configureStore({
    reducer:{
        user : userReducer,
        feed : feedReducer,
        connection : connectionReducer,
        requests : requestReducer,
    }
})

export default appStore;