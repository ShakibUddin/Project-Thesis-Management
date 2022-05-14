import axios from "axios"
import * as API_CONSTANTS from './Constants/ApiConstants'
export const callApi = ({ method, path, body = null, parameter = "", token = "" }) => {
    let headers = { 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*", "Accept": "application/json" }
    if (token !== "") {
        headers["Authorization"] = `Bearer ${token}`;
    }
    axios({
        method,
        headers,
        data: body,
        url: API_CONSTANTS.BASE_URL + path + parameter,
        timeout: API_CONSTANTS.REQUEST_TIMEOUT
    })
        .then(function (response) {
            // handle success
            console.log(response);
            return response;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}