import { ReactNode, useContext, useEffect, useState } from "react"
import { createContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext<any>(null);
interface AuthContextProviderWrapperProps {
    children : ReactNode
}

export const AuthContextProvider = ({children} : AuthContextProviderWrapperProps) => {
   
    const [token, setToken] = useState<string|null>(null);
    const [user, setUser] = useState<any>(null);
    const [isUserAuthenticated, setUserAuthication] = useState<boolean>(false);
   

    useEffect(() => {
        const fetchUserData = async () => {
            try { 
                const userdata = localStorage.getItem('userData');
                if(userdata) {
                const parsedUserData = JSON.parse(userdata);
                const {usertoken, userData, isAuth} = parsedUserData;
                setToken(usertoken);
                setUser(userData);
                setUserAuthication(isAuth);
                console.log("useEffect", isAuth);
                
            }

            } catch (error) { console.error(error); }
           
        }

        fetchUserData();
    })


    const Login = (new_token : string, newData: any)=> {

        if(new_token != "" && newData !="")
        {
            console.log(new_token, newData);
            localStorage.setItem('userData', JSON.stringify({user_token : new_token, user_id: newData, isAuth : true}));
            setToken(new_token);
            setUser(newData);
            setUserAuthication(true);
            console.log("Login funtion", isUserAuthenticated);
        }
       
        
    }

    const Logout = () => {

        localStorage.removeItem('userData');
        setToken(null);
        setUser(null);
        setUserAuthication(false);
      
        
    }

    return ( <AuthContext.Provider value={{token, user, isUserAuthenticated, Login, Logout}} > {children} </AuthContext.Provider> )
}

export const useAuthContext = () =>  useContext(AuthContext);


