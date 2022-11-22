import { persistor } from "../../store";
import * as actions from "./UserActions";
import * as AuthActions from "../Auth/AuthActions";

const initialState = {
  allUsersLoading: false,
  allUsers: [],
  allUsersError: null,
  updateActiveStatusLoading: false,
  updateActiveStatus: false,
  updateActiveStatusError: null,
  nubId: null,
};

export default function UserReducer(state = initialState, action) {
  const payload = action?.payload;

  switch (action.type) {
    case AuthActions.LOGOUT: {
      state = { ...initialState };
      break;
    }
    case actions.SET_NUB_ID: {
      state.nubId = payload;
      break;
    }
    case actions.GET_ALL_USERS.REQUESTED: {
      state.allUsersLoading = true;
      state.allUsers = [];
      state.allUsersError = null;
      break;
    }
    case actions.GET_ALL_USERS.SUCCEEDED: {
      state.allUsersLoading = false;
      state.allUsers = payload?.data;
      state.allUsersError = payload?.message;
      break;
    }
    case actions.GET_ALL_USERS.FAILED: {
      state.allUsersLoading = false;
      state.allUsers = [];
      state.allUsersError = payload?.message;
      break;
    }
    case actions.UPDATE_ACTIVE_STATUS.REQUESTED: {
      state.updateActiveStatusLoading = true;
      state.updateActiveStatus = false;
      state.updateActiveStatusError = null;
      break;
    }
    case actions.UPDATE_ACTIVE_STATUS.SUCCEEDED: {
      state.updateActiveStatusLoading = false;
      state.updateActiveStatus = payload?.data?.updateActive;
      state.updateActiveStatusError = payload?.message;
      const updatedUsers = state.allUsers.map((user) => {
        if (user.nub_id === state.nubId) {
          user.active = user.active === 1 ? 0 : 1;
        }
        return user;
      });
      console.log("updated users", updatedUsers);
      state.allUsers = [...updatedUsers];
      break;
    }
    case actions.UPDATE_ACTIVE_STATUS.FAILED: {
      state.updateActiveStatusLoading = false;
      state.updateActiveStatus = false;
      state.updateActiveStatusError = payload?.message;
      break;
    }
    default: {
      return state;
    }
  }
  return { ...state };
}
