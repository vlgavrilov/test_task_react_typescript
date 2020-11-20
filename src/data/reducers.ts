import { IServerResponse, SaveActionTypes } from '../Interface';
import { CHANGE_BONUS, SAVE_DATA } from './actionTypes';

const initialState: IServerResponse = {
  bonuses: [{
    id: 0,
    title: 'Title',
    description: 'Description',
    link: '',
    promocode: '',
    isUsed: false,
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
    case CHANGE_BONUS: {
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
