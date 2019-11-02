import instance from '../axios-instance';
import * as actionTypes from './actionTypes';

export const updateList = (newList) => ({
  type: actionTypes.UPDATE_LIST,
  transList: newList,
});

export const filterList = (newList) => ({
  type: actionTypes.FILTER_LIST,
  filteredList: newList,
});

export const fetchList = () => (dispatch) => {
  instance
    .get('transactions')
    .then((res) => {
      dispatch(updateList(res.data));
    })
    .catch((err) => console.log(err));
};
