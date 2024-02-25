import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
//Import Browser Router for use Link, route, routes in all the project
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./routes/NotFoundPage.jsx";
import Login from "./components/form/Login.jsx";
import Register from "./components/form/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/*", // Catch-all for any unmatched paths
    element: <NotFoundPage />,
    errorElement: <NotFoundPage /> // Optional for handling errors within this route
  },
  {
    path: "/", // Use "/" for the default route
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }

  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);