import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import UserReducer from "./State/User/UserReducer";


const rootReducers = combineReducers({
    user: UserReducer
})
let store = createStore(rootReducers, composeWithDevTools());


export default store;