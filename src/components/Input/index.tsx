/* eslint-disable no-param-reassign */
import { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import './styles.scss';

interface Props {
  name: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

export default function CustomInput({ name, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error, clearError } =
    useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: ref => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <div className="container">
      <input
        name={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        className="inputForm"
        onChange={() => clearError()}
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
