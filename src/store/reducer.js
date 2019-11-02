import * as actionTypes from './actionTypes';

const initState = {
  transList: [],
  filteredList: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_LIST: {
      return {
        ...state,
        transList: action.transList,
      };
    }
    case actionTypes.FILTER_LIST: {
      return {
        ...state,
        filteredList: action.filteredList,
      };
    }
    default: return (state);
  }
};

export default reducer;
