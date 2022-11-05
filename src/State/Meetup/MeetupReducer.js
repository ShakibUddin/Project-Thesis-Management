import * as actions from "./MeetupActions";
import * as AuthActions from "../Auth/AuthActions";

const initialState = {
  meetups: {},
  meetupsLoading: false,
  meetupsError: null,
  createMeetup: false,
  createMeetupLoading: false,
  createMeetupError: null,
  teamsUnderSupervisor: false,
  teamsUnderSupervisorLoading: false,
  teamsUnderSupervisorError: null,
};

export default function MeetupReducer(state = initialState, action) {
  const payload = action?.payload;

  switch (action.type) {
    case AuthActions.LOGOUT: {
      state = initialState;
      break;
    }
    case actions.CREATE_MEETUP.REQUESTED: {
      state.createMeetupLoading = true;
      state.createMeetup = false;
      state.createMeetupError = null;
      break;
    }
    case actions.CREATE_MEETUP.SUCCEEDED: {
      state.createMeetupLoading = false;
      state.createMeetup = payload?.data?.createMeetup;
      break;
    }
    case actions.CREATE_MEETUP.FAILED: {
      state.createMeetupLoading = false;
      state.createMeetup = false;
      state.createMeetupError = payload?.message;
      break;
    }
    case actions.GET_MEETUPS.REQUESTED: {
      state.meetupsLoading = true;
      state.meetups = {};
      state.meetupsError = null;
      break;
    }
    case actions.GET_MEETUPS.SUCCEEDED: {
      state.meetupsLoading = false;
      state.meetups = payload?.data;
      break;
    }
    case actions.GET_MEETUPS.FAILED: {
      state.meetupsLoading = false;
      state.meetups = {};
      state.meetupsError = payload?.message;
      break;
    }
    case actions.GET_SUPERVISOR_TEAMS.REQUESTED: {
      state.teamsUnderSupervisorLoading = true;
      state.teamsUnderSupervisor = [];
      state.teamsUnderSupervisorError = null;
      break;
    }
    case actions.GET_SUPERVISOR_TEAMS.SUCCEEDED: {
      state.teamsUnderSupervisorLoading = false;
      state.teamsUnderSupervisor = payload?.data;
      break;
    }
    case actions.GET_SUPERVISOR_TEAMS.FAILED: {
      state.teamsUnderSupervisorLoading = false;
      state.teamsUnderSupervisor = [];
      state.teamsUnderSupervisorError = payload?.message;
      break;
    }

    default: {
      return state;
    }
  }
  return { ...state };
}
