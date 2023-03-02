import "./HomePage.scss";
import FriendsList from "../../components/home/FriendsList/FriendsList";
import Chat from "../../components/home/Chat/Chat";
import { useState, useEffect, createContext, useContext } from "react";
import useSocketSetup from "../../components/home/useSocketSetup";
import socketConn from "../../socket";
import { AccountContext } from "../../components/AccountContext";

export const FriendContext = createContext();
export const MessagesContext = createContext();
export const SocketContext = createContext();

function HomePage() {
  const [friends, setFriends] = useState([]);

  const { user } = useContext(AccountContext);
  const [socket, setSocket] = useState(() => socketConn(user));

  const [width, setWidth] = useState(window.innerWidth);
  const [activeFriend, setActiveFriend] = useState(null);
  const [toggleChat, setToggleChat] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setSocket(() => socketConn(user));
  }, [user]);

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

  useSocketSetup(setFriends, setMessages, socket);

  return (
    <FriendContext.Provider value={{ friends, setFriends }}>
      <SocketContext.Provider value={{ socket }}>
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
      </SocketContext.Provider>
    </FriendContext.Provider>
  );
}

export default HomePage;
