export const API_CALL_REQUESTED = 'API_CALL_REQUESTED';

export const requestApiCall = ({ actions, method, path, body = null }) =>
({
    type: API_CALL_REQUESTED,
    payload: {
        actions, method, path, body
    }
})
