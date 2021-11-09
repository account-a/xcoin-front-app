export interface IRate {
  [currency: string]: number;
}

export interface IRateStore {
  loading: boolean;
  rate: IRate;
  error: boolean;
}

export type TList = 0 | 1 | 2;

export type TError = '' | 'serverError' | 'exceedsBalance';

export interface IError {
  type: TError,
  start?: string,
  end?: string,
}

