import React from 'react';
import style from './Rate.module.scss';

interface Props {
  label: string;
  rate: string;
}

const Rate = (props: Props): JSX.Element => {
  const {
    label,
    rate,
  } = props;

  return (
    <div className={style.rateBlock}>
      <div className={style.rateText}>{label}&nbsp;</div>
      {rate}
    </div>
  );
};

export default Rate;
