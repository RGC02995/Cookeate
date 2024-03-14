import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { DiAptana } from "react-icons/di";
import image from "../profile/images.jpeg";
function Profile() {
  //Obtener TOKEN ID
  const token = localStorage.getItem("token");

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);
  const foodRef = useRef(null);
  const guideRef = useRef(null);

  //Data es el nick del usuario
  const [data, setData] = useState(null);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:5000/api/user/profile/${jwtDecode(token).id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data.user.nick);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token]);

  //TOKEN REMOVE IF Expired token
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
    }
  }

  //Mostrar tabla para enviar publicaciones
  const [showForm, setShowForm] = useState(false);
  // const [selectedFile, setSelectedFile] = useState(null);

  //Función publicar
  const handleSubmitSendPublication = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const subtitle = subtitleRef.current.value;
    const food = foodRef.current.value;
    const image = imageRef.current.files[0];
    const guide = guideRef.current.value;
    console.log(image);

    if (!title || !food || !guide || !image) {
      console.error(
        "Debes rellenar los campos obligatorios, TODOS y opcional el subtítulo"
      );

      return;
    }
    if (!image) {
      console.error("Please select an image to upload.");
      return;
    }

    const url = "http://localhost:5000/api/recipes/save";

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("food", food);
      formData.append("guide", guide);
      formData.append("image", image);

      console.log(
        `Hola soy la peticion post y los valores de title:${title} , subtitle:${subtitle}, food:${food}, guide:${guide}, image:${image}`
      );

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setShowForm(!showForm);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const uploadImage = (e) => {
  //   e.preventDefault();
  //   const image = imageRef.current.files[0];
  //   setSelectedFile(image);
  //   console.log(selectedFile);
  // };

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

            <h2 className="label_config">Subir imagen:</h2>
            <input
              type="file"
              id="image"
              accept=".jpg, .jpeg, .png, .webp"
              ref={imageRef}
              name="image"
              // onChange={uploadImage}
            />

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
