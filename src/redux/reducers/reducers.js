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
  OBTENER_MEDIOSDEPAGO_EXITO,
  OBTENER_MEDIOSDEPAGO_ERROR,
  POSTEAR_MEDIOSDEPAGO_EXITO,
  POSTEAR_MEDIOSDEPAGO_ERROR,
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
  EDITAR_USUARIO_SUCCESS,
  EDITAR_USUARIO_FAILURE,
  CREAR_USUARIO_SUCCESS,
  CREAR_USUARIO_FAILURE,
  ELIMINAR_USUARIO_SUCCESS,
  ELIMINAR_USUARIO_FAILURE,
  EDITAR_ITINERARIO_ERROR,
  EDITAR_ITINERARIO_EXITO,
  ELIMINAR_ITINERARIO_EXITO,
  ELIMINAR_ITINERARIO_ERROR,
  EDITAR_MEDIODEPAGO_ERROR,
  EDITAR_MEDIODEPAGO_EXITO,
  ELIMINAR_MEDIODEPAGO_EXITO,
  ELIMINAR_MEDIODEPAGO_ERROR,
  OBTENER_PASAJERO_EXITO,
  OBTENER_PASAJERO_ERROR,
  ADD_NEW_CONTACT,
  MARK_ALL_MESSAGES_AS_READ_SUCCESS,
  GET_PADRES,
  OBTENER_COORDINADOR_EXITO,
  OBTENER_COORDINADOR_ERROR,
} from "../actions/actions";

const initialState = {
  messages: [],
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
  mediosDePago: [],
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
  pasajeros: [],
  nuevosContactos: [],
  padres: [],
  coordinadores: [],
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
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        currentUser: action.payload.usuario ? action.payload.usuario : {},
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
    case OBTENER_PASAJERO_EXITO:
      return {
        ...state,
        pasajeros: action.payload,
        error: null,
      };

    case OBTENER_PASAJERO_ERROR:
      return {
        ...state,
        pasajeros: [],
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
    case EDITAR_ITINERARIO_EXITO:
      return {
        ...state,
        error: null,
        itinerarios: state.itinerarios.map((itinerario) => {
          if (itinerario.id === action.payload.id) {
            return {
              ...itinerario,
              nombre: action.payload,
              texto_gral: action.payload,
            };
          }
          return itinerario;
        }),
      };
    case EDITAR_ITINERARIO_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ELIMINAR_ITINERARIO_EXITO:
      return {
        ...state,
        itinerarios: state.landingDataText.filter(
          (itinerario) => itinerario.id !== action.payload
        ),
      };
    case ELIMINAR_ITINERARIO_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case OBTENER_MEDIOSDEPAGO_EXITO:
      return {
        ...state,
        mediosDePago: action.payload,
        error: null,
      };
    case OBTENER_MEDIOSDEPAGO_ERROR:
      return {
        ...state,
        mediosDePago: [],
        error: action.payload,
      };
    case POSTEAR_MEDIOSDEPAGO_EXITO:
      return {
        ...state,
        nuevoItenerario: action.payload,
        error: null,
      };
    case POSTEAR_MEDIOSDEPAGO_ERROR:
      return {
        ...state,
        nuevoItenerario: null,
        error: action.payload,
      };
    case EDITAR_MEDIODEPAGO_EXITO:
      return {
        ...state,
        error: null,
        mediosDePago: state.mediosDePago.map((mediodepago) => {
          if (mediodepago.id === action.payload.id) {
            return {
              ...mediodepago,
              nombre: action.payload,
              texto_gral: action.payload,
            };
          }
          return mediodepago;
        }),
      };
    case EDITAR_MEDIODEPAGO_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ELIMINAR_MEDIODEPAGO_EXITO:
      return {
        ...state,
        mediosDePago: state.landingDataText.filter(
          (mediodepago) => mediodepago.id !== action.payload
        ),
      };
    case ELIMINAR_MEDIODEPAGO_ERROR:
      return {
        ...state,
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
          // Si encontra el viaje editado, actualiza sus datos
          return {
            ...viaje,
            // Actualiza los campos editados según la respuesta del servidor (action.payload)
            destino: action.payload.destino,
            
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
              latitude: action.payload.latitude,
              longitude: action.payload.latitude,
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
    case EDITAR_USUARIO_SUCCESS:
      // Actualiza el estado con el usuario editado
      // usuario correcto por ID y actualizar sus datos
      
      return {
        ...state,
        users: state.users.map((usuario) =>
          usuario.id === action.payload.id ? action.payload : usuario
        ),
        error: null,
      };

    case CREAR_USUARIO_SUCCESS:
      // Agrega el nuevo usuario al estado
      return {
        ...state,
        users: [...state.users, action.payload],
        error: null,
      };

    case EDITAR_USUARIO_FAILURE:
    case CREAR_USUARIO_FAILURE:
      
      return {
        ...state,
        error: action.payload,
      };

    case ELIMINAR_USUARIO_SUCCESS: {
      // Elimina el usuario del estado por su ID
      const usuariosActualizados = state.users.filter(
        (usuario) => usuario.id !== action.payload
      );
      return {
        ...state,
        users: usuariosActualizados,
        error: null,
      };
    }

    case ELIMINAR_USUARIO_FAILURE:
      
      return {
        ...state,
        error: action.payload,
      };
    case MARK_ALL_MESSAGES_AS_READ_SUCCESS:
      return {
        ...state,
        //  actualizar el estado landingDataForm para marcar todos los mensajes como leídos
        landingDataForm: state.landingDataForm.map((contacto) => ({
          ...contacto,
          leido: true, // Marcar todos los mensajes como leídos
        })),
        .
      };
    case ADD_NEW_CONTACT:
      return {
        ...state,
        nuevosContactos: [...state.nuevosContactos, action.payload],
      };
    // 
    case GET_PADRES:
      console.log("Contenido de padres:", action.payload);
      return {
        ...state,
        padres: action.payload,
      };
    case OBTENER_COORDINADOR_EXITO:
      return {
        ...state,
        coordinadores: action.payload,
        error: null,
      };
    case OBTENER_COORDINADOR_ERROR:
      return {
        ...state,
        coordinadores: [],
        error: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
