import { useState } from "react";
import axios from "axios";
function Conf() {
  //Eliminar cuenta
  const [changePwd, setChangePwd] = useState();
  const response = axios.delete("https://localhost:5000/api/user/delete", {
    password,
  });

  return (
    <div className="container_conf">
      <div className="conf_option">
        <a>Cambiar Contraseña</a>
      </div>

      <div className="conf_option">
        <a>Cambiar Correo</a>
      </div>

      <div className="conf_option">
        <a>Tema Light/Dark</a>
      </div>

      <div className="conf_option">
        <a>Eliminar cuenta</a>
      </div>
    </div>
  );
}
export default Conf;
