import axios from "axios";

export const deleteUserApi = async () => {
  const token = localStorage.getItem("token");

  try {
    // Realizar la solicitud de eliminación
    await axios.delete(`http://localhost:5000/api/user/delete-user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Mostrar la información del usuario en la interfaz
    alert("Cuenta eliminada correctamente");

    localStorage.removeItem("token");

    window.location.href = "/login";
  } catch (error) {
    // Manejar el error de la solicitud
    if (error) {
      // La solicitud fue realizada, pero la API devolvió un código de error
      console.error(`Error en la solicitud`);
    } else {
      // Otro tipo de error
      console.error(
        "Error desconocido al procesar la solicitud",
        error.message
      );
    }
  }
};
