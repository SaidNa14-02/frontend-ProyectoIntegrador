
import React, { useEffect, useState } from "react";
import Image from "../assets/Bombilla.png";
import Logo from "../assets/Logo.png";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";



const Register = () => {
  const [ showPassword, setShowPassword ] = useState(false);
  const navigate = useNavigate();
  const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("auth")) || "");



  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const cedula = e.target.cedula.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if(name.length > 0 && lastname.length > 0 && email.length > 0 && password.length > 0 && confirmPassword.length > 0){

      if(password === confirmPassword){
        const formData = {
          username: `${name} ${lastname}`,
          email,
          cedula,
          password
        };

        try{
        const response = await axios.post("", formData);
         toast.success("Registro Completo");
         navigate("/login");
        }catch(err){
         toast.error(err.message);
       }

      }else{
        toast.error("Contraseñas no coinciden");
      }
    

    }else{
      toast.error("Por favor llenen todos los datos");
    }


  }

  useEffect(() => {
    if(token !== ""){
      toast.success("Estas logeado");
      navigate("/");
    }
  }, []);

  return (
    <div className="register-main">
      <div className="register-left">
        <img src={Image} alt="" />
      </div>
      <div className="register-right">
        <div className="register-right-container">
          <div className="register-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="register-center">
            <h2>Binevenido al Registro!</h2>
            <p>Ingrese sus Datos para Comenzar</p>
            <form onSubmit={handleRegisterSubmit}>
            <input type="text" placeholder="Name" name="name" required={true} />
            <input type="text" placeholder="Lastname" name="lastname" required={true} />
            <input type="text" placeholder="Cédula" name="cedula" required />
            <input type="email" placeholder="Email" name="email" required={true} />
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" required={true} />
                {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />}
                
              </div>
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmPassword" required={true} />
                {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />}
                
              </div>
              <div className="register-center-buttons">
                <button type="submit">Registrarme</button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Ya tienes una cuenta? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;