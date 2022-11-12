import * as AuthActions from "../State/Auth/AuthActions";
import {
  call,
  put,
  race,
  takeLatest,
  delay,
  takeEvery,
} from "redux-saga/effects";
import { API_CALL_REQUESTED } from "../State/Connectivity/ConnectivityActions";
import { makeApiCall } from "../client";
import { PATHS } from "../Constants/ApiConstants";

function* processRequest(action) {
  const { method, path, body, token, actions } = action.payload;
  yield put({ type: actions.REQUESTED });
  const { data, message, error } = yield makeApiCall({
    method,
    path,
    body,
    token,
  });

  if (error) {
    yield put({ type: actions.FAILED, payload: { data, message, error } });
  } else {
    yield put({ type: actions.SUCCEEDED, payload: { data, message, error } });
  }
}
export function* connectivitySaga() {
  yield takeEvery(API_CALL_REQUESTED, processRequest);
}
