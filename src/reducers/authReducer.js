import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  HIDE_LOADER,
} from 'actions/authActions';

const initialState = {
  tokenJWT: null,
  isShownLoader: false,
  isSubmitting: false,
  user: {},
  error: {
    status: '',
    statusText: '',
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
          status: action.payload.status,
          statusText: action.payload.statusText,
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
          status: action.payload.status,
          statusText: action.payload.statusText,
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
    default:
      return state;
  }
};

export default authReducer;
