import App from "./App";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { createBrowserRouter } from "react-router-dom";
import Register from "./components/Register/Register";

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
