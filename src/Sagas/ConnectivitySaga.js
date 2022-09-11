import * as AuthActions from '../State/Auth/AuthActions';
import { call, put, race, takeLatest, delay, takeEvery } from 'redux-saga/effects';
import { API_CALL_REQUESTED } from '../State/Connectivity/ConnectivityActions';
import { makeApiCall } from '../client';

function* processRequest(action) {
    const { method, path, body, token, actions } = action.payload;
    yield put({ type: actions.REQUESTED })
    const { data, message, error } = yield makeApiCall({ method, path, body, token });
    if (error) {
        yield put({ type: actions.FAILED, payload: message })
    }
    else {
        yield put({ type: actions.SUCCEEDED, payload: data })
    }
}
export function* connectivitySaga() {
    yield takeEvery(API_CALL_REQUESTED, processRequest)
}