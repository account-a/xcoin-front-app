import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect';
import { currencyList, balanceList, precision } from 'config';
import { IRate, TList, IError } from 'interfaces/general';
import { IStore } from 'interfaces/store.interface';
import FormUI from 'components/FormUI';
import { useTime } from 'hooks/general';
import { getExchangeRate, setDefaultRate } from 'actions/rate';
import { getNewFocus } from 'utils';

const Form = (): JSX.Element => {
  
  const rateError: boolean = useSelector((store: IStore) => store.rate.error);
  const exchangeRate: number | null = useSelector(rateSelector);
  const dispatch = useDispatch();
  
  const time = useTime();
  const [firstCurrencyIndex, setFirstCurrencyIndex] = useState(0);
  const [secondCurrencyIndex, setSecondCurrencyIndex] = useState(1);
  const [rateUI, setRateUI] = useState('-');
  const [firstSum, setFirstSum] = useState('');
  const [secondSum, setSecondSum] = useState('');
  const [focusSum, setFocusSum] = useState(0);
  const [balance, setBalance] = useState<IRate>(balanceList);
  const [error, setError] = useState<IError>({ type:'' });
  const [listOpen, setListOpen] = useState<TList>(0);
  const [listOpenIndex, setListOpenIndex] = useState(firstCurrencyIndex);
  const [inSwap, setInSwap] = useState(false);
  
  useEffect(() => {
    if (!currencyList.length) return;
    const base = currencyList[firstCurrencyIndex];
    const quote = currencyList[secondCurrencyIndex];
    dispatch(getExchangeRate(base, quote));
  }, [firstCurrencyIndex, secondCurrencyIndex, dispatch]);

  useEffect(() => {
    if (!exchangeRate) {
      setRateUI('-');
      return;
    }
    const currencyFrom = currencyList[firstCurrencyIndex];
    const currencyTo = currencyList[secondCurrencyIndex];
    const val = `1 ${currencyFrom} ≈ ${exchangeRate} ${currencyTo}`;
    setRateUI(val);
  }, [exchangeRate, firstCurrencyIndex, secondCurrencyIndex]);

  useEffect(() => {
    if (firstSum && focusSum === 1 && exchangeRate && !inSwap) {
      const sum = Number(firstSum);
      const val = Number(sum * exchangeRate).toFixed(precision);
      setSecondSum(val);
    }
  }, [firstSum, exchangeRate, focusSum, inSwap]);

  useEffect(() => {
    if (secondSum && focusSum === 2 && exchangeRate && !inSwap) {
      const sum = Number(secondSum);
      const val = Number(sum / exchangeRate).toFixed(precision);
      setFirstSum(val);
    }
  }, [secondSum, exchangeRate, focusSum, inSwap]);
  
  useEffect(() => {
    if (listOpen) {
      if (listOpen === 1) setListOpenIndex(firstCurrencyIndex);
      else if (listOpen === 2) setListOpenIndex(secondCurrencyIndex);
    }
  }, [listOpen, firstCurrencyIndex, secondCurrencyIndex]);
  
  useEffect(() => {
    if (exchangeRate && inSwap) {
      setInSwap(false);
    }
  }, [exchangeRate, inSwap]);


  useEffect(() => {
    const e: IError = {type: ''};
    if (firstSum) {
      const sum = Number(firstSum);
      const currency = currencyList[firstCurrencyIndex]
      const reserve = balance[currency];
      if(sum > reserve) {
        e.type = 'exceedsBalance';
        e.end = `(${currency})`
      }
    }
    if (rateError) {
      e.type = 'serverError';
    }
    setError(e);
  }, [rateError, firstSum, firstCurrencyIndex, balance]);
  
  const onExchange  = useCallback(() => {
    const firstCurrency = currencyList[firstCurrencyIndex];
    const secondCurrency = currencyList[secondCurrencyIndex];
    const firstBalance = balance[firstCurrency];
    const secondBalance = balance[secondCurrency];
    const newFirstBalance =  Number(Number(firstBalance - Number(firstSum)).toFixed(precision));
    const newSecondBalance =  Number(Number(secondBalance + Number(secondSum)).toFixed(precision));
    const newBalance = {...balance};
    newBalance[firstCurrency] = newFirstBalance;
    newBalance[secondCurrency] = newSecondBalance;
    setBalance(newBalance);
    setFirstSum('');
    setSecondSum('');
  }, [firstCurrencyIndex, secondCurrencyIndex, firstSum, secondSum, balance]);
  
  const listHandler = useCallback((index: number) => {
    if (listOpen === 1) setFirstCurrencyIndex(index);
    else if (listOpen === 2) setSecondCurrencyIndex(index);
    setListOpen(0);
  }, [listOpen]);
  
  const swapTransport = useCallback(() => {
    const firstI = firstCurrencyIndex;
    const secondI = secondCurrencyIndex;
    const newFocus = getNewFocus(focusSum);
    let newFirstSum = '';
    let newSecondSum = '';
    dispatch(setDefaultRate);
    if (newFocus === 1) {
      newFirstSum = secondSum;
    } else if (newFocus === 2) {
      newSecondSum = firstSum;
    }
    setInSwap(true);
    setFirstCurrencyIndex(secondI);
    setSecondCurrencyIndex(firstI);
    setFirstSum(newFirstSum);
    setSecondSum(newSecondSum);
    setFocusSum(newFocus);
  }, [firstCurrencyIndex, secondCurrencyIndex, focusSum, firstSum, secondSum, dispatch]);

  return (
    <FormUI
      time={time}
      currencyList={currencyList}
      firstCurrencyIndex={firstCurrencyIndex}
      secondCurrencyIndex={secondCurrencyIndex}
      setFirstCurrencyIndex={setFirstCurrencyIndex}
      setSecondCurrencyIndex={setSecondCurrencyIndex}
      firstSum={firstSum}
      secondSum={secondSum}
      setFirstSum={setFirstSum}
      setSecondSum={setSecondSum}
      swapTransport={swapTransport}
      setFocusSum={setFocusSum}
      rate={rateUI}
      error={error}
      balance={balance}
      onExchange={onExchange}
      listOpen={listOpen}
      setListOpen={setListOpen}
      listHandler={listHandler}
      listOpenIndex={listOpenIndex}
    />
  );
};

const rateSelector = createSelector(
  [
    (store: IStore) => store.rate.rate
  ],
  (rate: IRate) => {
    const keys = Object.keys(rate);
    if(keys.length === 0) return null;
    return rate[keys[0]];
  }
);

export default Form;
