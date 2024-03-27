import { deleteUserApi } from "../api/deleteUserApi";
import { UploadStatusResponse } from "../api/statusResponse.model";
import { changeEmailApi } from "../api/changeEmailApi";
import { useState, useRef } from "react";
import axios from "axios";
const Conf = () => {
  const token = localStorage.getItem("token");
  const imageRef = useRef(null);
  //States
  const [uploadImage, setUploadImage] = useState(false);

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
  };

  //Subir imagen user profile
  const handleUploadImage = async () => {
    const image = imageRef.current.files[0];
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:5000/api/user/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setUploadImage(!uploadImage);
    } catch (error) {
      console.error("Error:", error);
    }
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
      <button className="conf_option">
        <a>Cambiar Contraseña</a>
      </button>

      <button className="conf_option">
        <a onClick={handleChangeEmail}>Cambiar Correo</a>
      </button>

      <button className="conf_option">
        <a>Tema Light/Dark</a>
      </button>

      <button
        className="conf_option"
        onClick={() => {
          setUploadImage(!uploadImage);
        }}
      >
        <a>Subir imagen perfil</a>
      </button>
      {uploadImage ? (
        <form onSubmit={handleUploadImage}>
          <label>
            Subir Imagen:
            <input
              type="file"
              id="image"
              accept=".jpg, .jpeg, .png, .webp"
              ref={imageRef}
              name="image"
            />
          </label>
          <button type="submit">Subir imagen </button>
        </form>
      ) : null}

      <button className="conf_option">
        <a onClick={handleDeleteUser}>Eliminar cuenta</a>
      </button>

      <button className="conf_option">
        <a
          onClick={() => {
            localStorage.removeItem("token");
            location.href = "/";
          }}
        >
          Salir de la cuenta
        </a>
      </button>
    </div>
  );
};

export default Conf;
