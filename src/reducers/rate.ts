import { AnyAction } from 'redux';
import { IRateStore } from 'interfaces/general';
import {
  RATE_REQUEST,
  RATE_SUCCESS,
  RATE_FAIL,
  RATE_DEFAULT,
} from 'constants/general';

const defaultStore: IRateStore = {
  loading: false,
  rate: {},
  error: false,
};

export function rate(store = defaultStore, action: AnyAction) {
  switch (action.type) {
    case RATE_REQUEST:
      return {
        ...store,
        loading: true,
        rate: {},
        error: false,
      };

    case RATE_SUCCESS:
      return {
        ...store,
        loading: false,
        rate: action.data,
      };

    case RATE_FAIL:
      return {
        ...store,
        loading: false,
        error: true,
      };

    case RATE_DEFAULT:
      return {
        ...defaultStore,
      };

    default:
      return defaultStore;
  }
}