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
    console.log("traer usesr", usuarios);
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

      // Despacha una acción para agregar el nuevo usuario al estado de usuarios en el store
      dispatch({ type: CREAR_USUARIO_SUCCESS, payload: response.data });
    } catch (error) {
      // Maneja errores y despacha una acción de error si es necesario
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
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.0IqKjeV_7Qg2GKkvO48Ce8Mxx0-cLk5fam38Dw1B_UE",
          "Content-Type": "application/json",
        },
      });

      // Despacha una acción para eliminar el usuario del estado de usuarios en el store
      dispatch({ type: ELIMINAR_USUARIO_SUCCESS, payload: usuarioId });
    } catch (error) {
      // Maneja errores y despacha una acción de error si es necesario
      dispatch({ type: ELIMINAR_USUARIO_FAILURE, payload: error.message });
    }
  };
};

export function login(username, password) {
  const loginUrl = import.meta.env.VITE_LOGEARSE;

  return async function (dispatch) {
    try {
      // Realiza la solicitud de inicio de sesión al backend
      const response = await axios.get(`${loginUrl}${username}/${password}`, {
        headers: {
          "x-access-token": TOKEN,
          "Content-Type": "application/json",
        },
      });
      console.log("Aca la respuesta", response);
      // Si el inicio de sesión es exitoso
      if (response.status === 200) {
        // Almacena la información del usuario en el Local Storage
        localStorage.setItem("user", JSON.stringify(response.data));

        // Despacha la acción de éxito
        return dispatch({
          type: LOGIN_SUCCESS,
          payload: response,
        });
      } else {
        // Despacha la acción de error si el inicio de sesión falla
        return dispatch({
          type: LOGIN_FAILURE,
          payload: response.statusText,
        });
      }
    } catch (error) {
      // Maneja errores aquí, si es necesario
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
            "x-access-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.0IqKjeV_7Qg2GKkvO48Ce8Mxx0-cLk5fam38Dw1B_UE",
            "Content-Type": "application/json",
          },
        }
      );
      const dataUserUrl = `/${response.data.idUsuario}`;
      // ${response.data.token}
      if (response.status === 200) {
        dispatch(forgotPasswordSuccess());
        dispatch(olvidoPassDatosUrl(dataUserUrl));
        console.log(dataUserUrl);
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
    console.log("SOY LA ACTION", idUsuario);
    try {
      const response = await axios.put(
        updatePassUrl, // Ajusta la URL según tu backend
        {
          idUsuario: idUsuario, //dato obligatorio
          password: newPassword,
        }, // Envia la nueva contraseña al servidor
        // console.log("SOY LA ACTION", response),
        {
          headers: {
            "x-access-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.0IqKjeV_7Qg2GKkvO48Ce8Mxx0-cLk5fam38Dw1B_UE",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        dispatch(newPasswordSuccess());
      } else {
        // Puedes manejar errores aquí si es necesario
      }
    } catch (error) {
      // Manejar errores, si corresponde
    }
  };
};

export const crearViaje = (nuevoViajeData) => {
  const createTravel = import.meta.env.VITE_CREARVIAJE;
  return async (dispatch) => {
    try {
      // Realiza una solicitud POST al backend para crear el viaje
      console.log(
        "Aca nuevoViajeData antes de enviar la solicitud",
        nuevoViajeData.nuevoDestinoData,
        nuevoViajeData.nuevoHotelIdData,
        nuevoViajeData.contratosFinal,
        nuevoViajeData.nuevoScheduleIdData
      );
      const response = await axios.post(
        createTravel,

        {
          destino: nuevoViajeData.nuevoDestinoData,
          hotelId: nuevoViajeData.nuevoHotelIdData,
          contratos: nuevoViajeData.contratosFinal, // Cambia esto según tus necesidades
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
      console.log("Aca response luego de dispatch", response.data);
      // Despacha una acción de éxito si se crea el viaje
      dispatch(
        {
          type: VIAJE_CREAR_EXITO,
          payload: response.data,
        },
        console.log("Aca response luego de dispatch", response.data)
      );
    } catch (error) {
      // Despacha una acción de error si falla la creación del viaje
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
    }); // Reemplaza con la ruta correcta
    const contratos = response.data;

    // Supongamos que la respuesta es un array de contratos

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
    }); // Reemplaza con la ruta correcta
    const hoteles = response.data; // Supongamos que la respuesta es un array de contratos

    hoteles.sort((a, b) => b.id - a.id);
    console.log("hoteles", hoteles);
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
    }); // Reemplaza con la ruta correcta
    const itinerarios = response.data; // Supongamos que la respuesta es un array de contratos
    dispatch({ type: OBTENER_ITINERARIOS_EXITO, payload: itinerarios });
  } catch (error) {
    dispatch({ type: OBTENER_ITINERARIOS_ERROR, payload: error.message });
  }
};

export const crearItinerario = (nuevoItinerario) => {
  const createSchedule = import.meta.env.VITE_CREARITINERARIO;
  return async (dispatch) => {
    try {
      // Realiza una solicitud POST al backend para crear el viaje
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

      // Despacha una acción de éxito si se crea el viaje
      dispatch({
        type: POSTEAR_ITINERARIOS_EXITO,
        payload: response.data,
      });
    } catch (error) {
      // Despacha una acción de error si falla la creación del viaje
      dispatch({
        type: POSTEAR_ITINERARIOS_ERROR,
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
    }); // Reemplaza con la ruta correcta
    const viajes = response.data;
    viajes.sort((a, b) => b.id - a.id);

    // Supongamos que la respuesta es un array de contratos

    dispatch({ type: OBTENER_VIAJES_EXITO, payload: viajes });
  } catch (error) {
    dispatch({ type: OBTENER_VIAJES_ERROR, payload: error.message });
  }
};

export const crearHotel = (nuevoHotel) => {
  const createHotel = import.meta.env.VITE_CREARHOTEL;
  return async (dispatch) => {
    try {
      // Realiza una solicitud POST al backend para crear el viaje
      const response = await axios.post(
        createHotel,

        {
          nombre: nuevoHotel.nombre,
          direccion: nuevoHotel.direccion,
          fotos: nuevoHotel.fotos,
          videos: nuevoHotel.videos,
          telefono: nuevoHotel.telefono,
        },

        {
          headers: {
            "x-access-token": TOKEN,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("RESPUESTA", response);
      // Despacha una acción de éxito si se crea el viaje
      dispatch({
        type: POSTEAR_HOTELES_EXITO,
        payload: response.data,
      });
    } catch (error) {
      // Despacha una acción de error si falla la creación del viaje
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
      // Realiza una solicitud DELETE al backend para eliminar el viaje
      await axios.delete(`${deleteTravelUrl}${viajeId}`, {
        headers: {
          "x-access-token": TOKEN,
          "Content-Type": "application/json",
        },
      });

      // Despacha una acción de éxito si se elimina el viaje
      dispatch({
        type: ELIMINAR_VIAJE_EXITO,
        payload: viajeId,
      });
    } catch (error) {
      // Despacha una acción de error si falla la eliminación del viaje
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
      console.log("ACA DATA EN ACTIONS", data);

      const response = await axios.put(
        `${editTravelUrl}${idViaje}`, // Reemplaza con la URL correcta de tu API
        data, // Los datos editados del viaje

        {
          headers: {
            "x-access-token": TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Si la edición fue exitosa, despachamos la acción de éxito
        dispatch({
          type: EDITAR_VIAJE_EXITO,
          payload: response.data,
        });
      } else {
        // Si hubo un error en la edición, despachamos la acción de error
        dispatch({
          type: EDITAR_VIAJE_ERROR,
          payload: "Error al editar el viaje.",
        });
      }
    } catch (error) {
      // Si hubo una excepción, despachamos la acción de error
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
    }); // Reemplaza con tu URL de backend
    console.log("GET LANDING", response);
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
    console.log("aca landing data", landingData);
    const response = await axios.post(getLandingUrl, landingData, {
      headers: {
        "x-access-token": TOKEN,

        "Content-Type": "application/json",
      },
    }); // Reemplaza con tu URL de backend
    console.log("ACA ESTA LA RESPUESTA", response);
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
    console.log("aca landingdata", landingData);
    const response = await axios.put(`${getLandingUrl}/${id}`, landingData, {
      headers: {
        "x-access-token": TOKEN,

        "Content-Type": "application/json",
      },
    }); // Reemplaza con tu URL de backend
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
    }); // Reemplaza con tu URL de backend
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
    localStorage.removeItem("user"); // Ajusta esto según tu implementación
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
    console.log("form data", formData);
    const response = await axios.post(uploadImageUrl, imageFile);
    console.log("ACA RESPONSE DE IMAGEURL", response.data.urlImage);
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
    }); // Reemplaza con tu URL de backend
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
    }); // Reemplaza con tu URL de backend
    console.log("ACA ESTA LA RESPUESTA", response);
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
    console.log("aca landingdata", landingDataText);
    const response = await axios.put(
      `${getTextLandingUrl}/${id}`,
      landingDataText,
      {
        headers: {
          "x-access-token": TOKEN,

          "Content-Type": "application/json",
        },
      }
    ); // Reemplaza con tu URL de backend
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
    }); // Reemplaza con tu URL de backend
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
    }); // Reemplaza con tu URL de backend
    dispatch({
      type: GET_LANDING_FORM,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error al obtener datos de la landing", error);
  }
};
