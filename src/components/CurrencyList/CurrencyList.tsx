import React from 'react';
import cn from 'classnames';
import { imgResourceUrl } from 'config';
import style from './CurrencyList.module.scss';

interface Props {
  list: string[];
  listOpenIndex: number;
  onClick: (i: number) => void;
}

const CurrencyList = (props: Props): JSX.Element => {
  const {
    list,
    listOpenIndex,
    onClick,
  } = props;

  return (
    <div className={style.list}>
      {list.map((item, i) =>
        <div
          className={cn(style.listItem, { [style.activeItem]: i === listOpenIndex })}
          key={item}
          onClick={() => onClick(i)}
        >
          <img
            src={`${imgResourceUrl}${item.toLowerCase()}.png`}
            className={style.listItemIcon}
            alt={`${item} currency`}
          />
          <div className={style.listItemText}>{item}</div>
        </div>
      )}
    </div>
  );
};

export default CurrencyList;
