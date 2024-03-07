function Recipes() {
  return (
    <div>
      <nav className="nav_container_profile">
        <div className="profile_nav">
          <a
            className="p_profile"
            href="/profile"
          >
            Profile
          </a>
        </div>
      </nav>

      <article className="recipe_flex_center">
        <h1>Título</h1>
        <h2>Subtítulo</h2>
        <h4>Ingredientes</h4>
        <ul>
          <li>Soy parte de la lista de Ingredientes</li>
        </ul>
        <article>
          Descripción Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Officiis maiores quaerat, ad officia nobis necessitatibus nostrum
          aliquam deleniti placeat possimus sit facilis quas suscipit,
          reiciendis nesciunt atque ea quos, minima eos magni sequi non. Fugiat
          unde, totam aut quia expedita voluptas laudantium eaque est eveniet ea
          esse illum ad nisi veritatis aspernatur fuga error similique rem
          consequuntur. Cumque veniam dignissimos saepe quia vitae deleniti
          sequi aspernatur expedita! Similique perferendis dolor, facere
          quisquam deleniti quaerat saepe temporibus et minima itaque vero ad
          aliquam laborum, deserunt, nihil maiores doloremque suscipit?
          Repellendus possimus quae libero, harum eveniet autem corrupti error
          deleniti minima repudiandae?
        </article>

          <p style={{backgroundColor:'grey', width:'120px'}}>Imágenes</p>
        <div>
          <img src="https://imgs.search.brave.com/0O5jbHeFp1-0PS-xLcuJyU8TmdS6SA1hj9Qy95OFp2o/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuYm9udml2ZXVy/LmVzL3RhZ3MvbGFz/LW1lam9yZXMtcmVj/ZXRhcy1kZS1jb21p/ZGFzLXJhcGlkYXMu/anBn" alt="" />
        </div>
      </article>
    </div>
  );
}

export default Recipes;
