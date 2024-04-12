import Logo from "../../../img/Logo.png";
import { VscAccount } from "react-icons/vsc";
import { DiAptana } from "react-icons/di";
import { VscSearch } from "react-icons/vsc";
import { useEffect, useRef, useState } from "react";
import ReactSwitch from "react-switch";
import { useThemeContext } from "../../../context/ThemeProvider";

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

  //Manejar el switch de theme
  const { contextTheme, setContextTheme } = useThemeContext();
  const [checkedSwitch, setCheckedSwitch] = useState(false);
  const handleSwitch = (nextChecked) => {
    setContextTheme((state) => (state === "Dark" ? "Light" : "Dark"));
    setCheckedSwitch(nextChecked);
    console.log(nextChecked);
  };

  return (
    <div className="flex_navbar" id={contextTheme}>
      {/* Estamos buscado en el INPUT */}
      {searching && (
        <form onSubmit={handleSearch}>
          <input
            className="input_search"
            type="text"
            placeholder="Buscar..."
            ref={searchRef}
            onFocus={true}
          />
        </form>
      )}

      {/* No estamos buscado en el INPUT */}
      {!searching && (
        <nav className="navbar_nav">
          <img
            className="img_navbar"
            src={Logo}
            alt="cookeate-logo.png"
            onClick={() => {
              window.location.href = "/";
            }}
          />
          {/* AQUI ESTAN LOS ICONOS */}
          <div className="icons_flex">
            <form onSubmit={handleSearch}>
              <VscSearch
                className="search_icon"
                type="submit"
                onClick={() => {
                  setSearching(!searching);
                }}
              />
            </form>
            <div className="icons_flex_navbar">
              <VscAccount
                onClick={() => {
                  location.href = "/profile";
                }}
              />
              <DiAptana
                onClick={() => {
                  location.href = "/conf";
                }}
              />
              <header id={contextTheme}>
                <ReactSwitch
                  onChange={handleSwitch}
                  checked={checkedSwitch}
                  onColor="#86d3ff"
                  onHandleColor="#26d3e6"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0,0,0, 1)"
                  height={20}
                  width={48}
                  className="react-switch"
                  id="material-switch"
                />
              </header>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
