import { persistor } from "../../store";
import * as actions from "./SettingsActions";
import * as AuthActions from "../Auth/AuthActions";

const initialState = {
  resetPassword: null,
  resetPasswordLoading: false,
  resetPasswordError: null,
};

export default function SettingsReducer(state = initialState, action) {
  const payload = action?.payload;

  switch (action.type) {
    case actions.RESET_PASSWORD.REQUESTED: {
      state.resetPasswordLoading = true;
      state.resetPassword = null;
      state.resetPasswordError = null;
      break;
    }
    case actions.RESET_PASSWORD.SUCCEEDED: {
      state.resetPasswordLoading = false;
      state.resetPassword = payload?.data?.updatePassword;
      state.resetPasswordError = payload?.message;
      break;
    }
    case actions.RESET_PASSWORD.FAILED: {
      state.resetPasswordLoading = false;
      state.resetPassword = false;
      state.resetPasswordError = payload?.message;
      break;
    }
    case AuthActions.LOGOUT: {
      state = { ...initialState };
      break;
    }
    default: {
      return state;
    }
  }
  return { ...state };
}
