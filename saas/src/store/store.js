import {configureStore} from '@reduxjs/toolkit' ;
import userReducer from './auth/authSlice.js' ;
import classesReducer from './class/classSlice.js';
import studentsReducer from './students/studentsSlice.js';
import loadingReducer from './Loading.js' ;
import reportReducer from './reports/reportSlice.js';

const store = configureStore({
    reducer : {
        user : userReducer ,
        classes : classesReducer ,
        reports : reportReducer ,
        students : studentsReducer ,
        loading : loadingReducer ,
    }
});

export default store ;