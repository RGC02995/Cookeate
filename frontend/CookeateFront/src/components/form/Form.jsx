import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";

function Form() {
  const [isLogged, setIsLogged] = useState(false);
  const [changeForm, setChangeForm] = useState("login");
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleLogin = ({ email, password }) => {
    if (email === "test@test.com" && password === "y") {
      setIsLogged(true);
    } else {
      alert("Error al iniciar sesion, el email o el password son incorrectos");
    }
  };

  const handleRegister = ({ name, surname, nick, email, password }) => {
    setRegistrationComplete(true);
  };

  const handleChangeForm = () => {
    setChangeForm(changeForm === "login" ? "register" : "login");
  };

  return (
    <>
      {isLogged ? (
        console.log("Enviar a HomePage")
      ) : changeForm === "login" ? (
        <div>
          <button onClick={handleChangeForm}>Register</button>
          <Login onLogin={handleLogin} />
        </div>
      ) : (
        <>
          {registrationComplete === false ? (
            <div>
              <button onClick={handleChangeForm}>Login</button>
              <Register onRegister={handleRegister} />
            </div>
          ) : (
            <>
              <h1>REGISTRO COMPLETADO CON ÉXITO!</h1>
              <button onClick={handleChangeForm}>Login</button>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Form;
