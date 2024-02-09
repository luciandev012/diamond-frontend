import { useRoutes } from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";
import HomePage from "./views/Client/HomePage/HomePage";
import AdminLayout from "./layout/AdminLayout/AdminLayout";
import HomeAdmin from "./views/Admin/HomeAdmin/HomeAdmin";

export default function Route() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "",
          element: <HomeAdmin />,
        },
      ],
    },
  ]);
}
