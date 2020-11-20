import {
  IServerResponse, IState, SaveActionTypes,
} from '../Interface';
import {
  BONUSES_LOADING, CHANGE_BONUS, HEADER_LOADING, SAVE_DATA,
} from './actionTypes';

const initialState: IState = {
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
  isBonusesLoading: true,
  isHeaderLoading: true,
};

const dataReducer = (state = initialState, action:SaveActionTypes):IState => {
  const { payload } = action;
  switch (action.type) {
    case CHANGE_BONUS: {
      return {
        ...state,
        bonuses: [
          ...payload,
        ],
        isBonusesLoading: false,
      };
    }
    case SAVE_DATA: {
      return {
        ...state,
        ...payload as IServerResponse,
        isBonusesLoading: false,
        isHeaderLoading: false,
      };
    }
    case BONUSES_LOADING: {
      return {
        ...state,
        isBonusesLoading: payload as boolean,
      };
    }
    case HEADER_LOADING: {
      return {
        ...state,
        isHeaderLoading: payload as boolean,
      };
    }
    default:
      return state;
  }
};

export default dataReducer;
