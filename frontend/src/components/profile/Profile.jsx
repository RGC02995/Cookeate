import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { DiAptana } from "react-icons/di";

function Profile() {
  //Obtener TOKEN ID
  const token = localStorage.getItem("token");
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);
  const foodRef = useRef(null);
  const guideRef = useRef(null);

  const handleRecipeClick = (recipe) => {
    window.location.href = `/recipe?recipeId=${recipe._id}`;
  };

  //Data es el nick del usuario
  const [data, setData] = useState(null);

  const [recipes, setRecipes] = useState([]);

  const [imgProfile, setImgProfile] = useState(null);
  useEffect(() => {
    const userId = jwtDecode(token).id;
    if (token) {
      //Obtener el nick del usuario
      axios
        .get(`http://localhost:5000/api/user/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const nick = response.data.user.nick;
          const imageProfile = response.data.user.image;
          setImgProfile(imageProfile);
          setData(nick);
          console.log(imageProfile);
        })
        .catch((error) => {
          console.error(error);
        });

      //Obtener las recetas del usuario
      axios
        .get(`http://localhost:5000/api/recipes/userRecipes/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const recetas = response.data.recipes;
          setRecipes(recetas);
        })
        .catch((error) => {
          console.error("Error al obtener las recetas del usuario:", error);
        });
    }
    //   });
  }, [token]);
  console.log(recipes);

  //TOKEN REMOVE IF Expired token
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }

  //Mostrar tabla para enviar publicaciones
  const [showForm, setShowForm] = useState(false);

  //Función publicar
  const handleSubmitSendPublication = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const subtitle = subtitleRef.current.value;
    const food = foodRef.current.value;
    const image = imageRef.current.files[0];
    const guide = guideRef.current.value;

    if (!title || !food || !guide || !image) {
      console.error(
        "Debes rellenar los campos obligatorios, TODOS y opcional el subtítulo, recuerda añadir comas entre ingredientes"
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

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setShowForm(!showForm);
      window.location.href = "/profile";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  ///-----------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <nav className="nav_container_profile">
        <div className="profile_nav">
          <p onClick={() => setShowForm(!showForm)} className="p_profile">
            +
          </p>
          <img
            src={`http://localhost:5000/uploads/avatars/${imgProfile}`}
            alt=""
          />
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
              <input
                type="text"
                ref={foodRef}
                placeholder="Ej: Harina, Huevos, Leche, 150gr Azúcar"
              />
            </label>

            <h2 className="label_config">Subir imagen:</h2>
            <input
              type="file"
              id="image"
              accept=".jpg, .jpeg, .png, .webp"
              ref={imageRef}
              name="image"
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

      <div className="row_card_flex">
        {recipes.map((recipe) => (
          <div className="flex_container" key={recipe._id}>
            <div className="card_recipeContainer">
              <img
                style={{ width: "100%" }}
                src={`http://localhost:5000/uploads/recipes/${recipe.images}`}
                alt={recipe.images}
              />
            </div>
            <p className="title_card" onClick={() => handleRecipeClick(recipe)}>
              {recipe.title}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Profile;
