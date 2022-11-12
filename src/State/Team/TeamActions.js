import { METHODS, PATHS } from "../../Constants/ApiConstants";
import { requestActions } from "../../requestActions";
import { requestApiCall } from "../Connectivity/ConnectivityActions";

const MODULE_NAME = "TEAM";
export const GET_ALL_STUDENTS = requestActions(MODULE_NAME, "GET_ALL_STUDENTS");
export const ACCEPT_MEMBER_REQUEST = requestActions(
  MODULE_NAME,
  "ACCEPT_MEMBER_REQUEST"
);
export const GET_SUPERVISOR_TEAM_DETAILS = requestActions(
  MODULE_NAME,
  "GET_SUPERVISOR_TEAM_DETAILS"
);
export const REJECT_MEMBER_REQUEST = requestActions(
  MODULE_NAME,
  "REJECT_MEMBER_REQUEST"
);
export const SET_ACCEPTED_REQUEST = "SET_ACCEPTED_REQUEST";
export const GET_TEAM_DETAILS = requestActions(MODULE_NAME, "GET_TEAM_DETAILS");

export const getAllStudents = ({ body, token }) =>
  requestApiCall({
    actions: GET_ALL_STUDENTS,
    method: METHODS.POST,
    path: PATHS.ALL_STUDENTS_FOR_REQUEST,
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
export const getSupervisorTeamDetails = ({ body, token }) =>
  requestApiCall({
    actions: GET_SUPERVISOR_TEAM_DETAILS,
    method: METHODS.POST,
    path: PATHS.GET_SUPERVISOR_TEAM_DETAILS,
    body,
    token,
  });

export const setAcceptedRequest = (data) => ({
  type: SET_ACCEPTED_REQUEST,
  payload: data,
});
