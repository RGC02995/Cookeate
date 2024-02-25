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
    <div>
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
  );
};

export default Login;