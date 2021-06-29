/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-useless-return */
// import { FormEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// import { useAuth } from 'hooks/useAuth';
import { useRoom } from 'hooks/useRoom';
import { database } from 'services/firebase';
import { toast } from 'react-toastify';
import { RoomCode } from 'components/RoomCode';
import { Button } from 'components/Button';
import { Question } from '../../components/Question';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';
import { Header } from '../../components/Header';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const history = useHistory();

  async function handleDeleteQuestion(questionId: string) {
    // adicionar modal de confirmação para excluir pergunta
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      const resp = await database
        .ref(`rooms/${roomId}/questions/${questionId}`)
        .remove();
      if (resp) {
        toast.success('Pergunta removida com sucesso');
      }
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleCloseRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });
    toast.success('Sala encerrada com sucesso');
    history.push('/');
  }

  return (
    <div id="page-room">
      <Header>
        <div>
          <RoomCode code={roomId} />
          <Button isOutlined onClick={handleCloseRoom}>
            Encerrar sala
          </Button>
        </div>
      </Header>
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
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answerImg} alt="Dar destaque à pergunta" />
                  </button>
                </>
              )}
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
