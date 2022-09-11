import { METHODS, PATHS } from "../../Constants/ApiConstants";
import { requestActions } from "../../requestActions";
import { requestApiCall } from "../Connectivity/ConnectivityActions";

const MODULE_NAME = "TEAM";
export const GET_ALL_STUDENTS = requestActions(MODULE_NAME, "GET_ALL_STUDENTS");
export const SEND_MEMBER_REQUEST = requestActions(
  MODULE_NAME,
  "SEND_MEMBER_REQUEST"
);

export const getAllStudents = ({ body, token }) =>
  requestApiCall({
    actions: GET_ALL_STUDENTS,
    method: METHODS.POST,
    path: PATHS.ALL_STUDENTS_FOR_REQUEST,
    body,
    token,
  });
export const sendRequest = ({ body, token }) =>
  requestApiCall({
    actions: SEND_MEMBER_REQUEST,
    method: METHODS.POST,
    path: PATHS.SEND_REQUEST,
    body,
    token,
  });
