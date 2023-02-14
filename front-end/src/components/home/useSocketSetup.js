import { useContext, useEffect } from "react"
import socket from "../../socket"
import { AccountContext } from "../AccountContext";

const useSocketSetup = (setFriends, setMessages) => {
    const {setUser} = useContext(AccountContext)
    useEffect(()=>{
        socket.connect();
        socket.on("friends", friendsList => {
            setFriends(friendsList)
        })
        socket.on("messages", messages => {
            setMessages(messages)
        })
        socket.on("connected", (status, username) => {
            setFriends(prevFriends => {
                return [...prevFriends].map(friend => {
                    if(friend.username === username){
                        friend.connected = status;
                    }
                    return friend;
                })
            })
        })
        socket.on("connect_error", ()=>{
            setUser({loggedIn: false})
        })
        return () => {
            socket.off("connect_error");
            socket.off("connected");
            socket.off("friends");
            socket.off("messages");
        }
    },[setUser, setFriends, setMessages])
};

export default useSocketSetup;