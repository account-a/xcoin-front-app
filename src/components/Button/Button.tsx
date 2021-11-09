import React from 'react';
import cn from 'classnames';
import style from './Button.module.scss';

interface Props {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
  noPad?: boolean;
}

const Button = (props: Props): JSX.Element => {
  const {
    label,
    disabled,
    onClick,
    className,
    noPad,
  } = props;

  return (
    <div className={cn(style.button, className, {[style.disabled]: disabled, [style.noPad]: noPad})} onClick={disabled ? () => null : onClick} >
      {label}
    </div>
  );
};

export default Button;
