/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from 'components/Button';
import { Link } from 'react-router-dom';
// import { useAuth } from 'hooks/useAuth';
import illustrationImg from '../assets/images/illustration.svg';
import '../styles/auth.scss';
import logoImg from '../assets/images/logo.svg';

export function NewRoom() {
  // const { user } = useAuth();
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
          <form>
            <input type="text" placeholder="Nome da sala" />
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
