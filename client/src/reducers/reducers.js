import { ADD_USER } from "./actions";

const initialState = {
  userID: "",
};

function globals(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return Object.assign({}, state, {
        userID: action.userID
      });
    default:
      return state;
  }
}

export default globals;