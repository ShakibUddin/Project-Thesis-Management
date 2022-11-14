import * as actions from "./ProposalActions";
import * as AuthActions from "../Auth/AuthActions";

const initialState = {
  proposals: [],
  proposalsLoading: false,
  proposalsError: null,
  rejectProposal: false,
  rejectProposalLoading: false,
  rejectProposalError: null,
  supervisors: [],
  supervisorsLoading: false,
  supervisorsError: null,
  approveProposal: false,
  approveProposalLoading: false,
  approveProposalError: null,
};

export default function ProposalReducer(state = initialState, action) {
  const payload = action?.payload;

  switch (action.type) {
    case AuthActions.LOGOUT: {
      state = { ...initialState };
      break;
    }
    case actions.UPDATE_PROPOSALS: {
      state.proposals = state.proposals.filter(
        (proposal) => proposal.project.projectId !== payload
      );
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
      state.proposalsError = payload?.message;
      break;
    }
    case actions.GET_PROJECT_PROPOSALS.FAILED: {
      state.proposalsLoading = false;
      state.proposals = [];
      state.proposalsError = payload?.message;
      break;
    }
    case actions.REJECT_PROJECT_PROPOSALS.REQUESTED: {
      state.rejectProposalLoading = true;
      state.rejectProposal = false;
      state.rejectProposalError = null;
      break;
    }
    case actions.REJECT_PROJECT_PROPOSALS.SUCCEEDED: {
      state.rejectProposalLoading = false;
      state.rejectProposal = payload?.data?.rejectProjectProposal;
      state.rejectProposalError = payload?.message;
      break;
    }
    case actions.REJECT_PROJECT_PROPOSALS.FAILED: {
      state.rejectProposalLoading = false;
      state.rejectProposal = false;
      state.rejectProposalError = payload?.message;
      break;
    }
    case actions.GET_ALL_SUPERVISORS.REQUESTED: {
      state.supervisorsLoading = true;
      state.supervisors = [];
      state.supervisorsError = null;
      break;
    }
    case actions.GET_ALL_SUPERVISORS.SUCCEEDED: {
      state.supervisorsLoading = false;
      state.supervisors = payload?.data;
      state.supervisorsError = payload?.message;
      break;
    }
    case actions.GET_ALL_SUPERVISORS.FAILED: {
      state.supervisorsLoading = false;
      state.supervisors = [];
      state.supervisorsError = payload?.message;
      break;
    }
    case actions.APPROVE_PROJECT_PROPOSAL.REQUESTED: {
      state.approveProposalLoading = true;
      state.approveProposal = false;
      state.approveProposalError = null;
      break;
    }
    case actions.APPROVE_PROJECT_PROPOSAL.SUCCEEDED: {
      state.approveProposalLoading = false;
      state.approveProposal = payload?.data?.projectApproval;
      state.approveProposalError = payload?.message;
      break;
    }
    case actions.APPROVE_PROJECT_PROPOSAL.FAILED: {
      state.approveProposalLoading = false;
      state.approveProposal = false;
      state.approveProposalError = payload?.message;
      break;
    }

    default: {
      return state;
    }
  }
  return { ...state };
}
