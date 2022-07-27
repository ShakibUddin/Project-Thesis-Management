import axios from "axios"
import * as API_CONSTANTS from './Constants/ApiConstants'
export const makeApiCall = async ({ method, path, body = null, parameter = "", token = "" }) => {
    let headers = { 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*", "Accept": "application/json" }
    if (token !== "") {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await axios({
        method,
        headers,
        data: body,
        url: API_CONSTANTS.BASE_URL + path + parameter,
        timeout: API_CONSTANTS.REQUEST_TIMEOUT
    });
    return response.data;
}