import { persistor } from "../../store";
import * as actions from "./ACADActions";
import * as AuthActions from "../Auth/AuthActions";

const initialState = {
  students: [],
  studentsLoading: false,
  studentsError: null,
  supervisors: [],
  supervisorsLoading: false,
  supervisorsError: null,
};

export default function AuthReducer(state = initialState, action) {
  const payload = action?.payload;

  switch (action.type) {
    case AuthActions.LOGOUT: {
      state = { ...initialState };
      break;
    }
    case actions.GET_ALL_STUDENTS_DETAILS.REQUESTED: {
      state.studentsLoading = true;
      state.students = [];
      state.studentsError = null;
      break;
    }
    case actions.GET_ALL_STUDENTS_DETAILS.SUCCEEDED: {
      state.studentsLoading = false;
      state.students = payload?.data;
      state.studentsError = payload?.message;
      break;
    }
    case actions.GET_ALL_STUDENTS_DETAILS.FAILED: {
      state.studentsLoading = false;
      state.students = [];
      state.studentsError = payload?.message;
      break;
    }
    case actions.GET_ALL_SUPERVISORS_DETAILS.REQUESTED: {
      state.supervisorsLoading = true;
      state.supervisors = [];
      state.supervisorsError = null;
      break;
    }
    case actions.GET_ALL_SUPERVISORS_DETAILS.SUCCEEDED: {
      state.supervisorsLoading = false;
      state.supervisors = payload?.data;
      state.supervisorsError = payload?.message;
      break;
    }
    case actions.GET_ALL_SUPERVISORS_DETAILS.FAILED: {
      state.supervisorsLoading = false;
      state.supervisors = [];
      state.supervisorsError = payload?.message;
      break;
    }

    default: {
      return state;
    }
  }
  return { ...state };
}
