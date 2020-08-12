import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import burgerBuilderReducer from './Store/reducers/burgerBuilder';
import orderReducer from './Store/reducers/order';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import * as serviceWorker from './serviceWorker';
import authReducer from './Store/reducers/auth';
import {watchAuth} from './Store/sagas'; 
const composeEnhancers = process.env.NODE_ENV==='development'?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;
const rootReducer = combineReducers({
  burgerBuilder:burgerBuilderReducer,
  order:orderReducer,
  auth:authReducer

});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk,sagaMiddleware)
));

sagaMiddleware.run(watchAuth);


const app = (
  <Provider store = {store}>
  <BrowserRouter >
     <App />
 </BrowserRouter>
 </Provider>
);



ReactDOM.render(
  
    app
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
