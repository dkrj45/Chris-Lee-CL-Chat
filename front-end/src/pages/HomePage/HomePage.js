import "./HomePage.scss";
import FriendsList from "../../components/home/FriendsList/FriendsList";
import Chat from "../../components/home/Chat/Chat";
import { useState, useEffect, createContext } from "react";
import useSocketSetup from "../../components/home/useSocketSetup";

export const FriendContext = createContext();
export const MessagesContext = createContext();

function HomePage() {
  const [friends, setFriends] = useState([]);

  const [width, setWidth] = useState(window.innerWidth);
  const [activeFriend, setActiveFriend] = useState(null);
  const [toggleChat, setToggleChat] = useState(false);
  const [messages, setMessages] = useState([]);

  function onFriendClicked(friend) {
    setActiveFriend(friend);
    setToggleChat(true);
  }

  const onReturn = () => {
    setToggleChat(false);
    setActiveFriend(null);
  };

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useSocketSetup(setFriends, setMessages);

  return (
    <FriendContext.Provider value={{ friends, setFriends }}>
      <div className="homepage">
        <MessagesContext.Provider value={{ messages, setMessages }}>
          {width < 768 && toggleChat ? (
            <Chat onReturn={onReturn} activeFriend={activeFriend} />
          ) : (
            <FriendsList onFriendClicked={onFriendClicked} />
          )}
          {width >= 768 ? (
            <Chat onReturn={onReturn} activeFriend={activeFriend} />
          ) : (
            ""
          )}
        </MessagesContext.Provider>
      </div>
    </FriendContext.Provider>
  );
}

export default HomePage;
