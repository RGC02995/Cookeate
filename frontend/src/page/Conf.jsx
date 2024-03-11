import { deleteUserApi } from "../api/deleteUserApi";

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
      } catch (error) {
        console.error("Error al eliminar la cuenta:", error);
      }
    }
    // Manejar el caso en que el usuario hace clic en "Cancelar" en el cuadro de confirmación
  };

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
        <a onClick={handleDeleteUser}>Eliminar cuenta</a>
      </div>
    </div>
  );
};

export default Conf;
