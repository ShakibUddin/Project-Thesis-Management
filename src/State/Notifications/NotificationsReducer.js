import * as actions from "./NotificationsActions";

const initialState = {
  memberRequestNotifications: [],
  memberRequestNotificationsLoading: false,
  memberRequestNotificationsError: null,
};

export default function NotificationsReducer(state = initialState, action) {
  const payload = action?.payload;

  switch (action.type) {
    case actions.GET_ALL_MEMBER_REQUEST_NOTIFICATIONS.REQUESTED: {
      state.memberRequestNotificationsLoading = true;
      state.memberRequestNotifications = [];
      break;
    }
    case actions.GET_ALL_MEMBER_REQUEST_NOTIFICATIONS.SUCCEEDED: {
      state.memberRequestNotificationsLoading = false;
      state.memberRequestNotifications = payload;
      break;
    }
    case actions.GET_ALL_MEMBER_REQUEST_NOTIFICATIONS.FAILED: {
      state.memberRequestNotificationsLoading = false;
      state.memberRequestNotifications = [];
      state.memberRequestNotificationsError = payload;
      break;
    }
    default: {
      return state;
    }
  }
  return { ...state };
}
