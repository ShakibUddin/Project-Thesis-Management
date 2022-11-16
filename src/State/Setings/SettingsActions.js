import { METHODS, PATHS } from "../../Constants/ApiConstants";
import { requestActions } from "../../requestActions";
import { requestApiCall } from "../Connectivity/ConnectivityActions";

const MODULE_NAME = "SETTINGS";
export const RESET_PASSWORD = requestActions(MODULE_NAME, "RESET_PASSWORD");

export const resetPassword = ({ body, token }) =>
  requestApiCall({
    actions: RESET_PASSWORD,
    method: METHODS.PUT,
    path: PATHS.RESET_PASSWORD,
    body,
    token,
  });
