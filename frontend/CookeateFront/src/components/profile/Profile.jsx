import NavBar from "../home/componentsHome/Navbar";
import { VscAdd } from "react-icons/vsc";
import image from "../profile/images.jpeg";
import { DiAptana } from "react-icons/di";
import { useState, useRef } from "react";
import { uploadRecipe } from "../../api/uploadRecipe";

function Profile() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);
  const foodRef = useRef(null);
  const guideRef = useRef(null);

  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleSubmitSendPublication = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const subtitle = subtitleRef.current.value;
    const food = foodRef.current.value;
    const image = selectedFile;
    const guide = guideRef.current.value;
  
    if (!title || !food || !image || !guide) {
      alert("Rellenar al menos todos los campos excepto subtítulo");
    } else {
      try {
        // Enviar solicitud de publicación de receta
        const recipeResponse = await uploadRecipe.post(
          "/save",
          {
            title: title,
            subtitle: subtitle,
            food: food,
            guide: guide,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
  
        const recipeData = recipeResponse.data;

        if (recipeData.status === "success") {
          console.log("Publicación completada con éxito");
          setShowForm(!showForm);
  
          // Enviar solicitud de carga de imagen después del éxito de la publicación
          try {
            const data = new FormData();
            data.append("image", selectedFile);
  
            const imageResponse = await uploadRecipe.post("/uploadImage", {file:data}, {
              headers: {
                accept: "application/json",
                "Accept-Language": "en-US,en;q=0.8",
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                Authorization: "Bearer " + token,
              },
            });
            console.log(responseData);
  
            const responseData = imageResponse.data;
            console.log("Imagen subida correctamente", responseData);
          } catch (imageError) {
            console.error("Error al subir la imagen", imageError);
          }
        } else {
          console.error("Error en el registro:", recipeData.message);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  const uploadImage = (e) => {
    e.preventDefault();
    const image = imageRef.current.files[0];
    setSelectedFile(image);
  };

  return (
    <>
      <nav className="nav_container_profile">
        <div className="profile_nav">
          <p onClick={() => setShowForm(!showForm)} className="p_profile">
            +
          </p>
          <img src={image} alt="" />
          <a href="/profile">RGC95</a>
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
        <div className="container_form_recipe">
          <form className="send_recipe" onSubmit={handleSubmitSendPublication}>
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
                accept=".jpg, .jpeg, .png, .gif"
                ref={imageRef}
                name="filename"
                onChange={uploadImage}
              />
            </label>

            <label className="label_config_guide">
              <textarea
                style={{
                  fontSize: 18,
                  marginTop: 10,
                  maxHeight: 200,
                  maxWidth: 300,
                  minWidth: 250,
                  minHeight: 150,
                }}
                placeholder="Explica como hacer la receta..."
                rows={5}
                ref={guideRef}
              />
            </label>
            <button className="form_button_profile" type="submit">
              Publicar
            </button>
          </form>
        </div>
      )}

      <div>imagenes</div>
    </>
  );
}

export default Profile;
