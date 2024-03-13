import axios from "axios";
import validator from "validator";
const token = localStorage.getItem("token");

export const changeEmailApi = async () => {
  try {
    const newEmail = prompt("Cual sería el nuevo correo?");

    if (!validator.isEmail(newEmail)) {
      alert("El email no es válido");
      return;
    }

    const response = await axios.put(
      `http://localhost:5000/api/user/change-email/`,
      {
        email: newEmail,
      },

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const { data } = response;
    const { message } = data;

    return console.log(message);
  } catch (error) {
    return console.log(error);
  }
};
