import { useEffect } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { AxiosClient } from "./api/AxiosClient";
import { Dashboard } from "./pages/dashboard";
import { VerifikasiPage } from "./pages/verifcation-page";
import { SettingsPage } from "./pages/settings";
import { LoginPage } from "./pages/login";
import { PembayaranPage } from "./pages/pembayaran";

// Initialize API base URL immediately
AxiosClient.BaseURL.instance.set(import.meta.env.VITE_API_URL);

export default function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          element: <RootLayoutScrollToTop />,
          children: [
            { path: "/login", element: <LoginPage /> },

            // { path: "/", element: <Dashboard /> },
            { path: "/", element: <VerifikasiPage /> },
            { path: "/pembayaran", element: <PembayaranPage /> },

            // { path: "/verifikasi", element: <VerifikasiPage /> },
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
