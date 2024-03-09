import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
// import { tokenApi } from "./api/tokenApi.js";
// import { UploadStatusResponse } from "./api/statusResponse.model.js";
import Home from "./components/home/Home.jsx";
import Profile from "./components/profile/Profile.jsx";
import Conf from "./page/Conf.jsx";
import NotFoundPage from "./page/NotFoundPage.jsx";
import Recipes from "./page/Recipes.jsx";
import Login from "./page/form/Login.jsx";
import Register from "./page/form/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/", // Use "/" for the default route
    element: <AuthProvider />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/conf",
        element: <Conf />,
      },
      {
        path: "/recipe",
        element: <Recipes />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/*", // Catch-all for any unmatched paths
    element: <NotFoundPage />,
    errorElement: <NotFoundPage />, // Optional for handling errors within this route
  },
]);

function AuthProvider() {
  // const { customStatus, message, token } = tokenApi();

  // if (customStatus === UploadStatusResponse.ERROR_API) {
  //   console.error("Error de autenticación: " + message);
  //   location.href = "/login";
  //   return;
  // }

  // console.log(message);
  // localStorage.setItem("token", token);

  const localStorageToken = localStorage.getItem("token");
  return localStorageToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} />
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
