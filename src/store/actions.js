import instance from '../axios-instance';
import * as actionTypes from './actionTypes';

const updateList = (newList) => ({
  type: actionTypes.UPDATE_LIST,
  transList: newList,
});

export const fetchList = () => (dispatch) => {
  instance
    .get('transactions')
    .then((res) => {
      dispatch(updateList(res.data));
    })
    .catch((err) => console.log(err));
};
