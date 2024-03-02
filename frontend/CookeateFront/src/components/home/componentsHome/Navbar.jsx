import Logo from "../../../img/Logo.png";
import { VscAccount } from "react-icons/vsc";
import { DiAptana } from "react-icons/di";
import { VscSearch } from "react-icons/vsc";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav_dimension">
      <nav className="style_container">
        <img className="img_dimension" src={Logo} alt="cookeate-logo.png" />
        {/*Order svg icons up and input under of icons in css*/}
        <div className="flex">
          <div className="icon_container">
            <VscAccount className="icon_style" onClick={() => { location.href = "/profile"; }}/>
            <DiAptana className="icon_style" />
          </div>

          <label className="input_container">
            <input type="text" placeholder="Buscar..." />
            <VscSearch className="icon_horizontal_search" />
          </label>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
