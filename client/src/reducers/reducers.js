import { USER_AUTH, USER_ADD_INTEREST, USER_ADD_SKILL, LOG_OUT, LOG_IN } from "./actions";

const initialState = {
  user: null,
  loggedIn: false
};

function globals(state = initialState, action) {
  switch (action.type) {
    case USER_AUTH:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          ...action.user
        }
      });
    case USER_ADD_SKILL:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          Skills: action.skills
        }
      });
    case USER_ADD_INTEREST:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          Interests: action.interests
        }
      });
    case LOG_OUT:
      return Object.assign({}, state, {
        user: null,
        loggedIn: false
      });
    case LOG_IN:
      return Object.assign({}, state, {
        loggedIn: true
      });
    default:
      return state;
  }
}

export default globals; 