import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { registerApi } from "../../api/registerApi";
import { UploadStatusResponse } from "../../api/statusResponse.model";

const Register = () => {
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const nickRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const isToken = localStorage.getItem("token");

  if (isToken) {
    location.href = "/";
  }

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const surname = surnameRef.current.value;
    const nick = nickRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const { customStatus, message } = await registerApi({
      name,
      surname,
      nick,
      email,
      password,
    });

    if (customStatus === UploadStatusResponse.INVALID_FIELD) {
      console.error("El email no cumple los requisitos establecidos");
      return;
    }

    if (customStatus === UploadStatusResponse.FIELD_REQUIRED) {
      console.error("Faltan campos por completar");
      return;
    }

    if (customStatus === UploadStatusResponse.ERROR_API) {
      console.error(message);
      return;
    }

    if (customStatus === UploadStatusResponse.OK) {
      setRegistrationComplete(true);
      console.log("Registro exitoso: ", message);
    }
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
      <h2 className="container_complete">Se ha registrado correctamente</h2>
      <Link to="/login">
        <button className="form_button">Login</button>
      </Link>
    </div>
  );
};
export default Register;
