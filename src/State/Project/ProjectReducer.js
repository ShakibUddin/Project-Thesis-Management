import * as actions from "./ProjectActions";
import * as AuthActions from "../Auth/AuthActions";

const initialState = {
  project: {},
  projectLoading: false,
  projectError: null,
  createProjectProposal: false,
  createProjectProposalLoading: false,
  createProjectProposalError: null,
};

export default function ProjectReducer(state = initialState, action) {
  const payload = action?.payload;

  switch (action.type) {
    case AuthActions.LOGOUT: {
      state = initialState;
      break;
    }
    case actions.SET_CREATE_PROJECT_PROPOSAL: {
      state.createProjectProposal = false;
      break;
    }
    case actions.GET_PROJECT_DETAILS.REQUESTED: {
      state.projectLoading = true;
      state.project = {};
      state.projectError = null;
      break;
    }
    case actions.GET_PROJECT_DETAILS.SUCCEEDED: {
      state.projectLoading = false;
      state.project = payload?.data;
      break;
    }
    case actions.GET_PROJECT_DETAILS.FAILED: {
      state.projectLoading = false;
      state.project = {};
      state.projectError = payload?.message;
      break;
    }
    case actions.CREATE_PROJECT_PROPOSAL.REQUESTED: {
      state.createProjectProposalLoading = true;
      state.createProjectProposal = false;
      state.createProjectProposalError = null;
      break;
    }
    case actions.CREATE_PROJECT_PROPOSAL.SUCCEEDED: {
      console.log("payload", payload);
      state.createProjectProposalLoading = true;
      state.createProjectProposal = payload?.data?.createProjectProposal;
      break;
    }
    case actions.CREATE_PROJECT_PROPOSAL.FAILED: {
      state.createProjectProposalLoading = false;
      state.createProjectProposal = false;
      state.createProjectProposalError = payload?.message;
      break;
    }

    default: {
      return state;
    }
  }
  return { ...state };
}