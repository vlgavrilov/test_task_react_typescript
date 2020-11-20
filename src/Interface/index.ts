export interface ICard {
  title: string;
  description: string;
  promocode: string;
  link: string;
}
export interface IServerResponse {
  bonuses: ICard[];
  header: IHeader
}

export interface IHeader {
  balance: number,
  next_payout: number,
  currency: string,
}

export interface ISaveData {
  type: string,
  payload: IServerResponse,
}
export interface ISaveBonus {
  type: string,
  payload: ICard[],
}

export type SaveActionTypes = ISaveData | ISaveBonus;
