import React, { useEffect, useState } from "react";
//Import Browser Router for use Link, route, routes in all the project
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import NotFoundPage from "./page/NotFoundPage.jsx";
import Login from "./page/form/Login.jsx";
import Register from "./page/form/Register.jsx";
import Home from "./components/home/Home.jsx";
import Profile from "./components/profile/Profile.jsx";
import Conf from "./page/Conf.jsx"
import axios from "axios";
import { tokenApi } from "./api/tokenApi.js";
import Recipes from "./page/Recipes.jsx";
const router = createBrowserRouter([
  {
    path: "/*", // Catch-all for any unmatched paths
    element: <NotFoundPage />,
    errorElement: <NotFoundPage />, // Optional for handling errors within this route
  },
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
        element:<Profile />
      },
      {
        path:"/conf",
        element:<Conf />
      },
      {
        path:"/recipe",
        element:<Recipes />
      }
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
]);
function AuthProvider() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  //Verificador valor del token
  useEffect(() => {
    const verifyToken = async () => {
      if (!token || token === undefined || token === null) {
        localStorage.removeItem("token");
      } else {
        tokenApi
          .post("/verify-token", null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log("Respuesta del servidor:", response.data.response);
          })
          .catch((error) => {
            console.error("Error:", error.message);
            if (error.response) {
              console.error("Respuesta del servidor:", error.response.data);
            }
          });
      }
    };
    verifyToken();
  }, [token]);

  return token ? (
    <Outlet />
  ) : (
    /*<Navigate to="/login" replace={true} />*/ (location.href = "/login")
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
