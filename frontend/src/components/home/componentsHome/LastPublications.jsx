import { useEffect, useState } from "react";
import axios from "axios";

function LastPublications() {
  const [imgRecipe, setImgRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/recipes/latestRecipes`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        const latestRecipes = response.data.recipes;
        setImgRecipes(latestRecipes);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener las ultimas recetas", error);
      });
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  return (
    <div>
      <article>
        <h1>Últimas Publicaciones</h1>
      </article>

      <div>
        {imgRecipe.map((recipes) => (
          <div key={recipes._id}>
            <img
              src={`http://localhost:5000/uploads/recipes/${recipes.images}`}
              alt={recipes.images}
              height={100}
            />
            <a href={`/recipe?recipeId=${recipes._id}`}>{recipes.title}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LastPublications;
