import ExplainAboutUs from "./componentsHome/ExplainAboutUs";
import LastPublications from "./componentsHome/LastPublications";
import Navbar from "./componentsHome/Navbar";
import Slider from "./componentsHome/Slider";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [searchPage, setSearchPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [dataRecipe, setDataRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleRecipeClick = (recipe) => {
    window.location.href = `/recipe?recipeId=${recipe}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!searchQuery) {
        setIsLoading(false);
        // No need to fetch data if there's no search query
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/recipes/recipes/${searchQuery}`, // Adjust URL if needed
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.data.recipes || response.data.recipes.length === 0) {
          console.log("No se han encontrado recetas");
          setDataRecipe([]);
        } else {
          const recipes = response.data.recipes;
          setDataRecipe(recipes);
          console.log("Recetas obtenidas correctamente", response.data.recipes);
        }
      } catch (error) {
        console.error("Error en la llamada, buscando recipientes.", error);
        // You can optionally store the error in a state variable for handling in your component
        // setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, searchQuery]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Navbar
        onChangeSearchPage={(searchStatus, searchQuery) => {
          setSearchPage(searchStatus);
          setSearchQuery(searchQuery);
        }}
      />

      {searchPage && (
        <div>
          {" "}
          {`Ha buscado... ${searchQuery.toUpperCase()}`}
          <p className="row_card_flex">
            Recipes:
            {dataRecipe ? (
              dataRecipe.map((recipe) => (
                <div className="flex_container" key={recipe._id}>
                  <div className="card_recipeContainer">
                    <img
                      style={{ width: "100%", height: 200 }}
                      src={`http://localhost:5000/uploads/recipes/${recipe.images}`}
                      alt={recipe.images}
                    />
                    <p onClick={() => handleRecipeClick(recipe._id)}>
                      {recipe.title}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No recipes found.</p> // Display message for empty results
            )}
          </p>
        </div>
      )}
      {!searchPage && (
        <div>
          <Slider />
          <ExplainAboutUs />
          <LastPublications />
        </div>
      )}
    </div>
  );
};

export default Home;
