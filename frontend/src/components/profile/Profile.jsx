import { useRef, useState } from "react";
import { DiAptana } from "react-icons/di";
import { uploadRecipe, UploadStatusResponse } from "../../api/uploadRecipe";
import image from "../profile/images.jpeg";

function Profile() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);
  const foodRef = useRef(null);
  const guideRef = useRef(null);

  const [showForm, setShowForm] = useState(false);
  // const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmitSendPublication = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const subtitle = subtitleRef.current.value;
    const food = foodRef.current.value;
    // const image = selectedFile;
    const guide = guideRef.current.value;

    const { customStatus, message } = uploadRecipe({
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
    // try {
    //   const data = new FormData();
    //   data.append("image", selectedFile);

    //   const imageResponse = await uploadRecipe.post("/uploadImage", {file:data}, {
    //     headers: {
    //       accept: "application/json",
    //       "Accept-Language": "en-US,en;q=0.8",
    //       "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
    //       Authorization: "Bearer " + token,
    //     },
    //   });
    //   console.log(responseData);

    //   const responseData = imageResponse.data;
    //   console.log("Imagen subida correctamente", responseData);
    // } catch (imageError) {
    //   console.error("Error al subir la imagen", imageError);
    // }
  };

  // const uploadImage = (e) => {
  //   e.preventDefault();
  //   const image = imageRef.current.files[0];
  //   setSelectedFile(image);
  // };

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
                // onChange={uploadImage}
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
