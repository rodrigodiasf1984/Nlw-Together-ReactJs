/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes } from 'react';
import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
  logoutButton?: boolean;
};

export function Button({
  isOutlined = false,
  logoutButton = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button ${isOutlined ? 'outlined' : ''} ${
        logoutButton ? 'logout-button' : ''
      } `}
      {...props}
    />
  );
}
