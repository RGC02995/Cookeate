import { useState, useRef } from "react";
import { Link } from "react-router-dom";

function Form() {
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const nickRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [isLogged, setIsLogged] = useState(false);
  const [changeForm, setChangeForm] = useState("login");
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleChangeForm = () => {
    setChangeForm(changeForm === "login" ? "register" : "login");
    console.log(changeForm);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email === "test@test.com" && password === "y") {
      setIsLogged(true);
    } else {
      alert("Error al iniciar sesion, el email o el password son incorrectos");
    }
  };
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const surname = surnameRef.current.value;
    const nick = nickRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (name && surname && nick && email && password) {
      setRegistrationComplete(true);
    }
  };

  return (
    <>
      {isLogged ? (
        console.log("Enviar a HomePage")
      ) : changeForm === "login" ? (
        <div>
          <button onClick={handleChangeForm}>Register</button>
          <form onSubmit={handleSubmitLogin}>
            <h2>Login</h2>
            <label>
              Email:
              <input type="email" ref={emailRef} />
            </label>

            <label>
              Password:
              <input type="password" ref={passwordRef} />
            </label>

            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <>
          {registrationComplete === false ? (
            <div>
              <button onClick={handleChangeForm}>Login</button>
              <form onSubmit={handleSubmitRegister}>
                <h2>Register</h2>
                <label>
                  Name:
                  <input type="text" ref={nameRef} />
                </label>
                <label>
                  Surname:
                  <input type="text" ref={surnameRef} />
                </label>
                <label>
                  Nick:
                  <input type="text" ref={nickRef} />
                </label>
                <label>
                  Email:
                  <input type="email" ref={emailRef} />
                </label>
                <label>
                  Password:
                  <input type="password" ref={passwordRef} />
                </label>
                <button type="submit">Register</button>
              </form>
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
