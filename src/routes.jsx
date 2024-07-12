import App from "./App";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Pages/Login/Login";
import { createBrowserRouter } from "react-router-dom";
import Register from "./components/Pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <Register />,
      },
    ],
  },
]);

export default router;
