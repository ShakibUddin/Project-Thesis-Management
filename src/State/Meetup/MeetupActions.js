import { METHODS, PATHS } from "../../Constants/ApiConstants";
import { requestActions } from "../../requestActions";
import { requestApiCall } from "../Connectivity/ConnectivityActions";

const MODULE_NAME = "MEETUP";
export const CREATE_MEETUP = requestActions(MODULE_NAME, "CREATE_MEETUP");
export const GET_SUPERVISOR_TEAMS = requestActions(
  MODULE_NAME,
  "GET_SUPERVISOR_TEAMS"
);
export const GET_MEETUPS = requestActions(MODULE_NAME, "GET_MEETUPS");

export const createMeetup = ({ token, body }) =>
  requestApiCall({
    actions: CREATE_MEETUP,
    method: METHODS.POST,
    path: PATHS.CREATE_MEETUP,
    token,
    body,
  });
export const getTeamsUnderSupervisor = (
  { token, body } //TODO:check method here
) =>
  requestApiCall({
    actions: GET_SUPERVISOR_TEAMS,
    method: METHODS.GET,
    path: PATHS.GET_SUPERVISOR_TEAMS,
    token,
    body,
  });
export const getMeetups = (
  { token, body } //TODO:check method here
) =>
  requestApiCall({
    actions: GET_MEETUPS,
    method: METHODS.GET,
    path: PATHS.GET_MEETUPS,
    token,
    body,
  });
