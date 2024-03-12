import { deleteUserApi } from "../api/deleteUserApi";
import { UploadStatusResponse } from "../api/statusResponse.model";
import { changePasswordApi } from "../api/changePasswordApi";

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
        return UploadStatusResponse.OK;
      } catch (error) {
        return UploadStatusResponse.ERROR_API;
      }
    }
    // Manejar el caso en que el usuario hace clic en "Cancelar" en el cuadro de confirmación
  };

  //Cambiar contraseña
  const handleChangePassword = async () => {
    const userConfirmed = window.confirm("¿Desea cambiar la contraseña?.");
    if (userConfirmed) {
      try {
        await changePasswordApi();
        return UploadStatusResponse.OK;
      } catch (error) {
        return UploadStatusResponse.ERROR_API;
      }
    }
  };

  return (
    <div className="container_conf">
      <div className="conf_option">
        <a>Cambiar Contraseña</a>
      </div>

      <div className="conf_option">
        <a onClick={handleChangePassword}>Cambiar Correo</a>
      </div>

      <div className="conf_option">
        <a>Tema Light/Dark</a>
      </div>

      <div className="conf_option">
        <a onClick={handleDeleteUser}>Eliminar cuenta</a>
      </div>
    </div>
  );
};

export default Conf;
