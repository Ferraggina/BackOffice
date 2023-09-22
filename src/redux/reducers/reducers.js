import {
  GET_USERS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  URL_USER_PASS,
} from "../actions/actions";

const initialState = {
  users: [],
  isLoggedIn: true,
  user: [],
  currentUser: "",
  isLoading: false,
  success: false,
  error: null,
  urlToken: "",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case LOGIN_SUCCESS:
      console.log(state.currentUser);
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        currentUser: action.payload.data || {},
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
      };

    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload,
      };
    case URL_USER_PASS:
      console.log("Valor actual de urlToken:", action.payload);
      return {
        ...state,
        urlToken: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
