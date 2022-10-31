import { METHODS, PATHS } from "../../Constants/ApiConstants";
import { requestActions } from "../../requestActions";
import { requestApiCall } from "../Connectivity/ConnectivityActions";

const MODULE_NAME = "TEAM";
export const GET_ALL_STUDENTS = requestActions(MODULE_NAME, "GET_ALL_STUDENTS");
export const SEND_MEMBER_REQUEST = requestActions(
  MODULE_NAME,
  "SEND_MEMBER_REQUEST"
);
export const ACCEPT_MEMBER_REQUEST = requestActions(
  MODULE_NAME,
  "ACCEPT_MEMBER_REQUEST"
);
export const REJECT_MEMBER_REQUEST = requestActions(
  MODULE_NAME,
  "REJECT_MEMBER_REQUEST"
);
export const GET_TEAM_DETAILS = requestActions(MODULE_NAME, "GET_TEAM_DETAILS");

export const getAllStudents = ({ body, token }) =>
  requestApiCall({
    actions: GET_ALL_STUDENTS,
    method: METHODS.POST,
    path: PATHS.ALL_STUDENTS_FOR_REQUEST,
    body,
    token,
  });
export const sendMemberRequest = ({ body, token }) =>
  requestApiCall({
    actions: SEND_MEMBER_REQUEST,
    method: METHODS.POST,
    path: PATHS.SEND_REQUEST,
    body,
    token,
  });
export const acceptMemberRequest = ({ body, token }) =>
  requestApiCall({
    actions: ACCEPT_MEMBER_REQUEST,
    method: METHODS.PUT,
    path: PATHS.ACCEPT_REQUEST,
    body,
    token,
  });
export const rejectMemberRequest = ({ body, token }) =>
  requestApiCall({
    actions: REJECT_MEMBER_REQUEST,
    method: METHODS.DELETE,
    path: PATHS.REJECT_REQUEST,
    body,
    token,
  });
export const getTeamDetails = ({ body, token }) =>
  requestApiCall({
    actions: GET_TEAM_DETAILS,
    method: METHODS.POST,
    path: PATHS.TEAM_DETAILS,
    body,
    token,
  });