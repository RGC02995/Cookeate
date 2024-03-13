import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { DiAptana } from "react-icons/di";
import { UploadStatusResponse } from "../../api/statusResponse.model";
import { uploadRecipe } from "../../api/uploadRecipe";
import image from "../profile/images.jpeg";

function Profile() {
  const token = localStorage.getItem("token");

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);
  const foodRef = useRef(null);
  const guideRef = useRef(null);

  //Obtener TOKEN ID
  const [data, setData] = useState(null);

  useEffect(() => {
    // Hacer una petición para un usuario con ID específico
    axios
      .get(`http://localhost:5000/api/user/profile/${jwtDecode(token).id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Mostrar la información del usuario en la interfaz
        console.log(response.data);

        // Actualizar el estado con la información del usuario
        setData(response.data.user.nick);
      })
      .catch((error) => {
        // Manejar el error de la solicitud
        console.error(error);
      });
  }, [token]); // Dependencia: vuelve a hacer la solicitud si el token cambia

  //Mostrar tabla para enviar publicaciones
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmitSendPublication = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const subtitle = subtitleRef.current.value;
    const food = foodRef.current.value;
    const image = imageRef.current.files[0];
    const guide = guideRef.current.value;

    console.log(image);

    const { customStatus, message } = await uploadRecipe({
      title,
      subtitle,
      food,
      guide,
    });

    if (customStatus === UploadStatusResponse.FIELD_REQUIRED) {
      alert("Rellenar al menos todos los campos excepto subtítulo");
      return;
    }

    if (customStatus === UploadStatusResponse.ERROR_API) {
      console.error("Error en el registro:", message);
      return;
    }

    console.log("OK: " + message);
    setShowForm(!showForm);

    // Enviar solicitud de carga de imagen después del éxito de la publicación
    try {
      const data = new FormData();
      data.append("image", selectedFile);

      const imageResponse = await axios.post(
        "http://localhost:5000/api/recipes/uploadImage",
        { data },
        {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(responseData);

      const responseData = imageResponse.data;
      console.log("Imagen subida correctamente", responseData);
    } catch (imageError) {
      console.error("Error al subir la imagen", imageError);
    }
  };

  const uploadImage = (e) => {
    e.preventDefault();

    const image = imageRef.current.files[0];
    setSelectedFile(image);
    console.log(selectedFile);
  };

  ///-----------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <nav className="nav_container_profile">
        <div className="profile_nav">
          <p onClick={() => setShowForm(!showForm)} className="p_profile">
            +
          </p>
          <img src={image} alt="" />
          <a href="/profile">{data}</a>
          <a href="/" className="home_ref">
            INICIO
          </a>
        </div>
        <DiAptana
          className="icon_profile_config"
          onClick={() => {
            location.href = "/conf";
          }}
        />
      </nav>
      {showForm && (
        <>
          <div
            className="container_form_recipe"
            onClick={() => setShowForm(!showForm)}
          ></div>
          <form
            className="send_recipe"
            encType="multipart/form-data"
            onSubmit={handleSubmitSendPublication}
          >
            <h2>Publicar Receta</h2>
            <label className="label_config">
              Título:
              <input type="text" ref={titleRef} />
            </label>
            <label className="label_config">
              Subtítulo:
              <input type="text" ref={subtitleRef} />
            </label>
            <label className="label_config">
              Ingredientes:
              <input type="text" ref={foodRef} />
            </label>

            <label className="label_config">
              Subir imagen:
              <input
                type="file"
                id="image"
                accept=".jpg, .jpeg, .png, .webp"
                ref={imageRef}
                name="filename"
                onChange={uploadImage}
              />
            </label>

            <label className="label_config_guide">
              <textarea
                placeholder="Explica como hacer la receta..."
                rows={5}
                ref={guideRef}
              />
            </label>
            <button className="form_button_profile" type="submit">
              Publicar
            </button>
          </form>
        </>
      )}

      <div>imagenes</div>
    </>
  );
}

export default Profile;
