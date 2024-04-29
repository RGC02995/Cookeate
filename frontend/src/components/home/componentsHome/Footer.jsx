import Logo from "../../../img/Logo.png";
import { BsYoutube } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";

function Footer() {
  return (
    <footer className="footer_flex">
      <div className="footerDiv_margin_bottom">
        <p className="footer_paragraph_style">ENLACES DE LA PÁGINA</p>
        <ul>
          <li className="footer_li_style">
            <a href="" className="footer_a_style">
              Home
            </a>
          </li>
          <li className="footer_li_style">
            <a href="" className="footer_a_style">
              Mapa Sitio
            </a>
          </li>
          <li className="footer_li_style">
            <a href="" className="footer_a_style">
              Política de Privacidad
            </a>
          </li>
          <li className="footer_li_style">
            <a href="" className="footer_a_style">
              Configurador de Cookies
            </a>
          </li>
        </ul>
      </div>

      <div>
        <p>ATENCIÓN AL CONSUMIDOR</p>
        <ul>
          <li className="footer_li_style footer_single_a_style">
            <span>
              <a href="mailto:raulgc2995@gmail.com" className="footer_a_style ">
                Contáctanos
              </a>
            </span>
          </li>
        </ul>
      </div>

      <div>
        <p>SÍGUENOS</p>
        <div className="footer_icons_flex">
          <a href="https://twitter.com/?lang=es">
            <BsTwitterX />
          </a>
          <a href="https://youtube.com/?lang=es">
            <BsYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
