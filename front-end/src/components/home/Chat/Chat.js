import './Chat.scss';
import back from '../../../assets/icons/back.png'
import socket from '../../../socket';
import { useContext } from 'react';
import { MessagesContext } from '../../../pages/HomePage/HomePage';

function Chat({ activeFriend, onReturn }) {
  const { messages, setMessages } = useContext(MessagesContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {to: activeFriend.userid, from: null, content: e.target.message.value};
    socket.emit("dm", message);
    setMessages(prevMsgs => [message, ...prevMsgs])
    e.target.reset();
  }

  return activeFriend ? (
    <div className='chat'>
      <div className='chat__top'>
        <button className='chat__back-button' onClick={onReturn}><img src={back} alt="back" /></button>
        <h1 className='chat__name'>{activeFriend.username}</h1>
      </div>
      <div className='chat__messages'>
        {messages.filter(msg => msg.to === activeFriend.userid || msg.from === activeFriend.userid).map(
          (message) => (
            message.to === activeFriend.userid?
              <p className='chat__message--me'>{message.content}</p>
            : <p className='chat__message'>{message.content}</p>
          )
        )}
      </div>
      <form className='chat__form' onSubmit={handleSubmit}>
        <div className='chat__form-container'>
          <label><input className='chat__form-message' type='text' name='message' placeholder='Type your message here!'></input></label>
          <button className='chat__form-button'>Send</button>
        </div>
      </form>
    </div>
  ) : (
    <div className='chat__none'>
      <h1 className='chat__none-text'>Welcome to CL Chat! Start a conversation by clicking on an existing friend or add a new friend to your list.<br />{"(Try adding 'Chris Lee')"}</h1>
    </div>
  );
}

export default Chat;