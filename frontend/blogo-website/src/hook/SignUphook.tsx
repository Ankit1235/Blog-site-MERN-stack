import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const SignUpHook = () => {

    const { Login } = useAuthContext();
    const navigate = useNavigate();
    
    const register = async (data : any) => {

        try {
            const res = await fetch('http://localhost:3500/home/auth/signup', {
            method : 'POST',
            headers : {
            'Content-type' : 'application/json'
            },

            body : JSON.stringify(data)
        });

        const result = await res.json();
        if(result.ok) {
            const { token, userid } = result;   
            Login(token, userid);
            navigate("/dashboard");
        }
        console.log(result);
        } catch (error) { console.error(error); }
  
    }; 
    
    
    return { register }
}





