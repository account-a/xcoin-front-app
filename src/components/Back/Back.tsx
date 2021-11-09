import React from 'react';
import arrowBack from './arrowBack.svg';
import style from './Back.module.scss';

interface Props {
  label: string;
  onClick: () => void;
}

const Back = (props: Props): JSX.Element => {
  const {
    label,
    onClick,
  } = props;

  return (
    <div className={style.listTitle}>
      <img src={arrowBack} className={style.arrowBack} onClick={onClick} alt={'Arrow Back'}/>
      {label}
    </div>
  );
};

export default Back;
