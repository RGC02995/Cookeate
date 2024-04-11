import Logo from "../../../img/Logo.png";
import { VscAccount } from "react-icons/vsc";
import { DiAptana } from "react-icons/di";
import { VscSearch } from "react-icons/vsc";
import { useEffect, useRef, useState } from "react";

const Navbar = (props) => {
  const searchRef = useRef(null);
  //Devuelve true o false dependediendo si estamos buscando algo o no
  const [searching, setSearching] = useState(false);
  //Función que nos devuelve el valor de la busqueda.
  const handleSearch = (e) => {
    e.preventDefault();
    const searching = searchRef.current.value;
    console.log("Estamos buscando: " + searching);
    props.onChangeSearchPage(true, searching);
  };

  //Poner el foco en el input cuando buscamos algo.
  const handleFocusOnSearch = () => {
    if (searching) {
      searchRef.current.focus();
    }
  };

  useEffect(() => {
    handleFocusOnSearch();
  }, [searching]);

  return (
    <div className="nav_dimension">
      {/* Estamos buscado en el INPUT */}
      {searching && (
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar..."
            ref={searchRef}
            onFocus={true}
          />
        </form>
      )}

      {/* No estamos buscado en el INPUT */}
      {!searching && (
        <nav className="style_container">
          <img
            className="img_dimension"
            src={Logo}
            alt="cookeate-logo.png"
            onClick={() => {
              window.location.href = "/";
            }}
          />

          <div className="flex">
            <div className="icon_container">
              <VscAccount
                className="icon_style"
                onClick={() => {
                  location.href = "/profile";
                }}
              />
              <DiAptana
                className="icon_style"
                onClick={() => {
                  location.href = "/conf";
                }}
              />
            </div>

            <label className="input_container">
              <form onSubmit={handleSearch}>
                <button
                  type="submit"
                  onClick={() => {
                    setSearching(!searching);
                  }}
                >
                  <VscSearch className="icon_horizontal_search" />
                </button>
              </form>
            </label>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
