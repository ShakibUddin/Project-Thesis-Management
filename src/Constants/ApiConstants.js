export const BASE_URL = "https://smtprojectbackend.arifmannan.com/api/";
export const REQUEST_TIMEOUT = 5000;

export const METHODS = {
  GET: "get",
  POST: "post",
  UPDATE: "update",
  DELETE: "delete",
  PUT: "put",
};
export const PATHS = {
  SIGNUP: "users/createUser",
  DEPARTMENTS: "users/getDep",
  CREATE_USER: "users/createUser",
  PROGRAMS: "users/getPrograms",
  LOGIN: "users/login",
  ALL_STUDENTS_FOR_REQUEST: "users/getAllStudents",
  ALL_USERS: "users/getUsers",
  SEND_REQUEST: "users/createMemberRequest",
  GET_MEMBER_REQUEST_NOTIFICATIONS: "users/getMemberRequestNotification",
  ACCEPT_REQUEST: "users/memberRequestAccept",
  REJECT_REQUEST: "users/memberRequestReject",
  TEAM_DETAILS: "users/getSingleTeamById",
  PROJECT_DETAILS: "users/singlePojectProposalCrud",
  CREATE_PROJECT_PROPOSAL: "users/createProjectProposal",
  GET_PROJECT_PROPOSALS: "users/allPendingProposal",
};
