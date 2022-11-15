import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import AuthReducer from "./State/Auth/AuthReducer";
import TeamReducer from "./State/Team/TeamReducer";
import NotificationsReducer from "./State/Notifications/NotificationsReducer";
import ProjectReducer from "./State/Project/ProjectReducer";
import ProposalReducer from "./State/Proposal/ProposalReducer";
import MeetupReducer from "./State/Meetup/MeetupReducer";
import ACADReducer from "./State/ACAD/ACADReducer";
import rootSaga from "./Sagas";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/es/storage/session";
import createFilter from "redux-persist-transform-filter";

const rootReducers = combineReducers({
  auth: AuthReducer,
  team: TeamReducer,
  notifications: NotificationsReducer,
  project: ProjectReducer,
  proposal: ProposalReducer,
  meetup: MeetupReducer,
  acad: ACADReducer,
});

const saveUserSubsetFilter = createFilter("auth", ["user"]);

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["auth"],
  transforms: [saveUserSubsetFilter],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const sagaMiddleware = createSagaMiddleware();

const composeSetup =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeSetup(applyMiddleware(sagaMiddleware));

const store = {
  ...createStore(persistedReducer, enhancer),
  sagas: Object.keys(rootSaga).map((sagaName) =>
    sagaMiddleware.run(rootSaga[sagaName])
  ),
};

export const persistor = persistStore(store);
export default store;
