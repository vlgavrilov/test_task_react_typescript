import { CHANGE_BONUS, SAVE_DATA } from './actionTypes';
import {
  ICard, ISaveBonus, ISaveData, IServerResponse,
} from '../Interface';

export const actionSaveData = (data: IServerResponse):ISaveData => ({
  type: SAVE_DATA,
  payload: data,
});
export const actionSaveBonus = (data: ICard[]):ISaveBonus => ({
  type: CHANGE_BONUS,
  payload: data,
});
