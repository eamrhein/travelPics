import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER,
  CLEAR_ERRORS 
} from '../actions/session_actions';
import {
  RECEIVE_FOLLOW_ERRORS
} from '../actions/user_actions';

const _nullErrors = [];

const SessionErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
    case RECEIVE_FOLLOW_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
    case CLEAR_ERRORS:
      return _nullErrors;
    default:
      return state;
  }
};

export default SessionErrorsReducer;
