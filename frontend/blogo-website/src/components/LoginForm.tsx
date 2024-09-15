import { useState } from "react"
import { LoginHook } from "../hook/LoginHook";
import { useNavigate } from "react-router-dom";
import './loginForm.css';

const LoginForm = () => {

    const { LoginUser } = LoginHook();
    const [formData, setData] = useState({
        email : "",
        password : ""
    });

    const handleChange = (e:any) => {
        const {name, value} = e.target;
        setData({...formData, [name] : value});
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        LoginUser(formData);
     
          
    }
    return (
        <div className="MainContainer">
            <form onSubmit={handleSubmit} method="post" className="LoginForm">

                <input type="email" placeholder="Email" name="email" id="email-input" value={formData.email} onChange={handleChange} />
                <input type="password"  placeholder="Password" name="password" id="password-input" value={formData.password} onChange={handleChange} />

                <button type="submit" id="submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default LoginForm;