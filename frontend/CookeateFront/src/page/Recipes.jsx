function Recipes() {
  return (
    <div>
      <nav className="nav_container_profile">
        <div className="profile_nav">
          <a onClick={() => setShowForm(!showForm)} className="p_profile" href="/profile">
            Profile
          </a>
        </div>
      </nav>
      <h1>Título</h1>
      <h2>Subtítulo</h2>
      <h4>Ingredientes</h4>
      <ul>
        <li></li>
      </ul>
      <article>
        Descripción Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis maiores quaerat, ad officia nobis necessitatibus nostrum aliquam deleniti placeat possimus sit facilis quas suscipit, reiciendis nesciunt atque ea quos, minima eos magni sequi non. Fugiat unde, totam aut quia expedita voluptas laudantium eaque est eveniet ea esse illum ad nisi veritatis aspernatur fuga error similique rem consequuntur. Cumque veniam dignissimos saepe quia vitae deleniti sequi aspernatur expedita! Similique perferendis dolor, facere quisquam deleniti quaerat saepe temporibus et minima itaque vero ad aliquam laborum, deserunt, nihil maiores doloremque suscipit? Repellendus possimus quae libero, harum eveniet autem corrupti error deleniti minima repudiandae?
      </article>
      <p>
        Imágenes
        <img src="" alt="" />
      </p>
    </div>
  );
}

export default Recipes;
