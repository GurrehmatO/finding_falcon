import { UPDATE_TOKEN, UPDATE_TIME, CONFIRM_TRAVEL } from '../actions/index.actions';

const initialState = {
  time: 0,
  token: '',
  travel: {
    planet_names: [],
    vehicle_names: [],
  },
};

const globalState = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TIME:
      return {
        ...state,
        time: action.payload.time,
      };
    case UPDATE_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };
    case CONFIRM_TRAVEL:
      return {
        ...state,
        travel: action.payload.travel,
      };
    default:
      return state;
  }
};

export default globalState;
