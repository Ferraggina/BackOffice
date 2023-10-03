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

export function getUsers() {
  return async function (dispatch) {
    let response = await axios.get(
      "http://localhost:4002/usuarios"

      //   {
      //     Headers: {
      //       "Content-Type": "application/json",
      //       "x-access-token":
      //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.0IqKjeV_7Qg2GKkvO48Ce8Mxx0-cLk5fam38Dw1B_UE",
      //     },
      //   }
    );

    return dispatch({
      type: GET_USERS,
      payload: response.data,
    });
  };
}

export function login(username, password) {
  // const apiUrl = `http://localhost:4002/usuarios/${username}/${password}`;

  return async function (dispatch) {
    let response = await axios.get(
      `http://localhost:4002/usuarios/${username}/${password}`,
      {
        headers: {
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.0IqKjeV_7Qg2GKkvO48Ce8Mxx0-cLk5fam38Dw1B_UE",
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response.data);
    // if (response.status === 200) {
    //   dispatch({
    //     type: LOGIN_SUCCESS,
    //     payload: response.data,
    //   });
    // } else {
    //   dispatch({
    //     type: LOGIN_FAILURE,
    //     payload: response.statusText,
    //   });
    // }
    return dispatch({
      type: LOGIN_SUCCESS,
      payload: response,
    });
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
  return async (dispatch) => {
    dispatch(forgotPasswordRequest());

    try {
      const response = await axios.post(
        "http://localhost:4002/reset",
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
  return async (dispatch) => {
    // Obtener el token del estado
    console.log("SOY LA ACTION", idUsuario);
    try {
      const response = await axios.put(
        `http://localhost:4002/usuarios`, // Ajusta la URL según tu backend
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
        "http://localhost:4001/nuevoviaje",

        {
          destino: nuevoViajeData.nuevoDestinoData,
          hotelId: nuevoViajeData.nuevoHotelIdData,
          contratos: nuevoViajeData.contratosFinal, // Cambia esto según tus necesidades
          scheduleId: nuevoViajeData.nuevoScheduleIdData,
        },

        {
          headers: {
            "x-access-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.0IqKjeV_7Qg2GKkvO48Ce8Mxx0-cLk5fam38Dw1B_UE",
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
  try {
    const response = await axios.get("http://localhost:4001/contrato/", {
      headers: {
        "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.0IqKjeV_7Qg2GKkvO48Ce8Mxx0-cLk5fam38Dw1B_UE",
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
  try {
    const response = await axios.get("http://localhost:4001/hoteles/", {
      headers: {
        "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.0IqKjeV_7Qg2GKkvO48Ce8Mxx0-cLk5fam38Dw1B_UE",
        "Content-Type": "application/json",
      },
    }); // Reemplaza con la ruta correcta
    const hoteles = response.data; // Supongamos que la respuesta es un array de contratos
    dispatch({ type: OBTENER_HOTELES_EXITO, payload: hoteles });
  } catch (error) {
    dispatch({ type: OBTENER_HOTELES_ERROR, payload: error.message });
  }
};

export const obtenerItinerario = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:4001/itinerario/", {
      headers: {
        "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.0IqKjeV_7Qg2GKkvO48Ce8Mxx0-cLk5fam38Dw1B_UE",
        "Content-Type": "application/json",
      },
    }); // Reemplaza con la ruta correcta
    const itinerarios = response.data; // Supongamos que la respuesta es un array de contratos
    dispatch({ type: OBTENER_ITINERARIOS_EXITO, payload: itinerarios });
  } catch (error) {
    dispatch({ type: OBTENER_ITINERARIOS_ERROR, payload: error.message });
  }
};

// export const crearItinerario = (nuevoItinerario) => async (dispatch) => {
//   try {
//     const response = await axios.post("http://localhost:4001/itinerario",

//     ); // Reemplaza con la ruta correcta
//     const itinerario = response.data; // Supongamos que la respuesta es un array de contratos
//     dispatch({ type: POSTEAR_ITINERARIOS_EXITO, payload: itinerario });
//   } catch (error) {
//     dispatch({ type: POSTEAR_ITINERARIOS_ERROR, payload: error.message });
//   }
// };

export const crearItinerario = (nuevoItinerario) => {
  return async (dispatch) => {
    try {
      // Realiza una solicitud POST al backend para crear el viaje
      const response = await axios.post(
        "http://localhost:4001/itinerario",

        {
          nombre: nuevoItinerario.nombre,
          texto_gral: nuevoItinerario.texto_gral,
        },

        {
          headers: {
            "x-access-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.0IqKjeV_7Qg2GKkvO48Ce8Mxx0-cLk5fam38Dw1B_UE",
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
