import React from 'react';
import { ChangeEvent } from 'react';
import cn from 'classnames';
import { normalizeLengthOnlyNumbers } from 'utils';
import { precision } from 'config';
import style from './SumInput.module.scss';

interface Props {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  onFocus?: () => void;
}

const SumInput = (props: Props): JSX.Element => {
  const {
    value,
    onChange,
    disabled,
    onFocus,
  } = props;

  const onNativeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const targetValue: string = event.target.value;
    const val = (targetValue === '' || normalizeLengthOnlyNumbers(0, 12, precision)(targetValue)) ? targetValue : value;
    onChange(val);
  };

  return (
    <input
      className={cn(style.input, { [style.disabled]: disabled })}
      value={value}
      onChange={onNativeChange}
      disabled={disabled}
      placeholder={'0.00'}
      onFocus={onFocus}
    />
  );
};

export default SumInput;
