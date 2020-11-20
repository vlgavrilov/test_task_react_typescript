import { IServerResponse, SaveActionTypes } from '../Interface';
import { CHANGE_STATUS_BONUS, SAVE_DATA } from './actionTypes';

const initialState: IServerResponse = {
  bonuses: [{
    title: 'Title',
    description: 'Description',
    link: '',
    promocode: '',
  }],
  header: {
    balance: 0,
    next_payout: 0,
    currency: '',
  },
};

const dataReducer = (state = initialState, action:SaveActionTypes):IServerResponse => {
  const { payload } = action;
  switch (action.type) {
    case CHANGE_STATUS_BONUS: {
      return {
        ...state,
        bonuses: [
          ...payload,
        ],
      };
    }
    case SAVE_DATA: {
      return {
        ...payload as IServerResponse,
      };
    }
    default:
      return state;
  }
};

export default dataReducer;
