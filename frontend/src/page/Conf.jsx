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
  const [formPass, setFormPass] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [sureDelete, setSureDelete] = useState(false);

  const [showFormEmail, setShowFormEmail] = useState(false);
  const [email, setEmail] = useState("");
  // Eliminar cuenta
  const handleDeleteUser = async () => {
    try {
      await deleteUserApi();
      return console.log(UploadStatusResponse.OK);
    } catch (error) {
      return console.error(UploadStatusResponse.ERROR_API);
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

  //Cambiar contraseña
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      console.log("Las contraseñas nuevas no coinciden");
      return;
    }

    try {
      // Use Axios
      const response = await axios.put(
        "http://localhost:5000/api/user/change-password",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log(response.data.message);

        // Limpiar los campos del formulario
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        console.error(
          response.data.message || "Ha habido un error en el cambio"
        ); // Handle specific error message or a generic one
      }
    } catch (error) {
      console.error(
        "Error al cambiar la contraseña: Prueba a usar una contraseña más segura. EJ: PrueBah@1.",
        error
      );
    }
  };

  //Cambiar Email
  const handleChangeEmail = async () => {
    const newEmail = email;
    try {
      await changeEmailApi(newEmail);
      return;
    } catch (error) {
      return console.error(UploadStatusResponse.ERROR_API);
    }
  };

  return (
    <div className="container_conf">
      <button className="conf_option">
        <a
          onClick={() => {
            setFormPass(!formPass);
          }}
        >
          Cambiar Contraseña
        </a>
      </button>
      {formPass ? (
        <form onSubmit={handleChangePassword}>
          <input
            type="password"
            placeholder="Contraseña actual"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Cambiar Contraseña</button>
        </form>
      ) : null}

      <button className="conf_option">
        <a onClick={() => setShowFormEmail(!showFormEmail)}>Cambiar Correo</a>
      </button>
      {showFormEmail ? (
        <div>
          <div>Esta seguro de querer cambiar el correo?</div>
          <input
            type="text"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" onClick={handleChangeEmail}>
            Estoy seguro/ Enviar mi nuevo correo
          </button>
        </div>
      ) : null}

      <button className="conf_option">
        <a
          onClick={() => {
            window.location.href = "/profile";
          }}
        >
          Volver al PERFIL DE USUARIO
        </a>
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
        <a onClick={() => setSureDelete(!sureDelete)}>Eliminar cuenta</a>
      </button>
      {sureDelete ? (
        <div>
          Esta seguro de querer eliminar la cuenta? Una vez presionado el botón
          no habrá vuelta atrás.
          <button onClick={handleDeleteUser}>Eliminar</button>
        </div>
      ) : null}

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
