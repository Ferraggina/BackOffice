import axios from "axios";
export const GET_USERS = "GET_USERS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.iCKQvHoWffcUhAFvf3pJVQvgwrvhfclsO94I7YBuPO0",
          "Content-Type": "text/plain",
        },
      }
    );
    console.log(response.data);
    if (response.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: response.statusText,
      });
    }
  };
}
