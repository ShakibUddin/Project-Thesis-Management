import * as actions from "./MeetupActions";
import * as AuthActions from "../Auth/AuthActions";

const initialState = {
  meetups: {},
  meetupsLoading: false,
  meetupsError: null,
  createMeetup: false,
  createMeetupLoading: false,
  createMeetupError: null,
  teamsUnderSupervisor: [],
  teamsUnderSupervisorLoading: false,
  teamsUnderSupervisorError: null,
  updateMeetup: false,
  updateMeetupLoading: false,
  updateMeetupError: null,
};

export default function MeetupReducer(state = initialState, action) {
  const payload = action?.payload;

  switch (action.type) {
    case AuthActions.LOGOUT: {
      state = initialState;
      break;
    }
    case actions.REMOVE_MEETUP: {
      state.meetups.pending.filter((meetup) => meetup.meetupId !== payload);
      state.meetups = { ...state.meetups };
      break;
    }
    case actions.ADD_MEETUP: {
      state.meetups.pending.push(payload);
      state.meetups = { ...state.meetups };
      break;
    }
    case actions.SET_CREATE_MEETUP: {
      state.createMeetup = payload;
      break;
    }
    case actions.SET_UPDATE_MEETUP: {
      state.updateMeetup = payload;
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
      state.createMeetupError = payload?.message;
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
    case actions.UPDATE_MEETUP.REQUESTED: {
      state.updateMeetupLoading = true;
      state.updateMeetup = false;
      state.updateMeetupError = null;
      break;
    }
    case actions.UPDATE_MEETUP.SUCCEEDED: {
      state.updateMeetupLoading = false;
      state.updateMeetup = payload?.data?.completeMeetup;
      state.updateMeetupError = payload?.message;
      break;
    }
    case actions.UPDATE_MEETUP.FAILED: {
      state.updateMeetupLoading = false;
      state.updateMeetup = false;
      state.updateMeetupError = payload?.message;
      break;
    }

    default: {
      return state;
    }
  }
  return { ...state };
}
