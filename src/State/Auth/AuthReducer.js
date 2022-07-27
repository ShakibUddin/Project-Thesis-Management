import * as actions from './AuthActions';

const initialState = {
    departments: [],
    departmentsLoading: false,
    departmentsError: null,
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
        default: {
            return state;
        }
    }
    return state;
}