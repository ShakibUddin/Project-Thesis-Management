import { METHODS, PATHS } from "../../Constants/ApiConstants";
import { requestActions } from "../../requestActions";
import { requestApiCall } from "../Connectivity/ConnectivityActions";

const MODULE_NAME = "PROJECT";
export const GET_PROJECT_DETAILS = requestActions(
  MODULE_NAME,
  "GET_PROJECT_DETAILS"
);
export const CREATE_PROJECT_PROPOSAL = requestActions(
  MODULE_NAME,
  "CREATE_PROJECT_PROPOSAL"
);
export const SET_CREATE_PROJECT_PROPOSAL = "CREATE_PROJECT_PROPOSAL";

export const createProjectProposal = ({ token, body }) =>
  requestApiCall({
    actions: CREATE_PROJECT_PROPOSAL,
    method: METHODS.POST,
    path: PATHS.CREATE_PROJECT_PROPOSAL,
    token,
    body,
  });
export const getProjectDetails = ({ token, body }) =>
  requestApiCall({
    actions: GET_PROJECT_DETAILS,
    method: METHODS.POST,
    path: PATHS.PROJECT_DETAILS,
    token,
    body,
  });
export const setCreateProjectProposal = (data) => ({
  type: SET_CREATE_PROJECT_PROPOSAL,
  payload: data,
});
