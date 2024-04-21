import { useThemeContext } from "../../context/ThemeProvider";
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

  const [showAllRecipes, setShowAllRecipes] = useState(false);

  const token = localStorage.getItem("token");

  const { contextTheme } = useThemeContext();

  const handleRecipeClick = (recipe) => {
    window.location.href = `/recipe?recipeId=${recipe}`;
  };

  const fetchAllRecipes = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:5000/api/recipes/allRecipes",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDataRecipe(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const useEffectHook = async () => {
    setIsLoading(true);

    try {
      if (showAllRecipes) {
        await fetchAllRecipes();
      }
      if (!showAllRecipes) {
        setDataRecipe(null);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    useEffectHook();
  }, [token, searchQuery, showAllRecipes]);

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
    // Este div envuelve todo
    <div id={contextTheme}>
      <Navbar
        onChangeSearchPage={(searchStatus, searchQuery) => {
          setSearchPage(searchStatus);
          setSearchQuery(searchQuery);
        }}
      />

      {searchPage && (
        <div className="homePage">
          {" "}
          {`Usted ha buscado: "${searchQuery.toUpperCase()}"`}
          <form action="#">
            <label>Filtrar por: </label>
            <input
              type="submit"
              value="Mostrar todas las recetas"
              onClick={(e) => {
                e.preventDefault();
                setShowAllRecipes(!showAllRecipes);
              }}
            />
          </form>
          <div className="card_flex_wrap">
            {dataRecipe ? (
              dataRecipe.map((recipe) => (
                <div key={recipe._id} className="card_recipeContainer">
                  <img
                    src={`http://localhost:5000/uploads/recipes/${recipe.images}`}
                    alt={recipe.images}
                  />
                  <p onClick={() => handleRecipeClick(recipe._id)}>
                    {recipe.title.toUpperCase()}
                  </p>
                </div>
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
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
