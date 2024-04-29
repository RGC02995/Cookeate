# Clona este repositorio

git clone https://github.com/RGC02995/Cookeate.git

# Ve al directorio del proyecto

cd Cookeate

# Instala las dependencias en el frontend

cd frontend
npm install
npm install react-switch

# Instala las dependencias en el backend

cd..
cd backend
npm install

# Opcional, volcar base de datos
Puedes traer el contenido de la base de datos usando este comando (en la carpeta raíz) "cd /Cookeate"
Debes tener algunas herramientas de MongoDB instaladas (mongoRestore)

mongorestore --db=nombre_nueva_basedatos ./relatia/database/baseDatosProyectoFinal

#Uso
Lo primero será crear una cuenta para poder acceder a todo el contenido para ello, una vez este todo inicializado, la misma pagina web nos redirigirá al formulario de login, justo debajo tenemos el botón de registro, donde debemos formalizar el nuestro, una vez registrado obtendrás acceso a todas las funciones del usuario.

#Endpoint y funciones

USUARIO:
// User register
router.post("/register", UserController.register);

// User login
router.post("/login", UserController.login);

// User verify token
router.post("/verify-token", verifyToken

// User Profile
router.get("/profile/:id", verifyToken, UserController.profile);

// User Update Image Profile
router.post(
  "/uploadImage",
  [verifyToken, uploads.single("image")],
  UserController.uploadImage,

// User change email
router.put("/change-email", verifyToken, UserController.changeEmail);

// User change password
router.put("/change-password", verifyToken, UserController.changePassword);

// User delete user
router.delete("/delete-user", verifyToken, UserController.deleteAccount);

----------------------------------------------------------------------------------------------------------
RECETAS:

// Recipe save 
router.post(
  "/save",
  verifyToken,
  uploads.single("image"),
  RecipesController.saveRecipeWithImage,

// Recipe Show recipes of user
router.get("/userRecipes/:userId", verifyToken, RecipesController.userRecipes);

// Recipe Show recipe by id
router.get(
  "/get-recipe/:recipeId",
  verifyToken,
  RecipesController.getRecipeById
);

// Show the latest 20 recipes
router.get("/latestRecipes", RecipesController.getLastestRecipes);

//Show recipe by founded name
router.get("/recipes/:name", verifyToken,

//Show all recipes
router.get("/allRecipes", verifyToken, RecipesController.showAllRecipes);




