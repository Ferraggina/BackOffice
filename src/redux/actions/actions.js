import axios from "axios";
export const GET_USERS = "GET_USERS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";
export const URL_USER_PASS = "URL_USER_PASS";

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
      const dataUserUrl = `${response.data.token}/${response.data.idUsuario}`;

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
