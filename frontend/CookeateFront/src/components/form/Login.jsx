import { useRef } from "react";

const Login = ({ onLogin }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    onLogin({ email, password });
  };

  return (
    <div className="form_Style">
      <form className="container " onSubmit={handleSubmitLogin}>
        <h2>Login</h2>
        <label className="label_config">
          Email:
          <input type="email" ref={emailRef} />
        </label>
        <label className="label_config">
          Password:
          <input type="password" ref={passwordRef} />
        </label>
        <button className="form_button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;