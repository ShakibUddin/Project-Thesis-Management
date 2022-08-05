import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import AuthReducer from "./State/Auth/AuthReducer";
import UserReducer from "./State/User/UserReducer";
import rootSaga from './Sagas';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/es/storage/session'

const rootReducers = combineReducers({
    user: UserReducer,
    auth: AuthReducer,
});

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['auth'] // only auth will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducers)

const sagaMiddleware = createSagaMiddleware();

const composeSetup =
    process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

const enhancer = composeSetup(applyMiddleware(sagaMiddleware));

const store = {
    ...createStore(persistedReducer, enhancer),
    sagas: Object.keys(rootSaga).map(sagaName => sagaMiddleware.run(rootSaga[sagaName])),
};

export const persistor = persistStore(store);
export default store;