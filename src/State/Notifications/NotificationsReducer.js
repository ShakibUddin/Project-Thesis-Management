import * as actions from "./NotificationsActions";
import * as AuthActions from "../Auth/AuthActions";

const initialState = {
  memberRequestNotifications: [],
  memberRequestNotificationsLoading: false,
  memberRequestNotificationsError: null,
};

export default function NotificationsReducer(state = initialState, action) {
  const payload = action?.payload;

  switch (action.type) {
    case AuthActions.LOGOUT: {
      state = initialState;
      break;
    }
    case actions.GET_ALL_MEMBER_REQUEST_NOTIFICATIONS.REQUESTED: {
      state.memberRequestNotificationsLoading = true;
      state.memberRequestNotifications = [];
      state.memberRequestNotificationsError = null;
      break;
    }
    case actions.GET_ALL_MEMBER_REQUEST_NOTIFICATIONS.SUCCEEDED: {
      state.memberRequestNotificationsLoading = false;
      state.memberRequestNotifications = payload?.data;
      state.memberRequestNotificationsError = payload?.message;
      break;
    }
    case actions.GET_ALL_MEMBER_REQUEST_NOTIFICATIONS.FAILED: {
      state.memberRequestNotificationsLoading = false;
      state.memberRequestNotifications = [];
      state.memberRequestNotificationsError = payload?.message;
      break;
    }
    default: {
      return state;
    }
  }
  return { ...state };
}
