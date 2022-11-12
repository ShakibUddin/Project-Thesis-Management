import { METHODS, PATHS } from "../../Constants/ApiConstants";
import { requestActions } from "../../requestActions";
import { requestApiCall } from "../Connectivity/ConnectivityActions";

const MODULE_NAME = "NOTIFICATIONS";
export const GET_ALL_MEMBER_REQUEST_NOTIFICATIONS = requestActions(
  MODULE_NAME,
  "GET_ALL_MEMBER_REQUEST_NOTIFICATIONS"
);

export const getAllMemberRequestNotifications = ({ body, token }) =>
  requestApiCall({
    actions: GET_ALL_MEMBER_REQUEST_NOTIFICATIONS,
    method: METHODS.POST,
    path: PATHS.GET_MEMBER_REQUEST_NOTIFICATIONS,
    token,
    body,
  });
