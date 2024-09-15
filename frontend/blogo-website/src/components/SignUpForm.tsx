import React, { useState } from "react";
import { SignUpHook } from "../hook/SignUphook";
import './signupform.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name : "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const  { register }  = SignUpHook();

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e:any) => {
    e.preventDefault();
    // Validate form data and handle submission (e.g., send to server)
    register(formData);
  };

  return (
    <div className="Form-Container">
      <form onSubmit={handleFormSubmit} className="SignUpForm">

        

        <input
          type="text"
          id="name"
          name="name"
          placeholder="Username"
          value={formData.name}
          onChange={handleInputChange}
        />


        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />


        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />

        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />

        <button type="submit" id="signup-submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;


