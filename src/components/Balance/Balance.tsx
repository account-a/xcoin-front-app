import React from 'react';
import style from './Balance.module.scss';

interface Props {
  label: string;
  value: string | number;
}

const Balance = (props: Props): JSX.Element => {
  const {
    label,
    value,
  } = props;

  return (
    <div className={style.balanceBlock}>
      <span className={style.balanceText}>{label}&nbsp;</span>
      {value}
    </div>
  );
};

export default Balance;
