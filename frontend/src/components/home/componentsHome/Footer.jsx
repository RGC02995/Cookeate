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
        <select
          id="country selector"
          name="country selector"
          title="country selector"
        >
          <option disabled="disabled" selected="selected">
            País
          </option>{" "}
          <option value=" http://www.garnier.com.au/  ">Australia</option>
          <option value=" http://www.garnier.com.br/ ">Brazil</option>
          <option value=" https://www.garnier.ca/en-ca ">Canada</option>
          <option value=" http://www.garnier.hr/ ">Croatia</option>
          <option value=" / ">DMI</option>
          <option value=" https://www.garnier.fr/ ">France</option>
          <option value=" https://www.garnier.fr/ ">GarnierLand</option>
          <option value=" http://www.garnier.de/ ">Germany</option>
          <option value=" https://www.garnier.gr/ ">Greece</option>
          <option value=" http://www.garnier.hu/ ">Hungary</option>
          <option value=" https://www.garnier.in ">India</option>
          <option value=" http://www.garnier.it/ ">Italy</option>
          <option value=" http://www.garnier.com.mx/ ">Mexico</option>
          <option value=" https://www.garnierzorgvoorjezelf.nl/  ">
            Netherlands
          </option>
          <option value=" http://garnierdbajosiebie.pl/ ">Poland</option>
          <option value=" https://www.garnier.pt/  ">Portugal</option>
          <option value=" https://www.garnier.ro/ ">Romania</option>
          <option value=" http://www.garnier.com.ru/ ">Russia</option>
          <option value=" http://www.garnier.es/ ">Spain</option>
          <option value=" https://www.garnier.com.tr/ ">Turkey</option>
          <option value=" http://www.garnier.co.uk/ ">United Kingdom</option>
          <option value=" http://www.garnierusa.com/ ">
            United States - English
          </option>
          <option value=" https://www.google.com/ ">USA</option>
        </select>
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
