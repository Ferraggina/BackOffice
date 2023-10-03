import {
  GET_USERS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  URL_USER_PASS,
  NEW_PASSWORD_SUBMITTED,
  NEW_PASSWORD_SUCCESS,
  VIAJE_CREAR_ERROR,
  VIAJE_CREAR_EXITO,
  OBTENER_CONTRATOS_ERROR,
  OBTENER_CONTRATOS_EXITO,
  OBTENER_HOTELES_EXITO,
  OBTENER_HOTELES_ERROR,
  OBTENER_ITINERARIOS_EXITO,
  OBTENER_ITINERARIOS_ERROR,
  POSTEAR_ITINERARIOS_EXITO,
  POSTEAR_ITINERARIOS_ERROR,
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
  newPasswordSubmitted: false,
  newPasswordSuccess: false,
  nuevoViaje: null,
  contratos: [],
  hoteles: [],
  itinerarios: [],
  nuevoItenerario: null,
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
    case NEW_PASSWORD_SUBMITTED:
      return {
        ...state,
        newPasswordSubmitted: true,
      };
    case NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        newPasswordSuccess: true,
      };
    case VIAJE_CREAR_EXITO:
      return {
        ...state,
        nuevoViaje: action.payload,
        error: null,
      };
    case VIAJE_CREAR_ERROR:
      return {
        ...state,
        nuevoViaje: null,
        error: action.payload,
      };
    case OBTENER_CONTRATOS_EXITO:
      return {
        ...state,
        contratos: action.payload,
        error: null,
      };
    case OBTENER_CONTRATOS_ERROR:
      return {
        ...state,
        contratos: [],
        error: action.payload,
      };
    case OBTENER_HOTELES_EXITO:
      return {
        ...state,
        hoteles: action.payload,
        error: null,
      };
    case OBTENER_HOTELES_ERROR:
      return {
        ...state,
        hoteles: [],
        error: action.payload,
      };
    case OBTENER_ITINERARIOS_EXITO:
      return {
        ...state,
        itinerarios: action.payload,
        error: null,
      };
    case OBTENER_ITINERARIOS_ERROR:
      return {
        ...state,
        itinerarios: [],
        error: action.payload,
      };
    case POSTEAR_ITINERARIOS_EXITO:
      return {
        ...state,
        nuevoItenerario: action.payload,
        error: null,
      };
    case POSTEAR_ITINERARIOS_ERROR:
      return {
        ...state,
        nuevoItenerario: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
