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

  const handleSubmitSendPublication = async(e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const subtitle = subtitleRef.current.value;
    const food = foodRef.current.value;
    const image = selectedFile;
    const guide = guideRef.current.value;

    if (!title || !food || !image || !guide) {
      alert("Rellenar al menos todos los campos excepto subtítulo");
    } else {
      const token = localStorage.getItem("your_token_key");
     await uploadRecipe
        .post("/save", {
          title: title,
          subtitle: subtitle,
          food: food,
          guide: guide,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(function (res) {
          console.log(res);
          const data = res.data;
          if (data.status === "success") {
            console.log("Publicación completada con exito");
            setShowForm(!showForm)
          } else {
            console.error("Error en el registro:", data.message);
          }
        });
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
          <p onClick={() => setShowForm(!showForm)}>+</p>
          <img src={image} alt="" />
          <a href="/profile">RGC95</a>
        </div>
        <DiAptana
          className="icon_profile_config"
          onClick={() => {
            location.href = "/conf";
          }}
        />
      </nav>
      {showForm && (
        <div>
          <form className="send_recipe" onSubmit={handleSubmitSendPublication}>
            <h2>Publicar</h2>
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
                style={{ fontSize: 18, marginTop: 10 }}
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
