import { METHODS, PATHS } from "../../Constants/ApiConstants";
import { requestActions } from "../../requestActions";
import { requestApiCall } from "../Connectivity/ConnectivityActions";

const MODULE_NAME = "USER";
export const GET_ALL_USERS = requestActions(MODULE_NAME, "GET_ALL_USERS");
export const UPDATE_ACTIVE_STATUS = requestActions(
  MODULE_NAME,
  "UPDATE_ACTIVE_STATUS"
);
export const SET_NUB_ID = "SET_NUB_ID";

export const getAllUsers = ({ token }) =>
  requestApiCall({
    actions: GET_ALL_USERS,
    method: METHODS.POST,
    path: PATHS.GET_ALL_USERS,
    token,
  });
export const updateActiveStatus = ({ token, body }) =>
  requestApiCall({
    actions: UPDATE_ACTIVE_STATUS,
    method: METHODS.PUT,
    path: PATHS.UPDATE_ACTIVE_STATUS,
    token,
    body,
  });

export const setNubId = (data) => ({
  type: SET_NUB_ID,
  payload: data,
});
