import React from 'react';
import cn from 'classnames';
import { IRate, TList, IError } from 'interfaces/general';
import Transport from '../Transport';
import SumInput from '../SumInput';
import Balance from '../Balance';
import CurrencyList from '../CurrencyList';
import Rate from '../Rate';
import Button from '../Button';
import Back from '../Back';
import arrowsSwap from './arrowsSwap.svg';
import { getLocale } from 'locales';
import style from './FormUI.module.scss';

interface Props {
  time: string;
  currencyList: string[];
  firstCurrencyIndex: number;
  secondCurrencyIndex: number;
  setFirstCurrencyIndex: (val: number) => void;
  setSecondCurrencyIndex: (val: number) => void;
  firstSum: string;
  secondSum: string;
  setFirstSum: (val: string) => void;
  setSecondSum: (val: string) => void;
  swapTransport: () => void;
  setFocusSum: (val: number) => void;
  rate: string;
  error: IError;
  balance: IRate;
  onExchange: () => void;
  listOpen: TList;
  setListOpen: (val: TList) => void;
  listHandler: (val: number) => void;
  listOpenIndex: number;
}

const FormUI = (props: Props): JSX.Element => {
  const {
    time,
    currencyList,
    firstCurrencyIndex,
    secondCurrencyIndex,
    firstSum,
    secondSum,
    setFirstSum,
    setSecondSum,
    swapTransport,
    setFocusSum,
    rate,
    error,
    balance,
    onExchange,
    listOpen,
    setListOpen,
    listHandler,
    listOpenIndex,
  } = props;
  
  const loc = getLocale('en');
  const nameFirst = currencyList[firstCurrencyIndex];
  const nameSecond = currencyList[secondCurrencyIndex];
  const firstBalance = balance[nameFirst];
  const secondBalance = balance[nameSecond];
  
  return (
    <div className={style.container}>
      <div className={style.eyebrow} />
      <div className={style.bar} />
      <div className={cn(style.content, { [style.bgLight]: listOpen === 0 })}>
        <div className={style.telTime}>{time}</div>
        {listOpen === 0 &&
        <>
          <Transport label={loc.give} onClick={() => setListOpen(1)} name={nameFirst} />
          <SumInput value={firstSum} onChange={setFirstSum} onFocus={() => setFocusSum(1)} />
          <Balance label={loc.balance} value={firstBalance}/>
          <div className={style.lightBlock}>
            <div className={style.swapButton} onClick={() => swapTransport()}>
              <img src={arrowsSwap} className={style.arrowsSwap} alt={'Swap arrow'}/>
            </div>
            <Transport label={loc.get} onClick={() => setListOpen(2)} name={nameSecond} />
            <SumInput value={secondSum} onChange={setSecondSum} onFocus={() => setFocusSum(2)} />
            <Balance label={loc.balance} value={secondBalance}/>
            <Rate label={loc.exchangeRate} rate={rate}/>
            <div className={style.buttonContainer}>
              {error.type &&
              <span className={style.rateError}>{`${loc[error.type]} ${error.end}`}</span>
              }
              <Button label={loc.exchange} onClick={onExchange} disabled={!(Number(firstSum) && Number(secondSum))} />
            </div>
          </div>
        </>
        }
        {listOpen !== 0 &&
        <>
          <Back label={listOpen === 1 ? loc.currencyGiveAway : loc.currencyReceive} onClick={() => setListOpen(0)} />
          <CurrencyList list={currencyList} listOpenIndex={listOpenIndex} onClick={listHandler}/>
        </>
        }
      </div>
    </div>
  );
};

export default FormUI;
