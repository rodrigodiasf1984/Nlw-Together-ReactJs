/* eslint-disable no-alert */
/* eslint-disable no-useless-return */
/* eslint-disable no-console */

import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { database } from 'services/firebase';
import { toast } from 'react-toastify';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from 'components/Input';
import * as Yup from 'yup';
import { UserInfoLogin } from 'components/UserInfoLogin';
import getValidationErrors from 'utils/getValidationErrors';
import { Button } from '../../components/Button';
import illustrationImg from '../../assets/images/illustration.svg';
import googleIconImg from '../../assets/images/google-icon.svg';
import logoImg from '../../assets/images/logo.svg';
import './styles.scss';
import { homeFormSchema } from './homeFormSchemaValidation';

type FormData = {
  roomcode: string;
};
export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const formRef = useRef<FormHandles>(null);

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push('/rooms/new');
  }

  async function handleJoinRoom(formData: FormData) {
    let roomRef = null;
    const { roomcode } = formData;
    try {
      formRef.current?.setErrors({});
      await homeFormSchema.validate(formData, { abortEarly: false });
      roomRef = await database.ref(`rooms/${roomcode}`).get();
      if (!roomRef.exists()) {
        toast.error('Esta sala não existe.');
        return;
      }
      if (roomRef.val().endedAt) {
        toast.error('Essa sala foi encerrada');
        return;
      }
      history.push(`/rooms/${roomcode}`);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
        return;
      }
    }
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
          {user ? (
            <>
              <UserInfoLogin layoutDirection="col" />
              <Button onClick={handleCreateRoom}>Criar uma sala</Button>
            </>
          ) : (
            <button
              type="button"
              className="create-room"
              onClick={handleCreateRoom}
            >
              <img src={googleIconImg} alt="Logo do Google" />
              Crie sua sala com o Google
            </button>
          )}

          <div className="separator">ou entre em uma sala</div>
          <Form onSubmit={handleJoinRoom} ref={formRef}>
            <Input
              name="roomcode"
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </Form>
        </div>
      </main>
    </div>
  );
}
