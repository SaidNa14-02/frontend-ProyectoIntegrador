import React, { useEffect, useState } from "react";
import Image from "../assets/Bombilla.png";
import Logo from "../assets/Logo.png"
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import config from '../config/config.js'
import axiosInstance from "../api/axiosInstance.js";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const navigate = useNavigate();


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    if (email && password) {
      const formData = {
         correo: email,
         password
        };
      try {

        const response = await axiosInstance.post('/api/usuarios/login', formData);
        const { token } = response.data;
        localStorage.setItem("auth", token);
        setToken(token);
        toast.success("Login successful");
        navigate("/");
      } catch (err) {
        if (err.response && err.response.data && Array.isArray(err.response.data.errors)) {
          err.response.data.errors.forEach(error => toast.error(error.msg));
        } else if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Credenciales inválidas o error del servidor");
        }
        console.log(err);
      }
    } else {
      toast.error("Por favor llena todos los campos");
    }
  };

  useEffect(() => {
    if (token !== "") {
      toast.success("Tu estas Logeado");
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="login-center">
            <h2>Bienvenido,Hola Mundo!</h2>
            <p>Ingresa tus Datos</p>
            <form onSubmit={handleLoginSubmit}>
              <input type="email" placeholder="Email" name="email" />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>

              <div className="login-center-options">
                <a href="#" className="forgot-pass-link">
                  Olvide mi Contraseña?
                </a>  
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            No tienes una cuenta? <Link to="/register">Registrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;