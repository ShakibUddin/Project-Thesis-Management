import axios from "axios";
import * as API_CONSTANTS from "./Constants/ApiConstants";
export const makeApiCall = async ({
  method,
  path,
  body = null,
  parameter = "",
  token = "",
}) => {
  console.log(path);
  let headers = {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  };
  if (token !== "") {
    headers["Authorization"] = `Bearer ${token}`;
  }
  try {
    const response = await axios({
      method,
      headers,
      data: body,
      url: API_CONSTANTS.BASE_URL + path + parameter,
      timeout: API_CONSTANTS.REQUEST_TIMEOUT,
    });
    return response.data;
  } catch (e) {
    return e?.response?.data;
  }
};
