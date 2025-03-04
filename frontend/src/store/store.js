import {configureStore} from '@reduxjs/toolkit' ;
import userReducer from './auth/authSlice.js' ;
import classesReducer from './class/classSlice.js';
import studentsReducer from './students/studentsSlice.js';

const store = configureStore({
    reducer : {
        user : userReducer ,
        classes : classesReducer ,
        students : studentsReducer ,
    }
});

export default store ;