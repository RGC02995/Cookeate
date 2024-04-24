import { useEffect, useState } from "react";
import axios from "axios";

function Recipes() {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("recipeId");
  const token = localStorage.getItem("token");
  const theme = localStorage.getItem("theme");

  const [title, setTitle] = useState(null);
  const [subtitle, setSubTitle] = useState(null);
  const [guide, setGuide] = useState(null);
  const [food, setFood] = useState(null);
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get(
            `http://localhost:5000/api/recipes/get-recipe/${recipeId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
          const recipeTitle = response.data.recipe.title;
          setTitle(recipeTitle);
          const recipeSubTitle = response.data.recipe.subtitle;
          setSubTitle(recipeSubTitle);
          const recipeGuide = response.data.recipe.guide;
          setGuide(recipeGuide);
          const recipeFood = response.data.recipe.food;
          setFood(recipeFood);
          const recipeImg = response.data.recipe.images;
          setImg(recipeImg);

          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error al obtener la receta:", error);
      }
    };

    fetchData();
  }, [recipeId, token]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div id={theme} className="background_height">
      <nav>
        <div className="recipe_nav">
          <a className="p_profile" href="/profile">
            Perfil
          </a>
          <a href="/" className="home_ref">
            INICIO
          </a>
        </div>
      </nav>

      <article className="recipe_flex_center">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <ul>
          {food.map((foodItem) => (
            <li key={foodItem}>{foodItem}</li>
          ))}
        </ul>
        <article>{guide}</article>
        <div className="img_center">
          <img src={`http://localhost:5000/uploads/recipes/${img}`} alt={img} />
        </div>
      </article>
    </div>
  );
}

export default Recipes;
