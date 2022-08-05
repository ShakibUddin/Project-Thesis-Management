import { persistor } from '../../store';
import * as actions from './AuthActions';

const initialState = {
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
}

export default function AuthReducer(state = initialState, action) {
    const payload = action?.payload;

    switch (action.type) {
        case actions.GET_DEPARTMENTS.REQUESTED: {
            state.departmentsLoading = true;
            state.departments = [];
            break;
        }
        case actions.GET_DEPARTMENTS.SUCCEEDED: {
            state.departmentsLoading = false;
            state.departments = payload;
            break;
        }
        case actions.GET_DEPARTMENTS.FAILED: {
            state.departmentsLoading = false;
            state.departments = [];
            state.departmentsError = payload;
            break;
        }
        case actions.GET_PROGRAMS.REQUESTED: {
            state.programsLoading = true;
            state.programs = [];
            break;
        }
        case actions.GET_PROGRAMS.SUCCEEDED: {
            state.programsLoading = false;
            state.programs = payload;
            break;
        }
        case actions.GET_PROGRAMS.FAILED: {
            state.programsLoading = false;
            state.programs = [];
            state.programsError = payload;
            break;
        }
        case actions.CREATE_USER.REQUESTED: {
            state.createUserLoading = true;
            state.user = null;
            break;
        }
        case actions.CREATE_USER.SUCCEEDED: {
            state.createUserLoading = false;
            state.user = payload;
            break;
        }
        case actions.CREATE_USER.FAILED: {
            state.createUserLoading = false;
            state.user = null;
            state.createUserError = payload;
            break;
        }
        case actions.LOGIN.REQUESTED: {
            state.loginLoading = true;
            state.user = null;
            break;
        }
        case actions.LOGIN.SUCCEEDED: {
            state.loginLoading = false;
            state.user = payload;
            break;
        }
        case actions.LOGIN.FAILED: {
            state.loginLoading = false;
            state.user = null;
            state.loginError = payload;
            break;
        }
        case actions.LOGOUT: {
            state = initialState;
            break;
        }
        default: {
            return state;
        }
    }
    return { ...state };
}