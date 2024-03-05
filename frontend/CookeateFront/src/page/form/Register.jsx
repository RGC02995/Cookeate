import { useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { registerAPI } from "../../api/registerApi";
import validator from "validator";

const Register = () => {
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const nickRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const isToken = localStorage.getItem("token");
  console.log(isToken);
  if (isToken !== undefined && isToken !== null && isToken !== "") {
    // <Navigate to="/" replace={true} />
    location.href = "/";
  }

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const surname = surnameRef.current.value;
    const nick = nickRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (validator.isEmail(email)) {
      if (
        !name.trim() ||
        !surname.trim() ||
        !nick.trim() ||
        !email.trim() ||
        !password.trim()
      ) {
        alert("NO PUEDEN HABER ESPACIOS EN BLANCO");
        return;
      }
    }

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

  return registrationComplete === false ? (
    <div className="container">
      <div className="form_Style div_margin_top">
        <form className="container " onSubmit={handleSubmitRegister}>
          <h2>Register</h2>
          <label className="label_config">
            Name:
            <input type="text" ref={nameRef} />
          </label>
          <label className="label_config">
            Surname:
            <input type="text" ref={surnameRef} />
          </label>
          <label className="label_config">
            Nick:
            <input type="text" ref={nickRef} />
          </label>
          <label className="label_config">
            Email:
            <input
              type="email"
              ref={emailRef}
              placeholder="example@gmail.com"
            />
          </label>
          <label className="label_config">
            Password:
            <input type="password" ref={passwordRef} />
          </label>
          <button className="form_button" type="submit">
            Register
          </button>
        </form>
      </div>
      <Link to="/login">
        <button className="form_button">Login</button>
      </Link>
    </div>
  ) : (
    <div className="container">
      <h1 className="container">Se ha registrado correctamente</h1>
      <Link to="/login">
        <button className="form_button">Login</button>
      </Link>
    </div>
  );
};

export default Register;
