import { Dispatch } from 'redux';
import { getRate } from 'api/rate';
import {
  RATE_REQUEST,
  RATE_SUCCESS,
  RATE_FAIL,
  RATE_DEFAULT,
} from 'constants/general';
import { IRate } from 'interfaces/general';

export function getExchangeRate(base: string, quote: string) {
  return async (dispatch: Dispatch) => {
    dispatch(requestRate(base));

    const data = await getRate(base, quote);

    if (!data) dispatch(failRate());
    else dispatch(successRate(data));
  };
}

function requestRate(data: string) {
  return {
    type: RATE_REQUEST,
    data
  };
}

function successRate(data: IRate) {
  return {
    type: RATE_SUCCESS,
    data,
  };
}

function failRate() {
  return {
    type: RATE_FAIL
  };
}

export function setDefaultRate() {
  return {
    type: RATE_DEFAULT
  };
}
