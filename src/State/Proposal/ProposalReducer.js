import * as actions from "./ProposalActions";
import * as AuthActions from "../Auth/AuthActions";

const initialState = {
  proposals: [],
  proposalsLoading: false,
  proposalsError: null,
};

export default function ProposalReducer(state = initialState, action) {
  const payload = action?.payload;

  switch (action.type) {
    case AuthActions.LOGOUT: {
      state = initialState;
      break;
    }
    case actions.GET_PROJECT_PROPOSALS.REQUESTED: {
      state.proposalsLoading = true;
      state.proposals = [];
      state.proposalsError = null;
      break;
    }
    case actions.GET_PROJECT_PROPOSALS.SUCCEEDED: {
      state.proposalsLoading = false;
      state.proposals = payload?.data;
      break;
    }
    case actions.GET_PROJECT_PROPOSALS.FAILED: {
      state.proposalsLoading = false;
      state.proposals = [];
      state.proposalsError = payload?.message;
      break;
    }

    default: {
      return state;
    }
  }
  return { ...state };
}
