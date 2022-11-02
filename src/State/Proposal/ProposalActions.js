import { METHODS, PATHS } from "../../Constants/ApiConstants";
import { requestActions } from "../../requestActions";
import { requestApiCall } from "../Connectivity/ConnectivityActions";

const MODULE_NAME = "PROJECT";
export const GET_PROJECT_PROPOSALS = requestActions(
  MODULE_NAME,
  "GET_PROJECT_PROPOSALS"
);

export const getProposals = ({ token, body }) =>
  requestApiCall({
    actions: GET_PROJECT_PROPOSALS,
    method: METHODS.GET,
    path: PATHS.GET_PROJECT_PROPOSALS,
    token,
    body,
  });
