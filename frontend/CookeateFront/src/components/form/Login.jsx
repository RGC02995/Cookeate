import { useRef } from "react";
import { togglePasswordVisibility } from "../../utils/utils";
import { Link } from "react-router-dom";
import { loginAPI } from "../../api/loginApi";
import { useState } from "react";
import Home from "../home/Home";

const Login = () => {
  const [isLogged, setIsLogged] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

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

  return isLogged === false ? (
    <div className="container">
      <div className="form_Style">
        <form className="container" onSubmit={handleSubmitLogin}>
          <h2>Login</h2>
          <label className="label_config">
            Email:
            <input type="email" ref={emailRef} />
          </label>
          <label className="label_config">
            Password:
            <input id="showPassword" type="password" ref={passwordRef} />
            <div className="container_row">
              <div className="container_row">
                <input type="checkbox" onClick={togglePasswordVisibility} />
                <p>Show Password</p>
              </div>
              <p>Forgot Password?</p>
            </div>
          </label>
          <button className="form_button" type="submit">
            Login
          </button>
        </form>
      </div>
      <Link to="/register">
        <button className="form_button">Register</button>
      </Link>
    </div>
  ) : (
    <Home />
  );
};

export default Login;