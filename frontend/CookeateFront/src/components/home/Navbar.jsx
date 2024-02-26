import Logo from "../../img/Logo.png";
import { VscAccount } from "react-icons/vsc";
import { DiAptana } from "react-icons/di";

const Navbar = () => {
  return (
    <div className="nav_dimension">
      <nav className="style_container">
        <img className="img_dimension" src={Logo} alt="cookeate-logo.png" />
        <div className="flex">
          <label>
            <input type="text" placeholder="Buscar..." />
          </label>
          <div className="icon_container">
            <VscAccount className="icon_style" />
            <DiAptana className="icon_style" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
