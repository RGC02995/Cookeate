import Logo from "../../../img/Logo.png";
import { VscAccount } from "react-icons/vsc";
import { DiAptana } from "react-icons/di";
import { VscSearch } from "react-icons/vsc";
import { useRef } from "react";

const Navbar = (props) => {
  const searchRef = useRef(null);
  //Devuelve true o false dependediendo si estamos buscando algo o no

  //Función que nos devuelve el valor de la busqueda.
  const handleSearch = (e) => {
    e.preventDefault();
    const searching = searchRef.current.value;
    console.log("Estamos buscando: " + searching);
    props.onChangeSearchPage(true, searching);
  };

  return (
    <div className="nav_dimension">
      <nav className="style_container">
        <img className="img_dimension" src={Logo} alt="cookeate-logo.png" />
        {/*Order svg icons up and input under of icons in css*/}
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
              <input type="text" placeholder="Buscar..." ref={searchRef} />
              <button type="submit" className="">
                <VscSearch className="icon_horizontal_search" />
              </button>
            </form>
          </label>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
