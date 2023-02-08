import './HomePage.scss'
import FriendsList from '../../components/home/FriendsList/FriendsList';
import Chat from '../../components/home/Chat/Chat';
import { useState, useEffect, createContext } from 'react';

export const FriendContext = createContext();

function HomePage() {

  const [friends, setFriends] = useState([
    {username: "Jenny McCarthy", connected: true},
    {username: "Christine Choi", connected: false},
    {username: "Henna Bean", connected: false}
  ]);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", () => { setWidth(window.innerWidth) })
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [])

  return (
    <FriendContext.Provider value={{friends, setFriends}}>
      <div className='homepage'>
        <FriendsList />
        {width > 768 ? <Chat /> : ''}
      </div>
    </FriendContext.Provider>
  );
}

export default HomePage;