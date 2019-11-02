import * as actionTypes from './actionTypes';

const initState = {
  transList: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_LIST: {
      return {
        ...state,
        transList: action.transList,
      };
    }
    default: return (state);
  }
};

export default reducer;
