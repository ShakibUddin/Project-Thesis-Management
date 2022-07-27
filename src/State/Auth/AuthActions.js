import { METHODS, PATHS } from "../../Constants/ApiConstants";
import { requestActions } from "../../requestActions";
import { requestApiCall } from "../Connectivity/ConnectivityActions";

const MODULE_NAME = 'AUTHENTICATION'
export const GET_DEPARTMENTS = requestActions(MODULE_NAME, 'GET_DEPARTMENTS');
export const SET_DEPARTMENTS = requestActions(MODULE_NAME, 'SET_DEPARTMENTS');

export const getDepartments = () => requestApiCall({
    actions: GET_DEPARTMENTS,
    method: METHODS.GET,
    path: PATHS.DEPARTMENTS
})