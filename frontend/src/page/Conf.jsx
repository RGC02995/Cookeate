import { deleteUserApi } from "../api/deleteUserApi";
import { UploadStatusResponse } from "../api/statusResponse.model";
import { changeEmailApi } from "../api/changeEmailApi";

const Conf = () => {
  // Eliminar cuenta
  const handleDeleteUser = async () => {
    // Confirmar la eliminación de la cuenta
    const userConfirmed = window.confirm(
      "¿Desea eliminar la cuenta? No habrá vuelta atrás."
    );

    if (userConfirmed) {
      try {
        await deleteUserApi();
        return console.log(UploadStatusResponse.OK);
      } catch (error) {
        return console.error(UploadStatusResponse.ERROR_API);
      }
    }
    // Manejar el caso en que el usuario hace clic en "Cancelar" en el cuadro de confirmación
  };

  //Cambiar Email
  const handleChangeEmail = async () => {
    const userConfirmed = window.confirm("¿Desea cambiar el email?.");
    if (userConfirmed) {
      try {
        await changeEmailApi();
        return console.log(UploadStatusResponse.OK);
      } catch (error) {
        return console.error(UploadStatusResponse.ERROR_API);
      }
    }
  };

  return (
    <div className="container_conf">
      <div className="conf_option">
        <a>Cambiar Contraseña</a>
      </div>

      <div className="conf_option">
        <a onClick={handleChangeEmail}>Cambiar Correo</a>
      </div>

      <div className="conf_option">
        <a>Tema Light/Dark</a>
      </div>

      <div className="conf_option">
        <a onClick={handleDeleteUser}>Eliminar cuenta</a>
      </div>

      <div className="conf_option">
        <a
          onClick={() => {
            localStorage.removeItem("token");
            location.href = "/";
          }}
        >
          Salir de la cuenta
        </a>
      </div>
    </div>
  );
};

export default Conf;
