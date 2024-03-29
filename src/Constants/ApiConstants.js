export const BASE_URL = "https://smtprojectbackend.arifmannan.com/";
export const REQUEST_TIMEOUT = 5000;

export const METHODS = {
  GET: "get",
  POST: "post",
  UPDATE: "update",
  DELETE: "delete",
  PUT: "put",
};
export const PATHS = {
  SIGNUP: "api/users/createUser",
  DEPARTMENTS: "api/users/getDep",
  CREATE_USER: "api/users/createUser",
  PROGRAMS: "api/users/getPrograms",
  LOGIN: "api/users/login",
  ALL_STUDENTS_FOR_REQUEST: "api/users/getAllStudents",
  ALL_USERS: "api/users/getUsers",
  SEND_REQUEST: "api/users/createMemberRequest",
  GET_MEMBER_REQUEST_NOTIFICATIONS: "api/users/getMemberRequestNotification",
  ACCEPT_REQUEST: "api/users/memberRequestAccept",
  REJECT_REQUEST: "api/users/memberRequestReject",
  TEAM_DETAILS: "api/users/getSingleTeamById",
  PROJECT_DETAILS: "api/users/singlePojectProposalCrud",
  CREATE_PROJECT_PROPOSAL: "api/users/createProjectProposal",
  GET_PROJECT_PROPOSALS: "api/users/allPendingProposal",
  REJECT_PROJECT_PROPOSALS: "api/users/rejectProjectProposal",
  UPDATE_PROJECT_PROPOSAL: "api/users/singlePojectProposalCrud",
  GET_ALL_SUPERVISORS: "api/users/getAllSupervisors",
  APPROVE_PROJECT_PROPOSAL: "api/users/approveProjectProposal",
  CREATE_MEETUP: "api/users/createMeetups",
  GET_SUPERVISOR_TEAMS: "api/users/getSupervisorTeamId",
  GET_MEETUPS: "api/users/getMeetups",
  UPDATE_MEETUP: "api/users/completeMeetup",
  REMOVE_TEAM_MATE: "api/users/deleteTeamMember",
  GET_SUPERVISOR_TEAM_DETAILS: "api/users/getSupervisorTeamDetails",
  UPLAOD_ENROLLED_STUDENTS_DATA: "import-excel",
  UPLAOD_SUPERVISORS_DATA: "importAcadExcel",
  PROFILE_PICTURE_UPLOAD: "api/images/profileImage",
  GET_ALL_STUDENTS_DETAILS: "api/users/getTotalStudents",
  GET_ALL_SUPERVISORS_DETAILS: "api/users/getTotalSupervisors",
  RESET_PASSWORD: "api/users/updatePassword",
  COMPLETE_PROJECT: "api/users/completeProject",
  UPLOAD_PAPER: "api/files/projectFile",
  GET_ALL_PROJECTS_DETAILS: "api/users/getAllProjectDetails",
};
