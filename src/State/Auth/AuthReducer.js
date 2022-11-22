import { persistor } from "../../store";
import * as actions from "./AuthActions";

const initialState = {
  departments: [],
  departmentsLoading: false,
  departmentsError: null,
  programs: [],
  programsLoading: false,
  programsError: null,
  userTypes: [],
  userTypesLoading: false,
  userTypesError: null,
  user: null,
  createUserLoading: false,
  createUserError: null,
  loginLoading: false,
  loginError: null,
};

export default function AuthReducer(state = initialState, action) {
  const payload = action?.payload;

  switch (action.type) {
    case actions.UPDATE_TOTAL_TEAM_MEMBERS: {
      state.user.total_members = payload;
      state.user = { ...state.user };
      break;
    }
    case actions.SET_AVATAR: {
      state.user.avatar = payload;
      state.user = { ...state.user };
      break;
    }
    case actions.GET_DEPARTMENTS.REQUESTED: {
      state.departmentsLoading = true;
      state.departments = [];
      state.departmentsError = null;
      break;
    }
    case actions.GET_DEPARTMENTS.SUCCEEDED: {
      state.departmentsLoading = false;
      state.departments = payload?.data;
      state.departmentsError = payload?.message;
      break;
    }
    case actions.GET_DEPARTMENTS.FAILED: {
      state.departmentsLoading = false;
      state.departments = [];
      state.departmentsError = payload?.message;
      break;
    }
    case actions.GET_PROGRAMS.REQUESTED: {
      state.programsLoading = true;
      state.programs = [];
      state.programsError = null;
      break;
    }
    case actions.GET_PROGRAMS.SUCCEEDED: {
      state.programsLoading = false;
      state.programs = payload?.data;
      state.programsError = payload?.message;
      break;
    }
    case actions.GET_PROGRAMS.FAILED: {
      state.programsLoading = false;
      state.programs = [];
      state.programsError = payload?.message;
      break;
    }
    case actions.GET_USER_TYPES.REQUESTED: {
      state.userTypesLoading = true;
      state.userTypes = [];
      state.userTypesError = null;
      break;
    }
    case actions.GET_USER_TYPES.SUCCEEDED: {
      state.userTypesLoading = false;
      state.userTypes = payload?.data;
      state.userTypesError = payload?.message;
      break;
    }
    case actions.GET_USER_TYPES.FAILED: {
      state.userTypesLoading = false;
      state.userTypes = [];
      state.userTypesError = payload?.message;
      break;
    }
    case actions.CREATE_USER.REQUESTED: {
      state.createUserLoading = true;
      state.user = null;
      state.createUserError = null;
      break;
    }
    case actions.CREATE_USER.SUCCEEDED: {
      state.createUserLoading = false;
      state.user = payload?.data;
      state.createUserError = payload?.message;
      break;
    }
    case actions.CREATE_USER.FAILED: {
      state.createUserLoading = false;
      state.user = null;
      state.createUserError = payload?.message;
      break;
    }
    case actions.LOGIN.REQUESTED: {
      state.loginLoading = true;
      state.user = null;
      state.loginError = null;
      break;
    }
    case actions.LOGIN.SUCCEEDED: {
      state.loginLoading = false;
      state.user = payload?.data;
      state.loginError = payload?.message;
      break;
    }
    case actions.LOGIN.FAILED: {
      state.loginLoading = false;
      state.user = null;
      state.loginError = payload?.message;
      break;
    }

    case actions.LOGOUT: {
      state = {
        departments: [],
        departmentsLoading: false,
        departmentsError: null,
        programs: [],
        programsLoading: false,
        programsError: null,
        user: null,
        createUserLoading: false,
        createUserError: null,
        loginLoading: false,
        loginError: null,
        allUsersLoading: false,
        allUsers: [],
        allUsersError: null,
      };
      break;
    }
    default: {
      return state;
    }
  }
  return { ...state };
}
