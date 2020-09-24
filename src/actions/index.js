import axios from 'axios';
import { getItemFromLocalStorage } from 'utils';

export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

export const GET_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEM_SUCCESS';
export const GET_ITEMS_FAILURE = 'GET_ITEM_FAILURE';

export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE';

export const DELETE_ALLITEMS = 'DELETE_ALLITEMS';

export const UPDATE_ITEM_REQUEST = 'UPDATE_ITEM_REQUEST';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const UPDATE_ITEM_FAILURE = 'UPDATE_ITEM_FAILURE';

export const SHOW_NEW_ITEM_BAR = 'SHOW_NEW_ITEM_BAR';
export const HIDE_NEW_ITEM_BAR = 'HIDE_NEW_ITEM_BAR';

const JWT_TOKEN = getItemFromLocalStorage('token');

export const getItems = (itemType) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`https://pacific-mesa-94829.herokuapp.com/${itemType}`, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      dispatch({
        type: GET_ITEMS_SUCCESS,
        payload: {
          itemType,
          data,
        },
      });
    } catch (err) {
      const status = err.response;
      dispatch({
        type: GET_ITEMS_FAILURE,
        payload: status,
      });
    }
  };
};

export const addItem = (values, itemType) => {
  const { note_file, note_title, note_content, favoriteNote } = values;
  return async (dispatch) => {
    dispatch({ type: ADD_ITEM_REQUEST });
    try {
      const formData = new FormData();

      const dataObj = {
        note_title,
        note_content,
        favoriteNote,
      };

      if (note_file) {
        formData.append(`files.note_file`, note_file, 'note_file');
        formData.append('data', JSON.stringify(dataObj));
      }
      const dataUpload = note_file ? formData : dataObj;

      const { data } = await axios.post(
        `https://pacific-mesa-94829.herokuapp.com/${itemType}`,
        dataUpload,
        {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        },
      );

      dispatch({
        type: ADD_ITEM_SUCCESS,
        payload: {
          itemType,
          data,
        },
      });
    } catch (err) {
      const status = err.response;
      dispatch({
        type: ADD_ITEM_FAILURE,
        payload: status,
      });
    }
  };
};

export const deleteItem = (itemType, id) => {
  return async (dispatch, getState) => {
    const currentData = getState().data[itemType];

    try {
      await axios.delete(`https://pacific-mesa-94829.herokuapp.com/${itemType}/${id}`, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      dispatch({
        type: DELETE_ITEM_SUCCESS,
        payload: {
          itemType,
          data: currentData.filter((item) => item.id !== id),
        },
      });
    } catch (err) {
      const status = err.response;
      dispatch({
        type: DELETE_ITEM_FAILURE,
        payload: status,
      });
    }
  };
};

export const updateItem = (itemType, id, value) => {
  return async (dispatch, getState) => {
    const currentData = getState().data[itemType];
    try {
      const { data } = await axios.put(
        `https://pacific-mesa-94829.herokuapp.com/${itemType}/${id}`,
        value,
        {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        },
      );

      currentData.forEach((item, index) => {
        if (item.id === id) {
          currentData[index] = data;
        }
      });
      dispatch({
        type: UPDATE_ITEM_SUCCESS,
        payload: {
          itemType,
          data: currentData,
        },
      });
    } catch (err) {
      const status = err.response;
      dispatch({
        type: UPDATE_ITEM_FAILURE,
        payload: status,
      });
    }
  };
};

export const deleteAllItems = () => ({ type: DELETE_ALLITEMS });
