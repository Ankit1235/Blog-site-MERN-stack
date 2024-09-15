import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const LoginHook = () => {
    const navigate = useNavigate();
    const { Login } = useAuthContext();
    const LoginUser = async (data:any) => {
        try {
            const res = await fetch('http://localhost:3500/home/auth/login', {
                method : 'post',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(data)
            });
            const {token, userid } = await res.json();
            if(res.ok) {   
                Login(token, userid);
                navigate("/dashboard");
            }
         
        } catch (error) {
            console.log(error);
        }
    }

    

    return ({ LoginUser });
}