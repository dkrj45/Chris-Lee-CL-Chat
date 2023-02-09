import { useContext } from 'react';
import { FriendContext } from '../../../pages/HomePage/HomePage';
import './Chat.scss';

function Chat({activeFriend}) {

  const {friends} = useContext(FriendContext);

    return friends.length>0?(
      <div className='chat'>
        <h1 className='chat__name'>{activeFriend.username}</h1>
      </div>
    ) : (
      <div className='chat__none'>
        <h1 className='chat__none-text'>Welcome to CL Chat! Start a conversation by clicking on an existing friend or add a new friend to your list.<br/>{"(Try adding 'Chris Lee')"}</h1>
      </div>
    );
  }
  
  export default Chat;