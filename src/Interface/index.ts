export interface ICard {
  id: number
  title: string
  description: string
  promocode: string
  link: string
  isUsed: boolean
}
export interface IServerResponse {
  bonuses: ICard[];
  header: IHeader
}

export interface IHeader {
  balance: number
  next_payout: number
  currency: string
}

export interface ISaveData {
  type: string
  payload: IServerResponse
}
export interface IActivateBonus {
  type: string
  id: number
}
export interface IFilterBonus {
  type: string
  value: string
}
export interface ISaveBonus {
  type: string
  payload: ICard[]
}

export type SaveActionTypes = ISaveData | ISaveBonus;
