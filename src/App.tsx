import { useEffect } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { VerifikasiPage } from "./pages/verifcation-page";
import { SettingsPage } from "./pages/settings";

export default function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          element: <RootLayoutScrollToTop />,
          children: [
            { path: "/", element: <Dashboard /> },
            { path: "/verifikasi", element: <VerifikasiPage /> },
            { path: "/settings", element: <SettingsPage /> },
          ],
        },
      ])}
    />
  );
}

function RootLayoutScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return <Outlet />;
}
