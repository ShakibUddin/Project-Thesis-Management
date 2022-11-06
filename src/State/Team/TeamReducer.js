import { persistor } from "../../store";
import * as actions from "./TeamActions";
import * as AuthActions from "../Auth/AuthActions";

const initialState = {
  students: [],
  studentsLoading: false,
  studentsError: null,
  memberRequestSent: null,
  memberRequestLoading: false,
  memberRequestError: null,
  acceptmemberRequestLoading: false,
  memberRequestAccepted: false,
  memberRequestAcceptError: null,
  rejectmemberRequestLoading: false,
  memberRequestRejected: false,
  memberRequestRejectError: null,
  teamDetailsLoading: false,
  teamDetails: [],
  teamDetailsError: null,
  acceptedRequest: 0,
};

export default function AuthReducer(state = initialState, action) {
  const payload = action?.payload;

  switch (action.type) {
    case AuthActions.LOGOUT: {
      state = initialState;
      break;
    }
    case actions.GET_ALL_STUDENTS.REQUESTED: {
      state.studentsLoading = true;
      state.students = [];
      state.studentsError = null;
      break;
    }
    case actions.GET_ALL_STUDENTS.SUCCEEDED: {
      state.studentsLoading = false;
      state.students = payload?.data;
      break;
    }
    case actions.GET_ALL_STUDENTS.FAILED: {
      state.studentsLoading = false;
      state.students = [];
      state.studentsError = payload?.message;
      break;
    }
    case actions.ACCEPT_MEMBER_REQUEST.REQUESTED: {
      state.acceptmemberRequestLoading = true;
      state.memberRequestAccepted = false;
      state.memberRequestAcceptError = null;
      break;
    }
    case actions.ACCEPT_MEMBER_REQUEST.SUCCEEDED: {
      state.acceptmemberRequestLoading = false;
      state.memberRequestAccepted = payload?.data?.memberRequestAccepted;
      state.memberRequestAcceptError = payload?.message;
      break;
    }
    case actions.ACCEPT_MEMBER_REQUEST.FAILED: {
      state.acceptmemberRequestLoading = false;
      state.memberRequestAccepted = false;
      state.memberRequestAcceptError = payload?.message;
      break;
    }
    case actions.REJECT_MEMBER_REQUEST.REQUESTED: {
      state.rejectmemberRequestLoading = true;
      state.memberRequestRejected = false;
      state.memberRequestRejectError = null;
      break;
    }
    case actions.REJECT_MEMBER_REQUEST.SUCCEEDED: {
      state.rejectmemberRequestLoading = false;
      state.memberRequestRejected = payload?.data?.memberRequestRejected;
      state.memberRequestRejectError = payload?.message;
      break;
    }
    case actions.REJECT_MEMBER_REQUEST.FAILED: {
      state.rejectmemberRequestLoading = false;
      state.memberRequestRejected = false;
      state.memberRequestRejectError = payload?.message;
      break;
    }
    case actions.GET_TEAM_DETAILS.REQUESTED: {
      state.teamDetailsLoading = true;
      state.teamDetails = false;
      state.teamDetailsError = null;
      break;
    }
    case actions.GET_TEAM_DETAILS.SUCCEEDED: {
      state.teamDetailsLoading = false;
      state.teamDetails = payload?.data;
      break;
    }
    case actions.GET_TEAM_DETAILS.FAILED: {
      state.teamDetailsLoading = false;
      state.teamDetails = false;
      state.teamDetailsError = payload?.message;
      break;
    }
    case actions.SET_ACCEPTED_REQUEST: {
      state.acceptedRequest = action.payload;
      break;
    }
    default: {
      return state;
    }
  }
  return { ...state };
}
