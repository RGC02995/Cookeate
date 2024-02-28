import React, { useEffect, useState } from "react";
//Import Browser Router for use Link, route, routes in all the project
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import NotFoundPage from "./page/NotFoundPage.jsx";
import Login from "./components/form/Login.jsx";
import Register from "./components/form/Register.jsx";
import Home from "./components/home/Home.jsx";
import axios from "axios";

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
        const response = await axios.post(
          "AÑADIR EndPoint COMPROBACION TOKEN",
          token
        );
      }
      if (response.data.authenticated) {
        console.log("Usuario autenticado con éxito");
      } else {
        console.log("Error en la autenticación");
      }
    };
    // if(token){
    //   if((token===undefined)||(token===null)){
    //     localStorage.removeItem("token");
    //   }
    //   else{
    //     //Axios verificando token method POST
    //     console.log('patata')
    //   }
    // }else{
    //   localStorage.removeItem("token");
    // }
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
