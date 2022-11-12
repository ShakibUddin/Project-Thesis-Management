import { METHODS, PATHS } from "../../Constants/ApiConstants";
import { requestActions } from "../../requestActions";
import { requestApiCall } from "../Connectivity/ConnectivityActions";

const MODULE_NAME = "MEETUP";
export const CREATE_MEETUP = requestActions(MODULE_NAME, "CREATE_MEETUP");
export const GET_SUPERVISOR_TEAMS = requestActions(
  MODULE_NAME,
  "GET_SUPERVISOR_TEAMS"
);
export const UPDATE_MEETUP = requestActions(MODULE_NAME, "UPDATE_MEETUP");
export const GET_MEETUPS = requestActions(MODULE_NAME, "GET_MEETUPS");
export const REMOVE_MEETUP = "REMOVE_MEETUP";
export const ADD_MEETUP = "ADD_MEETUP";
export const SET_CREATE_MEETUP = "SET_CREATE_MEETUP";
export const SET_UPDATE_MEETUP = "SET_UPDATE_MEETUP";

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
    method: METHODS.POST,
    path: PATHS.GET_SUPERVISOR_TEAMS,
    token,
    body,
  });
export const getMeetups = ({ token, body }) =>
  requestApiCall({
    actions: GET_MEETUPS,
    method: METHODS.POST,
    path: PATHS.GET_MEETUPS,
    token,
    body,
  });
export const updateMeetup = ({ token, body }) =>
  requestApiCall({
    actions: UPDATE_MEETUP,
    method: METHODS.PUT,
    path: PATHS.UPDATE_MEETUP,
    token,
    body,
  });
export const removeMeetup = (meetupId) => ({
  type: REMOVE_MEETUP,
  payload: meetupId,
});
export const addMeetup = (meetup) => ({
  type: ADD_MEETUP,
  payload: meetup,
});
export const setCreateMeetup = (data) => ({
  type: SET_CREATE_MEETUP,
  payload: data,
});
export const setUpdateMeetup = (data) => ({
  type: SET_UPDATE_MEETUP,
  payload: data,
});
