import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  HIDE_LOADER,
  REMOVE_SERVER_ERROR,
} from 'actions/authActions';

const initialState = {
  tokenJWT: null,
  isShownLoader: false,
  isSubmitting: false,
  user: {},
  error: {
    statusCode: '',
    message: '',
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return { ...state, isSubmitting: true };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        tokenJWT: action.payload.tokenJWT,
        user: action.payload.user,
        isSubmitting: !state.isSubmitting,
        isShownLoader: !state.isShownLoader,
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        isSubmitting: !state.isSubmitting,
        error: {
          statusCode: action.payload.statusCode,
          message: action.payload.message,
        },
      };
    case LOGIN_USER_REQUEST:
      return { ...state, isSubmitting: true };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        tokenJWT: action.payload.tokenJWT,
        user: action.payload.user,
        isSubmitting: !state.isSubmitting,
        isShownLoader: !state.isShownLoader,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isSubmitting: !state.isSubmitting,
        error: {
          statusCode: action.payload.statusCode,
          message: action.payload.message,
        },
      };
    case LOGOUT_USER:
      return {
        ...state,
        tokenJWT: action.payload.tokenJWT,
        user: action.payload.user,
        isShownLoader: true,
      };
    case HIDE_LOADER: {
      return {
        ...state,
        isShownLoader: !state.isShownLoader,
      };
    }
    case REMOVE_SERVER_ERROR: {
      return {
        ...state,
        error: {
          statusCode: action.payload.statusCode,
          message: action.payload.message,
        },
      };
    }
    default:
      return state;
  }
};

export default authReducer;
