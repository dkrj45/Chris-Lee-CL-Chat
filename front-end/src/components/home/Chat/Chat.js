import './Chat.scss';
import back from '../../../assets/icons/back.png'

function Chat({ activeFriend, onReturn }) {

  return activeFriend ? (
    <div className='chat'>
      <div className='chat__top'>
        <button className='chat__back-button' onClick={onReturn}><img src={back} alt="back" /></button>
        <h1 className='chat__name'>{activeFriend.username}</h1>
      </div>
    </div>
  ) : (
    <div className='chat__none'>
      <h1 className='chat__none-text'>Welcome to CL Chat! Start a conversation by clicking on an existing friend or add a new friend to your list.<br />{"(Try adding 'Chris Lee')"}</h1>
    </div>
  );
}

export default Chat;