import axios from 'axios';
import qs from 'qs';
import { setItemToLocalStorage, sleep } from 'utils';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_SUCCESS';

export const LOGIN_USER_REQUEST = 'CREATE_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';
export const HIDE_LOADER = 'HIDE_LOADER';

export const hideLoader = () => ({ type: HIDE_LOADER });

export const logOutUser = () => {
  localStorage.removeItem('token');
  return {
    type: LOGOUT_USER,
    payload: {
      tokenJWT: null,
      user: {},
    },
  };
};

export const createUser = (userData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_USER_REQUEST });
    await sleep(2000);
    try {
      const {
        data: { jwt, user },
      } = await axios.post(
        'https://pacific-mesa-94829.herokuapp.com/auth/local/register',
        qs.stringify(userData),
      );

      setItemToLocalStorage('token', jwt);

      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: {
          tokenJWT: jwt,
          user,
        },
      });
    } catch (error) {
      const { status, statusText } = error;
      dispatch({
        type: CREATE_USER_FAILURE,
        payload: {
          errorID: status,
          errorMsg: statusText,
        },
      });
    }
  };
};

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST });
    await sleep(1000);
    try {
      const {
        data: { jwt, user },
      } = await axios.post(
        `https://pacific-mesa-94829.herokuapp.com/auth/local`,
        qs.stringify({
          identifier: email,
          password,
        }),
      );

      await setItemToLocalStorage('token', jwt);

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          tokenJWT: jwt,
          user,
        },
      });
    } catch (error) {
      const { status, statusText } = error;

      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: {
          status,
          statusText,
        },
      });
    }
  };
};
