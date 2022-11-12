import { METHODS, PATHS } from "../../Constants/ApiConstants";
import { requestActions } from "../../requestActions";
import { requestApiCall } from "../Connectivity/ConnectivityActions";

const MODULE_NAME = "PROJECT";
export const GET_PROJECT_PROPOSALS = requestActions(
  MODULE_NAME,
  "GET_PROJECT_PROPOSALS"
);
export const GET_ALL_SUPERVISORS = requestActions(
  MODULE_NAME,
  "GET_ALL_SUPERVISORS"
);
export const REJECT_PROJECT_PROPOSALS = requestActions(
  MODULE_NAME,
  "REJECT_PROJECT_PROPOSALS"
);
export const APPROVE_PROJECT_PROPOSAL = requestActions(
  MODULE_NAME,
  "APPROVE_PROJECT_PROPOSAL"
);
export const UPDATE_PROPOSALS = "UPDATE_PROPOSALS";

export const getProposals = ({ token, body }) =>
  requestApiCall({
    actions: GET_PROJECT_PROPOSALS,
    method: METHODS.GET,
    path: PATHS.GET_PROJECT_PROPOSALS,
    token,
    body,
  });
export const getAllSupervisors = ({ token, body }) =>
  requestApiCall({
    actions: GET_ALL_SUPERVISORS,
    method: METHODS.GET,
    path: PATHS.GET_ALL_SUPERVISORS,
    token,
    body,
  });
export const rejectProposal = ({ token, body }) =>
  requestApiCall({
    actions: REJECT_PROJECT_PROPOSALS,
    method: METHODS.PUT,
    path: PATHS.REJECT_PROJECT_PROPOSALS,
    token,
    body,
  });
export const approveProposal = ({ token, body }) =>
  requestApiCall({
    actions: APPROVE_PROJECT_PROPOSAL,
    method: METHODS.PUT,
    path: PATHS.APPROVE_PROJECT_PROPOSAL,
    token,
    body,
  });
export const updateProposal = (projectId) => ({
  type: UPDATE_PROPOSALS,
  payload: projectId,
});
