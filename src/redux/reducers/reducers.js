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
  OBTENER_VIAJES_EXITO,
  OBTENER_VIAJES_ERROR,
  POSTEAR_HOTELES_ERROR,
  POSTEAR_HOTELES_EXITO,
  ELIMINAR_VIAJE_EXITO,
  ELIMINAR_VIAJE_ERROR,
  EDITAR_VIAJE_EXITO,
  EDITAR_VIAJE_ERROR,
  DELETE_HOTEL_SUCCESS,
  DELETE_HOTEL_FAILURE,
  EDIT_HOTEL_SUCCESS,
  EDIT_HOTEL_FAILURE,
  GET_LANDING,
  ADD_LANDING,
  UPDATE_LANDING,
  DELETE_LANDING,
  LOGOUT_USER,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  GET_LANDING_TEXT,
  ADD_LANDING_TEXT,
  UPDATE_LANDING_TEXT,
  DELETE_LANDING_TEXT,
  GET_LANDING_FORM,
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
  viajes: [],
  nuevoHotel: null,
  deleteHotelError: null,
  editHotelError: null,
  landingData: [],
  isAuthenticated: false,
  imageUrl: "",
  landingDataText: [],
  landingDataForm: [],
};

function rootReducer(state = initialState, action) {
  let viajesActualizados;
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case LOGIN_SUCCESS:
      console.log("ACA LOGINS SUCC", action.payload.usuario);
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        currentUser: action.payload.usuario || {},
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
    case OBTENER_VIAJES_EXITO:
      return {
        ...state,
        viajes: action.payload,
        error: null,
      };
    case OBTENER_VIAJES_ERROR:
      return {
        ...state,
        viajes: [],
        error: action.payload,
      };
    case POSTEAR_HOTELES_EXITO:
      return {
        ...state,
        nuevoHotel: action.payload,
        error: null,
      };
    case POSTEAR_HOTELES_ERROR:
      return {
        ...state,
        nuevoHotel: null,
        error: action.payload,
      };
    case ELIMINAR_VIAJE_EXITO:
      // Realiza la operación dentro del bloque case
      viajesActualizados = state.viajes.filter(
        (viaje) => viaje.id !== action.payload
      );
      return {
        ...state,
        viajes: viajesActualizados,
        error: null,
      };
    case ELIMINAR_VIAJE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case EDITAR_VIAJE_EXITO:
      // Actualiza la lista de viajes con el viaje editado
      viajesActualizados = state.viajes.map((viaje) => {
        if (viaje.id === action.payload.id) {
          // Si encontramos el viaje editado, actualizamos sus datos
          return {
            ...viaje,
            // Actualiza los campos editados según la respuesta del servidor (action.payload)
            destino: action.payload.destino,
            // Agrega aquí otros campos editados
          };
        }
        return viaje;
      });
      return {
        ...state,
        viajes: viajesActualizados,
        error: null,
      };

    case EDITAR_VIAJE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_HOTEL_SUCCESS:
      return {
        ...state,
        deleteHotelError: null,
        hotels: state.hotels.filter((hotel) => hotel.id !== action.payload),
      };
    case DELETE_HOTEL_FAILURE:
      return {
        ...state,
        deleteHotelError: action.payload,
      };
    case EDIT_HOTEL_SUCCESS:
      return {
        ...state,
        editHotelError: null,
        hoteles: state.hoteles.map((hotel) => {
          if (hotel.id === action.payload.id) {
            return {
              ...hotel,
              nombre: action.payload.nombre,
              direccion: action.payload.direccion,
              fotos: action.payload.fotos,
              videos: action.payload.videos,
            };
          }
          return hotel;
        }),
      };
    case EDIT_HOTEL_FAILURE:
      return {
        ...state,
        editHotelError: action.payload,
      };
    case GET_LANDING:
      return {
        ...state,
        landingData: action.payload,
      };
    case ADD_LANDING:
      return {
        ...state,
        landingData: [...state.landingData, action.payload],
      };
    case UPDATE_LANDING:
      return {
        ...state,
        landingData: state.landingData.map((landing) =>
          landing.id === action.payload.id ? action.payload : landing
        ),
      };
    case DELETE_LANDING:
      return {
        ...state,
        landingData: state.landingData.filter(
          (landing) => landing.id !== action.payload
        ),
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        isLoggedIn: false,
      };
    case UPLOAD_IMAGE_SUCCESS:
      console.log("URL de la imagen cargada con éxito:", action.payload);
      return {
        ...state,
        imageUrl: action.payload,
        error: null,
      };

    case UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        imageUrl: "",
        error: action.payload,
      };
    case GET_LANDING_TEXT:
      return {
        ...state,
        landingDataText: action.payload,
      };
    case ADD_LANDING_TEXT:
      return {
        ...state,
        landingDataText: [...state.landingDataText, action.payload],
      };
    case UPDATE_LANDING_TEXT:
      return {
        ...state,
        landingDataText: state.landingDataText.map((landing) =>
          landing.id === action.payload.id ? action.payload : landing
        ),
      };
    case DELETE_LANDING_TEXT:
      return {
        ...state,
        landingDataText: state.landingDataText.filter(
          (landing) => landing.id !== action.payload
        ),
      };

    case GET_LANDING_FORM:
      return {
        ...state,
        landingDataForm: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
