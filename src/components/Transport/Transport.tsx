import React from 'react';
import style from './Transport.module.scss';
import downArrow from './downArrow.svg';

interface Props {
  label: string;
  onClick: () => void;
  name: string;
}

const Transport = (props: Props): JSX.Element => {
  const {
    label,
    onClick,
    name,
  } = props;

  return (
    <>
      <div className={style.label}>{label}</div>
      <div className={style.transportSelect} onClick={onClick}>
        {name}
        <img src={downArrow} className={style.downArrow} alt={'Arrow down'}/>
      </div>
    </>
  );
};

export default Transport;
