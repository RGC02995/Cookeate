import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { loginApi } from "../../api/loginApi";
import { UploadStatusResponse } from "../../api/statusResponse.model";
import { togglePasswordVisibility } from "../../utils/utils";
import { ThemeContext } from "../../context/ThemeProvider";

// import { decode } from "jwt-decode";

const Login = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const isToken = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const ID = localStorage.getItem("userId");
  console.log(ID);

  if (isToken) {
    location.href = "/";
  }

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const { customStatus, message, token } = await loginApi({
      email,
      password,
    });

    if (customStatus === UploadStatusResponse.FIELD_REQUIRED) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (customStatus === UploadStatusResponse.ERROR_API) {
      console.error(
        "Error al iniciar sesion el email o el password son incorrectos: " +
          message
      );
      return;
    }
    localStorage.setItem("token", token);
    location.href = "/";
  };

  return (
    <>
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
    </>
  );
};

export default Login;
