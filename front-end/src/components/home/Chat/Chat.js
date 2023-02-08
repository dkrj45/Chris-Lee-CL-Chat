import { useContext } from 'react';
import { FriendContext } from '../../../pages/HomePage/HomePage';
import './Chat.scss';

function Chat() {

  const {friends} = useContext(FriendContext);

    return friends.length>0?(
      <div className='chat'>
        <h1 className='chat__name'>Name</h1>
      </div>
    ) : (
      <div className='chat__none'>
        <h1 className='chat__none-text'>Welcome to CL Chat! Start a conversation by adding friends to your list.<br/>{"(Try adding 'Chris Lee')"}</h1>
      </div>
    );
  }
  
  export default Chat;