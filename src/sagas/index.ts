import {
  put, takeEvery, all, select, takeLatest,
} from 'redux-saga/effects';
import mockData from '../helpers/mockData';
import {
  BONUSES_LOADING,
  CHANGE_BONUS, POST_ACTIVATE_BONUS, POST_FILTER_BONUS, SAVE_DATA,
} from '../redux/actionTypes';
import {
  ICard, IActivateBonus, IFilterBonus, IState,
} from '../Interface';

const delay = (ms:number) => new Promise((res) => setTimeout(res, ms));
export const getBonuses = (state:IState):ICard[] => state.bonuses;

function* downloadData() {
  if (process.env.NODE_ENV !== 'test') {
    yield delay(500);
  }
  yield put({
    type: SAVE_DATA,
    payload: mockData,
  });
}
function* activateBonus(action:IActivateBonus) {
  if (process.env.NODE_ENV !== 'test') {
    yield delay(500);
  }
  const data = yield select(getBonuses);
  // const newData = redux.find((item) => item.id === action.id);
  const newData = data.map((item:ICard) => {
    if (item.id === action.id) {
      return { ...item, isUsed: true };
    }
    return item;
  });
  yield put({
    type: CHANGE_BONUS,
    payload: newData,
  });
}
function* filterBonus(action:IFilterBonus) {
  yield put({
    type: CHANGE_BONUS,
    payload: [],
  });
  yield put({
    type: BONUSES_LOADING,
    payload: true,
  });
  if (process.env.NODE_ENV !== 'test') {
    yield delay(500);
  }
  const newData = mockData.bonuses
    .filter((item:ICard) => (item.title.toLowerCase().indexOf(action.value.toLowerCase()) + 1));

  yield put({
    type: CHANGE_BONUS,
    payload: newData,
  });
  yield put({
    type: BONUSES_LOADING,
    payload: false,
  });
}
export function* watchActivateBonus() {
  yield takeEvery(POST_ACTIVATE_BONUS, activateBonus);
}
export function* watchFilterBonus() {
  yield takeLatest(POST_FILTER_BONUS, filterBonus);
}

export default function* rootSaga() {
  yield all([
    watchFilterBonus(),
    watchActivateBonus(),
    downloadData(),
  ]);
}
