/* eslint-disable no-console */
import { Button } from 'components/Button';
import { useAuth } from 'hooks/useAuth';
import { useHistory } from 'react-router-dom';

import './styles.scss';

type UserInfoLogin = {
  layoutDirection: 'col' | 'row';
};

export function UserInfoLogin({ layoutDirection }: UserInfoLogin) {
  const { signOut, user } = useAuth();
  const history = useHistory();

  async function handleSignOut() {
    await signOut();
    history.push('/');
  }

  return (
    <>
      <div className={`user-info ${layoutDirection === 'row' ? 'row' : ''}`}>
        <span>{user.name}</span>
        <img className="user-avatar" src={user.avatar} alt={user.name} />
      </div>
      <Button logoutButton type="button" onClick={handleSignOut}>
        Sign out
      </Button>
    </>
  );
}
