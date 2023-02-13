import { useContext, useEffect } from "react"
import socket from "../../socket"
import { AccountContext } from "../AccountContext";

const useSocketSetup = (setFriends) => {
    const {setUser} = useContext(AccountContext)
    useEffect(()=>{
        socket.connect();
        socket.on("friends", friendsList => {
            setFriends(friendsList)
        })
        socket.on("connect_error", ()=>{
            setUser({loggedIn: false})
        })
        return () => {
            socket.off("connect_error")
        }
    },[setUser])
};

export default useSocketSetup;