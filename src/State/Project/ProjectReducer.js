import * as actions from "./ProjectActions";
import * as AuthActions from "../Auth/AuthActions";

const initialState = {
  project: {},
  projectLoading: false,
  projectError: null,
  createProjectProposal: false,
  createProjectProposalLoading: false,
  createProjectProposalError: null,
  updateProjectProposal: false,
  updateProjectProposalLoading: false,
  updateProjectProposalError: null,
  allProjectsDetails: [],
  allProjectsDetailsLoading: false,
  allProjectsDetailsError: null,
};

export default function ProjectReducer(state = initialState, action) {
  const payload = action?.payload;

  switch (action.type) {
    case AuthActions.LOGOUT: {
      state = { ...initialState };
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
      state.projectError = payload?.message;
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
      state.createProjectProposalLoading = false;
      state.createProjectProposal = payload?.data?.createProjectProposal;
      state.createProjectProposalError = payload?.message;
      break;
    }
    case actions.CREATE_PROJECT_PROPOSAL.FAILED: {
      state.createProjectProposalLoading = false;
      state.createProjectProposal = false;
      state.createProjectProposalError = payload?.message;
      break;
    }
    case actions.UPDATE_PROJECT_PROPOSAL.REQUESTED: {
      state.updateProjectProposalLoading = true;
      state.updateProjectProposal = false;
      state.updateProjectProposalError = null;
      break;
    }
    case actions.UPDATE_PROJECT_PROPOSAL.SUCCEEDED: {
      state.updateProjectProposalLoading = true;
      state.updateProjectProposal = payload?.data?.updateProjectProposal;
      state.updateProjectProposalError = payload?.message;
      break;
    }
    case actions.UPDATE_PROJECT_PROPOSAL.FAILED: {
      state.updateProjectProposalLoading = false;
      state.updateProjectProposal = false;
      state.updateProjectProposalError = payload?.message;
      break;
    }
    case actions.GET_ALL_PROJECTS_DETAILS.REQUESTED: {
      state.allProjectsDetailsLoading = true;
      state.allProjectsDetails = [];
      state.allProjectsDetailsError = null;
      break;
    }
    case actions.GET_ALL_PROJECTS_DETAILS.SUCCEEDED: {
      state.allProjectsDetailsLoading = false;
      state.allProjectsDetails = payload?.data;
      state.allProjectsDetailsError = payload?.message;
      break;
    }
    case actions.GET_ALL_PROJECTS_DETAILS.FAILED: {
      state.allProjectsDetailsLoading = false;
      state.allProjectsDetails = [];
      state.allProjectsDetailsError = payload?.message;
      break;
    }
    default: {
      return state;
    }
  }
  return { ...state };
}
