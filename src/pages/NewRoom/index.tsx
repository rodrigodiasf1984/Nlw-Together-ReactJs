/* eslint-disable no-useless-return */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { database } from 'services/firebase';
import { Button } from '../../components/Button';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import './styles.scss';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });
    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente?{' '}
            <Link to="/" rel="noopener noreferrer ">
              clique aqui
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
