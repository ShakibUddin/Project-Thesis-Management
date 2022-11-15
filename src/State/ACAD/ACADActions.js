import { METHODS, PATHS } from "../../Constants/ApiConstants";
import { requestActions } from "../../requestActions";
import { requestApiCall } from "../Connectivity/ConnectivityActions";

const MODULE_NAME = "ACAD";
export const GET_ALL_STUDENTS_DETAILS = requestActions(
  MODULE_NAME,
  "GET_ALL_STUDENTS_DETAILS"
);
export const GET_ALL_SUPERVISORS_DETAILS = requestActions(
  MODULE_NAME,
  "GET_ALL_SUPERVISORS_DETAILS"
);

export const getAllStudentsDetails = ({ token }) =>
  requestApiCall({
    actions: GET_ALL_STUDENTS_DETAILS,
    method: METHODS.POST,
    path: PATHS.GET_ALL_STUDENTS_DETAILS,
    token,
  });
export const getAllSupervisorsDetails = ({ token }) =>
  requestApiCall({
    actions: GET_ALL_SUPERVISORS_DETAILS,
    method: METHODS.POST,
    path: PATHS.GET_ALL_SUPERVISORS_DETAILS,
    token,
  });
