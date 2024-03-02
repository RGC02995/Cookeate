import NavBar from "../home/componentsHome/Navbar";
import { VscAdd } from "react-icons/vsc";
import image from "../profile/images.jpeg"
import IconPlus from "../../icons/IconPlus";
function Profile() {
  return (
    <div className="wrapper_profile_flex_center_column">
      <div className="box_profile_and_create">
        <article className="profile_box">
          <img src={image} alt="" />
          <p className="p_profile2">Nombre: Raúl</p>
          <p className="p_profile2">Nick: Shinoken</p>
          <p className="p_profile2">Email: raulgc2995@gmail.com</p>
          <p className="p_profile2">Role: Admin</p>
        </article>

        <div className="addRecipe_box">
          <p className="p_profile">Añadir receta</p>
          <IconPlus width='300px' height='300px' />
        </div>
      </div>

        <article className="article_wrapper">
      <h1 className="h1_style_publication">Tus Publicaciones</h1>
      </article>
    </div>
  );
}

export default Profile;
