import { GET_USERS, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/actions";

const initialState = {
  users: [],
  isLoggedIn: true,
  user: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}

export default rootReducer;
