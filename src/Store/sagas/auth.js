import {put} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes'; 
function* logout(action){
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate ');
    yield localStorage.removeItem('userId');

    put({
            type:actionTypes.AUTH_LOGOUT
        });

}