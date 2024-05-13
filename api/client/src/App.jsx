import HomePage from "./pages/HomePage/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./pages/ListPage/ListPage";
import Layout, { RequireAuth } from "./pages/Layout/Layout";
import SobreNosotros from "./pages/SobreNosotros/SobreNosotros";
import SinglePage from "./pages/SinglePage/SinglePage";
import Contacto from "./pages/Contacto/Contacto";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
//import NotFound from "./pages/NotFound/NotFound";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";
import NewPost from "./pages/NewPost/NewPost";
import {
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
  updatePostLoader,
} from "./lib/loader";
import NotFound from "./pages/NotFound/NotFound";
import ProfileError from "./pages/ProfileError/ProfileError";
import UpdatePost from "./pages/UpdatePost/UpdatePost";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
          errorElement: <NotFound />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
          errorElement: <NotFound />,
        },
        {
          path: "/sobre-nosotros",
          element: <SobreNosotros />,
        },
        {
          path: "/contacto",
          element: <Contacto />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <Profile />,
          loader: profilePageLoader,
          errorElement: <ProfileError />,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdate />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/add",
          element: <NewPost />,
        },
        {
          path: "/update-post/:id",
          element: <UpdatePost />,
          loader: updatePostLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
