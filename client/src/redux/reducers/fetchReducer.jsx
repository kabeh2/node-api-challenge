import { actionTypes } from "../actions";

const initialState = {
  loading: false,
  projects: [],
  error: ""
};

const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: ""
      };
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload
      };
    case actionTypes.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default fetchReducer;
