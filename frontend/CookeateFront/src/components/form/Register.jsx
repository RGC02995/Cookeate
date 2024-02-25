import { useRef } from "react";

const Register = ({ onRegister }) => {
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const nickRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const surname = surnameRef.current.value;
    const nick = nickRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (name && surname && nick && email && password) {
      onRegister({ name, surname, nick, email, password });
    }
  };

  return (
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
          <input type="email" ref={emailRef} />
        </label>
        <label className="label_config">
          Password:
          <input type="password" ref={passwordRef} />
        </label>
        <button className="form_button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;