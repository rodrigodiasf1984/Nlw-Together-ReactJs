/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useHistory } from 'react-router-dom';
import { ReactNode } from 'react';
import logoImage from '../../assets/images/logo.svg';
import './styles.scss';

interface HeaderProps {
  children: ReactNode;
}

export function Header({ children }: HeaderProps) {
  const history = useHistory();

  function navigateToHome() {
    history.push('/');
  }

  return (
    <header>
      <div className="content">
        <a rel="noopener noreferrer" onClick={navigateToHome}>
          <img src={logoImage} alt="Letmeask" />
        </a>
        {children}
      </div>
    </header>
  );
}
