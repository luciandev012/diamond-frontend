import { useRoutes } from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";
import HomePage from "./views/Client/HomePage/HomePage";
import AdminLayout from "./layout/AdminLayout/AdminLayout";
import HomeAdmin from "./views/Admin/HomeAdmin/HomeAdmin";
import DetailProduct from "./views/Client/DetailProduct/DetailProduct";
import RingManagement from "./views/Admin/RingManagement/RingManagement";
import RingCategoryManagement from "./views/Admin/RingManagement/RingCategoryManagement";

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
        {
          path: "detail-product/:id",
          element: <DetailProduct />,
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
        {
          path: "ring-management",
          element: <RingManagement />,
        },
        {
          path: "ring-category-management",
          element: <RingCategoryManagement />,
        },
      ],
    },
  ]);
}
