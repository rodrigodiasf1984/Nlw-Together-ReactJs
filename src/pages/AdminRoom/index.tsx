/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-useless-return */
// import { FormEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// import { useAuth } from 'hooks/useAuth';
import { useRoom } from 'hooks/useRoom';
import { database } from 'services/firebase';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';
import logoImage from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import './styles.scss';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

  async function handleDeleteQuestion(questionId: string) {
    // adicionar modalde confirmação para excluir pergunta
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      const resp = await database
        .ref(`rooms/${roomId}/questions/${questionId}`)
        .remove();
      if (resp) {
        toast.success('Pergunta removida com sucesso');
      }
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });
    toast.success('Sala encerrada com sucesso');
    history.push('/');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImage} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className="question-list">
          {questions.map(question => (
            <Question
              key={question.id}
              author={question.author}
              content={question.content}
            >
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}
