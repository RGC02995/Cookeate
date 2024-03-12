import axios from "axios";
import validator from "validator";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
export const changeEmailApi = async () => {
  try {
    const id = jwtDecode(token).id;
    const newEmail = await prompt("Cual sería el nuevo correo?");

    if (validator.isEmail(newEmail)) {
      const response = await axios.put(
        "http://localhost:5000/api/user/change-email",
        { id, newEmail },
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
    }
  } catch (error) {
    return console.log(error);
  }
};
