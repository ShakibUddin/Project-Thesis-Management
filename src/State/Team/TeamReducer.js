import { persistor } from '../../store';
import * as actions from './TeamActions';

const initialState = {
    students: [],
    studentsLoading: false,
    studentsError: null,
}

export default function AuthReducer(state = initialState, action) {
    const payload = action?.payload;

    switch (action.type) {
        case actions.GET_ALL_STUDENTS.REQUESTED: {
            state.studentsLoading = true;
            state.students = [];
            break;
        }
        case actions.GET_ALL_STUDENTS.SUCCEEDED: {
            state.studentsLoading = false;
            state.students = payload;
            break;
        }
        case actions.GET_ALL_STUDENTS.FAILED: {
            state.studentsLoading = false;
            state.students = [];
            state.studentsError = payload;
            break;
        }
        default: {
            return state;
        }
    }
    return { ...state };
}