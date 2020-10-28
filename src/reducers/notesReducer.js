import {
  GET_ITEMS_SUCCESS,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  DELETE_ITEM_SUCCESS,
  DELETE_ALLITEMS,
  UPDATE_ITEM_SUCCESS,
  SHOW_NEW_ITEM_BAR,
  HIDE_NEW_ITEM_BAR,
  SHOW_MODAL,
  HIDE_MODAL,
  UPDATE_ITEM_REQUEST,
} from 'actions';

const initState = {
  modal: {
    isShownModal: false,
    type: '',
    id: '',
  },
  isLoading: false,
  isShownNewItemBar: false,
  notes: [],
};

const notesReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [...action.payload.data],
      };
    case ADD_ITEM_REQUEST:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [...state[action.payload.itemType], action.payload.data],
        isLoading: !state.isLoading,
      };
    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [...action.payload.data],
      };
    case DELETE_ALLITEMS:
      return {
        ...state,
        notes: [],
      };
    case UPDATE_ITEM_REQUEST:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [...action.payload.data],
        isLoading: !state.isLoading,
      };
    case SHOW_NEW_ITEM_BAR:
      return {
        ...state,
        isShownNewItemBar: !state.isShownNewItemBar,
      };
    case HIDE_NEW_ITEM_BAR:
      return {
        ...state,
        isShownNewItemBar: !state.isShownNewItemBar,
      };
    case SHOW_MODAL:
      return {
        ...state,
        modal: {
          isShownModal: !state.modal.isShownModal,
          type: action.payload.typeModal,
          id: action.payload.id,
        },
      };
    case HIDE_MODAL:
      return {
        ...state,
        modal: {
          isShownModal: !state.modal.isShownModal,
          type: '',
          id: '',
        },
      };
    default:
      return state;
  }
};

export default notesReducer;
