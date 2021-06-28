import copyImg from '../../assets/images/copy.svg';
import './styles.scss';

type RoomCodeProps = {
  code: string;
};

export function RoomCode({ code }: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }
  return (
    <button
      onClick={copyRoomCodeToClipboard}
      type="button"
      className="room-code"
    >
      <div>
        <img src={copyImg} alt="Copy room code " />
      </div>
      <span>Sala #{code}</span>
    </button>
  );
}
