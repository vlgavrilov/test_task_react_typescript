import {
  put, takeEvery, all, select,
} from 'redux-saga/effects';
import mockData from '../helpers/mockData';
import {
  CHANGE_BONUS, POST_ACTIVATE_BONUS, POST_FILTER_BONUS, SAVE_DATA,
} from '../data/actionTypes';
import {
  ICard, IActivateBonus, IServerResponse, IFilterBonus,
} from '../Interface';

const delay = (ms:number) => new Promise((res) => setTimeout(res, ms));
export const getBonuses = (state:IServerResponse):ICard[] => state.bonuses;

function* downloadData() {
  yield delay(1000);
  yield put({
    type: SAVE_DATA,
    payload: mockData,
  });
}
function* activateBonus(action:IActivateBonus) {
  yield delay(1000);
  const data = yield select(getBonuses);
  // const newData = data.find((item) => item.id === action.id);
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
  yield delay(500);
  const newData = mockData.bonuses.filter((item:ICard) => (item.title.indexOf(action.value) + 1)
    || (item.description.indexOf(action.value) + 1)
    || (item.link.indexOf(action.value) + 1));
  yield put({
    type: CHANGE_BONUS,
    payload: newData,
  });
}
export function* watchActivateBonus() {
  yield takeEvery(POST_ACTIVATE_BONUS, activateBonus);
}
export function* watchFilterBonus() {
  yield takeEvery(POST_FILTER_BONUS, filterBonus);
}

export default function* rootSaga() {
  yield all([
    watchFilterBonus(),
    watchActivateBonus(),
    downloadData(),
  ]);
}
