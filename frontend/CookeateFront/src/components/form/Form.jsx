import React, { useEffect, useState } from "react";
import Register from "./Register";
import Login from "./Login";
import { object } from "prop-types";
import { registerAPI } from "../../api/registerApi";
import { loginAPI } from "../../api/loginApi";

function Form() {
  const [isLogged, setIsLogged] = useState(false);
  const [changeForm, setChangeForm] = useState("login");
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleLogin = ({ email, password }) => {

    const resp = loginAPI
      .post("/login", {
       
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        const data = response.data;
        if (data.status === "success") {
          setIsLogged(true);
          console.log("Login exitoso:", data.message);
        } else {
          console.error("Error en el login:", data.message);
        }
      })
      .catch(function (error) {
        alert(
          "Error al iniciar sesion el email o el password son incorrectos:",
          error
        );
      });

  
  };

  const handleRegister = ({ name, surname, nick, email, password }) => {
    const resp = registerAPI
      .post("/register", {
        name: name,
        surname: surname,
        nick: nick,
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        const data = response.data;
        if (data.status === "success") {
          setRegistrationComplete(true);
          console.log("Registro exitoso:", data.message);
        } else {
          console.error("Error en el registro:", data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChangeForm = () => {
    setChangeForm(changeForm === "login" ? "register" : "login");
  };

  return (
    <>
      {isLogged ? (
        console.log("Enviar a HomePage")
      ) : changeForm === "login" ? (
        <div className="container">
          <Login onLogin={handleLogin} />
          <button className="form_button" onClick={handleChangeForm}>
            Register
          </button>
        </div>
      ) : (
        <>
          {registrationComplete === false ? (
            <div className="container">
              <Register onRegister={handleRegister} />
              <button className="form_button" onClick={handleChangeForm}>
                Login
              </button>
            </div>
          ) : (
            <>
              <div className="container">
                <h1 className="margin_top_h1">
                  REGISTRO COMPLETADO CON ÉXITO!
                </h1>
                <button className="form_button" onClick={handleChangeForm}>
                  Login
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Form;
