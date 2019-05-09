import { USER_AUTH, USER_ADD_INTEREST, USER_ADD_SKILL } from "./actions";

const initialState = {
  user: null,
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
    default:
      return state;
  }
}

export default globals; 