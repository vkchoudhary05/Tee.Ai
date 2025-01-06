// src/components/Login.js
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/Login.css"

function Login() {
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
    setErrorMessage("");
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const validatePhoneNumber = () => {
    const phoneNumberOnly = phoneNumber.replace(/\D/g, "");

    if (phoneNumberOnly.length < 10) {
      setErrorMessage("Please enter a valid phone number.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePhoneNumber()) {
      setIsLoading(true);

      // Simulate server response delay
      setTimeout(() => {
        setIsLoading(false);

        // Store user data to global context
        setUser({
          countryCode,
          phoneNumber,
        });

        localStorage.setItem(`user`,phoneNumber)


        navigate("/dashboard");
      }, 1000);
    }
  };

  useEffect(()=>{
    console.log('shshs')
    if(localStorage.getItem("user") !== null){

      navigate("/dashboard");

    }

 },[])

  return (
    <>
      {isLoading ? (
        <div className="loading-screen">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="container">
          <div className="left-half">
            <img
              src="https://cdn.create.vista.com/api/media/medium/212678218/stock-photo-rendering-cute-artificial-intelligence-robot-brain?token="
              alt="AI Robot"
              className="robot"
            />
          </div>
          <div className="right-half">
            <div className="header">
              <img src="https://cdn.pixabay.com/photo/2016/12/13/21/20/alien-1905155_1280.png" alt="Tee.Ai" />
            </div>
            <h1>Tee.Ai</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <select
                  value={countryCode}
                  onChange={handleCountryCodeChange}
                  style={{
                    marginRight: "10px",
                    width:"80px",
                
                  }}
                >
                  <option value="+91">India (+91)</option>
                  <option value="+44">UK (+44)</option>
                  <option value="+61">Australia (+61)</option>
                  <option value="+49">Germany (+49)</option>
                </select>
                <input
                  type="tel"
                  className="phone-number"
                  placeholder="Enter Mobile Number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  maxLength="15"
                />
              </div>
              <button type="submit">Login</button>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
