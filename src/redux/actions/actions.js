import axios from "axios";
export const GET_USERS = "GET_USERS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";
export const URL_USER_PASS = "URL_USER_PASS";
export const NEW_PASSWORD_SUBMITTED = "NEW_PASSWORD_SUBMITTED";
export const NEW_PASSWORD_SUCCESS = "NEW_PASSWORD_SUCCESS";
export const VIAJE_CREAR_EXITO = "VIAJE_CREAR_EXITO";
export const VIAJE_CREAR_ERROR = "VIAJE_CREAR_ERROR";
export const OBTENER_CONTRATOS_ERROR = "OBTENER_CONTRATOS_ERROR";
export const OBTENER_CONTRATOS_EXITO = "OBTENER_CONTRATOS_EXITO";
export const OBTENER_HOTELES_EXITO = "OBTENER_HOTELES_EXITO";
export const OBTENER_HOTELES_ERROR = "OBTENER_HOTELES_ERROR";
export const OBTENER_ITINERARIOS_EXITO = "OBTENER_ITINERARIOS_EXITO";
export const OBTENER_ITINERARIOS_ERROR = "OBTENER_ITINERARIOS_ERROR";
export const POSTEAR_ITINERARIOS_EXITO = "POSTEAR_ITINERARIOS_EXITO";
export const POSTEAR_ITINERARIOS_ERROR = "POSTEAR_ITINERARIOS_ERROR";
export const OBTENER_VIAJES_EXITO = "OBTENER_VIAJES_EXITO";
export const OBTENER_VIAJES_ERROR = "OBTENER_VIAJES_EXITO";
export const POSTEAR_HOTELES_ERROR = "POSTEAR_HOTELES_ERROR";
export const POSTEAR_HOTELES_EXITO = "POSTEAR_HOTELES_EXITO";
export const ELIMINAR_VIAJE_EXITO = "ELIMINAR_VIAJE_EXITO";
export const ELIMINAR_VIAJE_ERROR = "ELIMINAR_VIAJE_ERROR";
export const EDITAR_VIAJE_EXITO = "EDITAR_VIAJE_EXITO";
export const EDITAR_VIAJE_ERROR = "EDITAR_VIAJE_ERROR";
export const DELETE_HOTEL_SUCCESS = "DELETE_HOTEL_SUCCESS";
export const DELETE_HOTEL_FAILURE = "DELETE_HOTEL_FAILURE";
export const EDIT_HOTEL_SUCCESS = "EDIT_HOTEL_SUCCESS";
export const EDIT_HOTEL_FAILURE = "EDIT_HOTEL_FAILURE";
export const GET_LANDING = "GET_LANDING";
export const ADD_LANDING = "ADD_LANDING";
export const UPDATE_LANDING = "UPDATE_LANDING";
export const DELETE_LANDING = "DELETE_LANDING";
export const GET_LANDING_TEXT = "GET_LANDING_TEXT";
export const ADD_LANDING_TEXT = "ADD_LANDING_TEXT";
export const UPDATE_LANDING_TEXT = "UPDATE_LANDING_TEXT";
export const DELETE_LANDING_TEXT = "DELETE_LANDING_TEXT";
export const LOGOUT_USER = "LOGOUT_USER";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE";
export const GET_LANDING_FORM = "GET_LANDING_FORM";
export const EDITAR_USUARIO_SUCCESS = "EDITAR_USUARIO_SUCCESS";
export const EDITAR_USUARIO_FAILURE = "EDITAR_USUARIO_FAILURE";
export const CREAR_USUARIO_SUCCESS = "CREAR_USUARIO_SUCCESS";
export const CREAR_USUARIO_FAILURE = "CREAR_USUARIO_FAILURE";
export const ELIMINAR_USUARIO_SUCCESS = "ELIMINAR_USUARIO_SUCCESS";
export const ELIMINAR_USUARIO_FAILURE = "ELIMINAR_USUARIO_FAILURE";
export const EDITAR_ITINERARIO_EXITO = "EDITAR_ITINERARIO_EXITO";
export const EDITAR_ITINERARIO_ERROR = "EDITAR_ITINERARIO_ERROR";
export const ELIMINAR_ITINERARIO_EXITO = "ELIMINAR_ITINERARIO_EXITO";
export const ELIMINAR_ITINERARIO_ERROR = "ELIMINAR_ITINERARIO_ERROR";
export const OBTENER_PASAJERO_EXITO = "OBTENER_PASAJERO_EXITO";
export const OBTENER_PASAJERO_ERROR = "OBTENER_PASAJERO_ERROR";
export const MARK_MESSAGE_AS_READ = "MARK_MESSAGE_AS_READ";
export const MARK_ALL_MESSAGES_AS_READ = "MARK_ALL_MESSAGES_AS_READ";
export const ADD_NEW_CONTACT = "ADD_NEW_CONTACT";
export const OBTENER_COORDINADOR_EXITO = "OBTENER_COORDINADOR_EXITO";
export const OBTENER_COORDINADOR_ERROR = "OBTENER_COORDINADOR_ERROR";
export const MARK_ALL_MESSAGES_AS_READ_REQUEST =
  "MARK_ALL_MESSAGES_AS_READ_REQUEST";
export const MARK_ALL_MESSAGES_AS_READ_SUCCESS =
  "MARK_ALL_MESSAGES_AS_READ_SUCCESS";
export const MARK_ALL_MESSAGES_AS_READ_FAILURE =
  "MARK_ALL_MESSAGES_AS_READ_FAILURE";
export const GET_PADRES = "GET_PADRES";
const TOKEN = import.meta.env.VITE_Access_token;
const getUserUrl = import.meta.env.VITE_TRAERUSUARIOSURL;
const editUserUrl = import.meta.env.VITE_EDITARUSUARIOS;
const createUserUrl = import.meta.env.VITE_CREARUSUARIOS;
export function getUsers() {
  return async function (dispatch) {
    let response = await axios.get(getUserUrl, {
      headers: {
        "x-access-token": TOKEN,
        "Content-Type": "application/json",
      },
    });
    const usuarios = response.data;

    usuarios.sort((a, b) => b.id - a.id);

    return dispatch({
      type: GET_USERS,
      payload: response.data,
    });
  };
}
export const editarUsuario = (usuarioId, usuarioActualizado) => {
  return async (dispatch) => {
    try {
      // Realiza una solicitud HTTP para actualizar el usuario en el servidor
      const response = await axios.put(
        `${editUserUrl}${usuarioId}`,
        usuarioActualizado,
        {
          headers: {
            "x-access-token": TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      // Despacha una acción para actualizar el estado de usuarios en el store
      dispatch({ type: EDITAR_USUARIO_SUCCESS, payload: response.data });
    } catch (error) {
      // Maneja errores y despacha una acción de error si es necesario
      dispatch({ type: EDITAR_USUARIO_FAILURE, payload: error.message });
    }
  };
};

export const crearUsuario = (nuevoUsuario) => {
  return async (dispatch) => {
    try {
      // Realiza una solicitud HTTP para crear un nuevo usuario en el servidor
      const response = await axios.post(createUserUrl, nuevoUsuario, {
        headers: {
          "x-access-token": TOKEN,
          "Content-Type": "application/json",
        },
      });

      // Despacha una acción para agregar el nuevoo usuario al estado de usuarios en el store
      dispatch({ type: CREAR_USUARIO_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREAR_USUARIO_FAILURE, payload: error.message });
    }
  };
};

export const eliminarUsuario = (usuarioId) => {
  const eliminarUrl = import.meta.env.VITE_ELIMINARUSUARIOS;
  return async (dispatch) => {
    try {
      // Realiza una solicitud HTTP para eliminar el usuario en el servidor
      await axios.delete(`${eliminarUrl}${usuarioId}`, {
        headers: {
          "x-access-token": TOKEN,
          "Content-Type": "application/json",
        },
      });

      //  Accioon para eliminar el usuario del estado de usuarios en el store
      dispatch({ type: ELIMINAR_USUARIO_SUCCESS, payload: usuarioId });
    } catch (error) {
      dispatch({ type: ELIMINAR_USUARIO_FAILURE, payload: error.message });
    }
  };
};

export function login(username, password) {
  const loginUrl = import.meta.env.VITE_LOGEARSE;

  return async function (dispatch) {
    try {
      const response = await axios.get(`${loginUrl}${username}/${password}`, {
        headers: {
          "x-access-token": TOKEN,
          "Content-Type": "application/json",
        },
      });

      // Si el inicio de sesión es exitoso
      if (response.status === 200) {
        // Almacena la información del usuario en el Local Storage
        localStorage.setItem("user", JSON.stringify(response.data));

        return dispatch({
          type: LOGIN_SUCCESS,
          payload: response,
        });
      } else {
        return dispatch({
          type: LOGIN_FAILURE,
          payload: response.statusText,
        });
      }
    } catch (error) {
      // Maneja errores
    }
  };
}

export const forgotPasswordRequest = () => ({
  type: FORGOT_PASSWORD_REQUEST,
});

export const forgotPasswordSuccess = () => ({
  type: FORGOT_PASSWORD_SUCCESS,
});

export const forgotPasswordFailure = (error) => ({
  type: FORGOT_PASSWORD_FAILURE,
  payload: error,
});

export const forgotPassword = (username) => {
  const resetUrl = import.meta.env.VITE_RESETEARPASS;
  return async (dispatch) => {
    dispatch(forgotPasswordRequest());

    try {
      const response = await axios.post(
        resetUrl,
        { usuario: username },
        {
          headers: {
            "x-access-token": TOKEN,
            "Content-Type": "application/json",
          },
        }
      );
      const dataUserUrl = `/${response.data.idUsuario}`;
      // ${response.data.token}
      if (response.status === 200) {
        dispatch(forgotPasswordSuccess());
        dispatch(olvidoPassDatosUrl(dataUserUrl));
      } else {
        dispatch(
          forgotPasswordFailure("Error al enviar el correo de recuperación.")
        );
      }
    } catch (error) {
      dispatch(
        forgotPasswordFailure(
          error.message || "Error al enviar el correo de recuperación."
        )
      );
    }
  };
};

export const olvidoPassDatosUrl = (response) => ({
  type: URL_USER_PASS,
  payload: response,
});

export const newPasswordSubmitted = () => ({
  type: NEW_PASSWORD_SUBMITTED,
});

export const newPasswordSuccess = () => ({
  type: NEW_PASSWORD_SUCCESS,
});

export const updatePassword = (token, idUsuario, newPassword) => {
  const updatePassUrl = import.meta.env.VITE_ACTUALIZARPASSWORD;
  return async (dispatch) => {
    // Obtener el token del estado

    try {
      const response = await axios.put(
        updatePassUrl,
        {
          idUsuario: idUsuario, //dato obligatorio
          password: newPassword,
        }, // Envia la nueva contraseña al servidor

        {
          headers: {
            "x-access-token": TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        dispatch(newPasswordSuccess());
      } else {
        //
      }
    } catch (error) {
      //
    }
  };
};

export const crearViaje = (nuevoViajeData) => {
  const createTravel = import.meta.env.VITE_CREARVIAJE;
  return async (dispatch) => {
    try {
      // Realiza una solicitud POST al backend para crear el viaje

      const response = await axios.post(
        createTravel,

        {
          destino: nuevoViajeData.nuevoDestinoData,
          hotelId: nuevoViajeData.nuevoHotelIdData,
          contratos: nuevoViajeData.contratosFinal,
          scheduleId: nuevoViajeData.nuevoScheduleIdData,
          salida: nuevoViajeData.fechaSalida,
          regreso: nuevoViajeData.fechaRegreso,
        },

        {
          headers: {
            "x-access-token": TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: VIAJE_CREAR_EXITO,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: VIAJE_CREAR_ERROR,
        payload: error.message,
      });
    }
  };
};

export const obtenerContratos = () => async (dispatch) => {
  const getContrat = import.meta.env.VITE_TRAERCONTRATOS;

  try {
    const response = await axios.get(getContrat, {
      headers: {
        "x-access-token": TOKEN,
        "Content-Type": "application/json",
      },
    });
    const contratos = response.data;
    contratos.sort((a, b) => b.num - a.num);

    dispatch({ type: OBTENER_CONTRATOS_EXITO, payload: contratos });
  } catch (error) {
    dispatch({ type: OBTENER_CONTRATOS_ERROR, payload: error.message });
  }
};

export const obtenerHoteles = () => async (dispatch) => {
  const getHotelsUrl = import.meta.env.VITE_TRAERHOTELES;
  try {
    const response = await axios.get(getHotelsUrl, {
      headers: {
        "x-access-token": TOKEN,
        "Content-Type": "application/json",
      },
    });
    const hoteles = response.data;

    hoteles.sort((a, b) => b.id - a.id);

    dispatch({ type: OBTENER_HOTELES_EXITO, payload: hoteles });
  } catch (error) {
    dispatch({ type: OBTENER_HOTELES_ERROR, payload: error.message });
  }
};

export const obtenerItinerario = () => async (dispatch) => {
  const getSchedulleUrl = import.meta.env.VITE_TRAERITINERARIO;
  try {
    const response = await axios.get(getSchedulleUrl, {
      headers: {
        "x-access-token": TOKEN,
        "Content-Type": "application/json",
      },
    });
    const itinerarios = response.data;
    dispatch({ type: OBTENER_ITINERARIOS_EXITO, payload: itinerarios });
  } catch (error) {
    dispatch({ type: OBTENER_ITINERARIOS_ERROR, payload: error.message });
  }
};

export const crearItinerario = (nuevoItinerario) => {
  const createSchedule = import.meta.env.VITE_CREARITINERARIO;
  return async (dispatch) => {
    try {
      const response = await axios.post(
        createSchedule,

        {
          nombre: nuevoItinerario.nombre,
          texto_gral: nuevoItinerario.texto_gral,
        },

        {
          headers: {
            "x-access-token": TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: POSTEAR_ITINERARIOS_EXITO,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: POSTEAR_ITINERARIOS_ERROR,
        payload: error.message,
      });
    }
  };
};
export function editItinerario(ItinerarioId, updatedItinerario) {
  const getSchedulleUrl = import.meta.env.VITE_TRAERITINERARIO;
  return async function (dispatch) {
    try {
      const response = await axios.put(
        `${getSchedulleUrl}${ItinerarioId}`,
        updatedItinerario,
        {
          headers: {
            "x-access-token": TOKEN,

            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: EDITAR_ITINERARIO_EXITO,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: EDITAR_ITINERARIO_ERROR,
        payload: error.message,
      });
    }
  };
}
export const eliminarItinerario = (itinerarioId) => {
  const getSchedulleUrl = import.meta.env.VITE_TRAERITINERARIO;
  return async (dispatch) => {
    try {
      // Realiza una solicitud DELETE al backend para eliminar el viaje
      await axios.delete(`${getSchedulleUrl}${itinerarioId}`, {
        headers: {
          "x-access-token": TOKEN,
          "Content-Type": "application/json",
        },
      });

      //  acción de éxito si se elimina el viaje
      dispatch({
        type: ELIMINAR_ITINERARIO_EXITO,
        payload: itinerarioId,
      });
    } catch (error) {
      //  acción de error si falla la eliminación del viaje
      dispatch({
        type: ELIMINAR_ITINERARIO_ERROR,
        payload: error.message,
      });
    }
  };
};
export const obtenerViajes = () => async (dispatch) => {
  const getTravelUrl = import.meta.env.VITE_OBTENERVIAJES;
  try {
    const response = await axios.get(getTravelUrl, {
      headers: {
        "x-access-token": TOKEN,
        "Content-Type": "application/json",
      },
    });
    const viajes = response.data;
    viajes.sort((a, b) => b.id - a.id);

    dispatch({ type: OBTENER_VIAJES_EXITO, payload: viajes });
  } catch (error) {
    dispatch({ type: OBTENER_VIAJES_ERROR, payload: error.message });
  }
};

export const crearHotel = (nuevoHotel) => {
  const createHotel = import.meta.env.VITE_CREARHOTEL;
  return async (dispatch) => {
    try {
      const response = await axios.post(
        createHotel,

        {
          nombre: nuevoHotel.nombre,
          direccion: nuevoHotel.direccion,
          fotos: nuevoHotel.fotos,
          videos: nuevoHotel.videos,
          telefono: nuevoHotel.telefono,
          otra_red: nuevoHotel.otra_red,
          latitude: nuevoHotel.latitud,
          longitude: nuevoHotel.longitud,
        },

        {
          headers: {
            "x-access-token": TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: POSTEAR_HOTELES_EXITO,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: POSTEAR_HOTELES_ERROR,
        payload: error.message,
      });
    }
  };
};

export const eliminarViaje = (viajeId) => {
  const deleteTravelUrl = import.meta.env.VITE_ELIMINARVIAJE;
  return async (dispatch) => {
    try {
      await axios.delete(`${deleteTravelUrl}${viajeId}`, {
        headers: {
          "x-access-token": TOKEN,
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: ELIMINAR_VIAJE_EXITO,
        payload: viajeId,
      });
    } catch (error) {
      dispatch({
        type: ELIMINAR_VIAJE_ERROR,
        payload: error.message,
      });
    }
  };
};

export function editarViaje(idViaje, data) {
  const editTravelUrl = import.meta.env.VITE_EDITARVIAJE;
  return async function (dispatch) {
    try {
      const response = await axios.put(
        `${editTravelUrl}${idViaje}`,
        data, // Los datos editados del viaje

        {
          headers: {
            "x-access-token": TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Si la edición fue exitosa, despachamos la accion de xito
        dispatch({
          type: EDITAR_VIAJE_EXITO,
          payload: response.data,
        });
        console.log("edicion viajes", response);
      } else {
        // si hubo un error en la edicion, despachamos la acción de error
        dispatch({
          type: EDITAR_VIAJE_ERROR,
          payload: "Error al editar el viaje.",
        });
      }
    } catch (error) {
      dispatch({
        type: EDITAR_VIAJE_ERROR,
        payload: error.message || "Error al editar el viaje.",
      });
    }
  };
}

export function deleteHotel(hotelId) {
  const deleteHotelUrl = import.meta.env.VITE_DELETEHOTEL;
  return async function (dispatch) {
    try {
      await axios.delete(`${deleteHotelUrl}${hotelId}`, {
        headers: {
          "x-access-token": TOKEN,

          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: DELETE_HOTEL_SUCCESS,
        payload: hotelId,
      });
    } catch (error) {
      dispatch({
        type: DELETE_HOTEL_FAILURE,
        payload: error.message,
      });
    }
  };
}

export function editHotel(hotelId, updatedHotel) {
  const edtiHotelUrl = import.meta.env.VITE_EDTIARHOTEL;
  return async function (dispatch) {
    try {
      const response = await axios.put(
        `${edtiHotelUrl}${hotelId}`,
        updatedHotel,
        {
          headers: {
            "x-access-token": TOKEN,

            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: EDIT_HOTEL_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_HOTEL_FAILURE,
        payload: error.message,
      });
    }
  };
}

export const getLanding = () => async (dispatch) => {
  const getLandingUrl = import.meta.env.VITE_TRAERLANDING;
  try {
    const response = await axios.get(getLandingUrl, {
      headers: {
        "x-access-token": TOKEN,

        "Content-Type": "application/json",
      },
    });

    const landingimage = response.data;
    landingimage.sort((a, b) => b.id - a.id);
    dispatch({
      type: GET_LANDING,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error al obtener datos de la landing", error);
  }
};

export const addLanding = (landingData) => async (dispatch) => {
  const getLandingUrl = import.meta.env.VITE_TRAERLANDING;
  try {
    const response = await axios.post(getLandingUrl, landingData, {
      headers: {
        "x-access-token": TOKEN,

        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: ADD_LANDING,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error al agregar datos de la landing", error);
  }
};

export const updateLanding = (id, landingData) => async (dispatch) => {
  const getLandingUrl = import.meta.env.VITE_TRAERLANDING;
  try {
    const response = await axios.put(`${getLandingUrl}/${id}`, landingData, {
      headers: {
        "x-access-token": TOKEN,

        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: UPDATE_LANDING,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error al actualizar datos de la landing", error);
  }
};

export const deleteLanding = (landingId) => async (dispatch) => {
  const getLandingUrl = import.meta.env.VITE_TRAERLANDING;

  try {
    await axios.delete(`${getLandingUrl}/${landingId}`, {
      headers: {
        "x-access-token": TOKEN,

        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: DELETE_LANDING,
      payload: landingId,
    });
  } catch (error) {
    console.error("Error al eliminar datos de la landing", error);
  }
};

export const logoutUser = () => {
  return (dispatch) => {
    // Borra los datos de autenticación del almacenamiento local o de las cookies
    localStorage.removeItem("user");
    // Despacha la acción de logout localmente
    dispatch({
      type: LOGOUT_USER,
    });
  };
};

export const uploadImage = (imageFile) => async (dispatch) => {
  const uploadImageUrl = import.meta.env.VITE_UPLOADIMAGE;
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axios.post(uploadImageUrl, imageFile);

    if (response.status === 200) {
      dispatch({
        type: UPLOAD_IMAGE_SUCCESS,
        payload: response.data.urlImage,
      });
      return response.data;
    } else {
      dispatch({
        type: UPLOAD_IMAGE_FAILURE,
        payload: "Error al cargar la imagen",
      });
    }
  } catch (error) {
    dispatch({
      type: UPLOAD_IMAGE_FAILURE,
      payload: "Error al cargar la imagen",
    });
  }
};

export const getLandingText = () => async (dispatch) => {
  const getTextLandingUrl = import.meta.env.VITE_TEXTOLANDING;
  try {
    const response = await axios.get(getTextLandingUrl, {
      headers: {
        "x-access-token": TOKEN,

        "Content-Type": "application/json",
      },
    });
    const texto = response.data;
    texto.sort((a, b) => b.id - a.id);
    dispatch({
      type: GET_LANDING_TEXT,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error al obtener datos de la landing", error);
  }
};

export const addLandingText = (landingDataText) => async (dispatch) => {
  const getTextLandingUrl = import.meta.env.VITE_TEXTOLANDING;
  try {
    const response = await axios.post(getTextLandingUrl, landingDataText, {
      headers: {
        "x-access-token": TOKEN,

        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: ADD_LANDING_TEXT,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error al agregar datos de la landing", error);
  }
};

export const updateLandingText = (id, landingDataText) => async (dispatch) => {
  const getTextLandingUrl = import.meta.env.VITE_TEXTOLANDING;
  try {
    const response = await axios.put(
      `${getTextLandingUrl}/${id}`,
      landingDataText,
      {
        headers: {
          "x-access-token": TOKEN,

          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: UPDATE_LANDING_TEXT,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error al actualizar datos de la landing", error);
  }
};

export const deleteLandingText = (landingId) => async (dispatch) => {
  const getTextLandingUrl = import.meta.env.VITE_TEXTOLANDING;
  try {
    await axios.delete(`${getTextLandingUrl}/${landingId}`, {
      headers: {
        "x-access-token": TOKEN,

        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: DELETE_LANDING_TEXT,
      payload: landingId,
    });
  } catch (error) {
    console.error("Error al eliminar datos de la landing", error);
  }
};

export const getLandingForm = () => async (dispatch) => {
  const getLandingFormUrl = import.meta.env.VITE_CONTACTOS;
  try {
    const response = await axios.get(getLandingFormUrl, {
      headers: {
        "x-access-token": TOKEN,

        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: GET_LANDING_FORM,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error al obtener datos de la landing", error);
  }
};

export const obtenerPasajero = () => async (dispatch) => {
  const getPasajero = import.meta.env.VITE_TRAERPASAJEROS;
  try {
    const response = await axios.get(getPasajero, {
      headers: {
        "x-access-token": TOKEN,
        "Content-Type": "application/json",
      },
    });
    console.log("ACA RESPONS", response);
    const pasajeros = response.data;

    dispatch({ type: OBTENER_PASAJERO_EXITO, payload: pasajeros });
  } catch (error) {
    dispatch({ type: OBTENER_PASAJERO_ERROR, payload: error.message });
  }
};

export const markAllMessagesAsRead = () => async (dispatch, getState) => {
  const landingDataForm = getState().landingDataForm;
  console.log("landingform", landingDataForm);
  const unreadMessages = landingDataForm.filter((contacto) => !contacto.leido);
  console.log("unreadmessagges", unreadMessages);
  const getLandingFormUrlId = import.meta.env.VITE_CONTACTOS;

  // unreadMessages.map(async (contacto) => {
  //   await axios.put(
  //     `${getLandingFormUrlId}/${contacto.id}`,

  //     {
  //       headers: {
  //         "x-access-token":
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.p5Uixc5mcFGxx8eRohkZI8ec8vR092iQb5GDsJVqffM",
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  // });
  await axios.put(
    `${getLandingFormUrlId}/${unreadMessages[0].id}`,
    {
      leido: true,
    },
    {
      headers: {
        "x-access-token": TOKEN,
        "Content-Type": "application/json",
      },
    }
  );

  dispatch({ type: MARK_ALL_MESSAGES_AS_READ_SUCCESS });
};

export const addNewContact = (contact) => ({
  type: ADD_NEW_CONTACT,
  payload: contact,
});

export function getPadres(loginIds) {
  const getPadresUrl = import.meta.env.VITE_PADRES;
  console.log("LOGINIDPADRES", loginIds);
  const arrayPasajeros = [];

  return async function (dispatch) {
    try {
      for (const loginId of loginIds) {
        const response = await axios.get(`${getPadresUrl}/${loginId}`, {
          headers: {
            "x-access-token": TOKEN,
            "Content-Type": "application/json",
          },
        });
        // console.log("padresHijos", response.data);
        arrayPasajeros.push(response.data);
      }
      const flattenedData = arrayPasajeros.reduce((acc, curr) => {
        return acc.concat(curr);
      }, []);
      dispatch({
        type: GET_PADRES,
        payload: flattenedData,
      });
    } catch (error) {
      // Manejar errores de solicitud
      console.error("Error al obtener padres:", error);
    }
  };
}

export const obtenerCoordinador = () => async (dispatch) => {
  const getCoordinadorUrl = import.meta.env.VITE_COORDINADORES;
  try {
    const response = await axios.get(getCoordinadorUrl, {
      headers: {
        "x-access-token": TOKEN,
        "Content-Type": "application/json",
      },
    });
    console.log("ACA RESPONS", response.data);
    const coordinadores = response.data;
    dispatch({ type: OBTENER_COORDINADOR_EXITO, payload: coordinadores });
  } catch (error) {
    dispatch({ type: OBTENER_COORDINADOR_ERROR, payload: error.message });
  }
};
