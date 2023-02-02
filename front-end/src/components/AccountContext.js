import { useNavigate } from "react-router-dom";

const { createContext, useState, useEffect} = require("react");

export const AccountContext = createContext();

const UserContext = ({ children }) => {
    const URL = process.env.URL || "http://localhost:8080";
    const [user, setUser] = useState({ loggedIn: null });
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`${URL}/auth/login`, {
            credentials: "include"
        }).catch(err => {
            setUser({ loggedIn: false });
            return
        }).then(r => {
            if (!r || !r.ok || r.status >= 400) {
                setUser({ loggedIn: false });
                return;
            }
            return r.json();
        }).then(data => {
                if(!data){
                    setUser({ loggedIn: false });
                    return;
                }
                console.log(data)
                setUser({...data});
                navigate("/HomePage")
            })
    }, [])
    return (
        <AccountContext.Provider value={{ user, setUser }}>
            {children}
        </AccountContext.Provider>
    )
}

export default UserContext;