import { useRoutes } from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";
import HomePage from "./views/HomePage/HomePage";

export default function Route() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
      ],
    },
  ]);
}
