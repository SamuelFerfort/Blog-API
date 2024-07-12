import App from "./App";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { createBrowserRouter } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Post from "./Pages/Post/Post";

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
      {
        path: "post/:postId",
        element: <Post />,
      }
    ],
  },
]);

export default router;
