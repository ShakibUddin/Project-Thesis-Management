import { METHODS, PATHS } from "../../Constants/ApiConstants";
import { requestActions } from "../../requestActions";
import { requestApiCall } from "../Connectivity/ConnectivityActions";

const MODULE_NAME = "AUTHENTICATION";
export const GET_DEPARTMENTS = requestActions(MODULE_NAME, "GET_DEPARTMENTS");
export const GET_PROGRAMS = requestActions(MODULE_NAME, "GET_PROGRAMS");
export const CREATE_USER = requestActions(MODULE_NAME, "CREATE_USER");
export const LOGIN = requestActions(MODULE_NAME, "LOGIN");
export const LOGOUT = "LOGOUT";
export const UPDATE_TOTAL_TEAM_MEMBERS = "UPDATE_TOTAL_TEAM_MEMBERS";

export const getDepartments = () =>
  requestApiCall({
    actions: GET_DEPARTMENTS,
    method: METHODS.GET,
    path: PATHS.DEPARTMENTS,
  });
export const getPrograms = () =>
  requestApiCall({
    actions: GET_PROGRAMS,
    method: METHODS.GET,
    path: PATHS.PROGRAMS,
  });
export const createUser = (body) =>
  requestApiCall({
    actions: CREATE_USER,
    method: METHODS.POST,
    path: PATHS.CREATE_USER,
    body: JSON.stringify(body),
  });
export const login = (body) =>
  requestApiCall({
    actions: LOGIN,
    method: METHODS.POST,
    path: PATHS.LOGIN,
    body: JSON.stringify(body),
  });
export const logout = () => ({
  type: LOGOUT,
});
export const updateTotalTeamMembers = (data) => ({
  type: UPDATE_TOTAL_TEAM_MEMBERS,
  payload: data,
});
