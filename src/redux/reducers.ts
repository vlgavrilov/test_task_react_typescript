import {
  IServerResponse, IState, ICard, ISaveData, ISaveBonus, ISaveIsLoading,
} from '../Interface';
import {
  BONUSES_LOADING, CHANGE_BONUS, SAVE_DATA,
} from './actionTypes';

const initialState: IState = {
  bonuses: [],
  header: {
    balance: 0,
    next_payout: 0,
    currency: '',
  },
  isBonusesLoading: true,
};

const dataReducer = (state = initialState, action:ISaveData | ISaveBonus | ISaveIsLoading)
:IState => {
  const { payload } = action;
  switch (action.type) {
    case CHANGE_BONUS: {
      return {
        ...state,
        bonuses: payload as ICard[],
        isBonusesLoading: false,
      };
    }
    case SAVE_DATA: {
      return {
        ...state,
        ...payload as IServerResponse,
        isBonusesLoading: false,
      };
    }
    case BONUSES_LOADING: {
      return {
        ...state,
        isBonusesLoading: payload as boolean,
      };
    }
    default:
      return state;
  }
};

export default dataReducer;
