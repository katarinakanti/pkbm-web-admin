import { Link, useNavigate, useLocation } from "react-router";
import {
  AlignJustify,
  X,
  LayoutDashboard,
  UserCheck,
  LogOut,
  HandCoins,
} from "lucide-react";
import { useState } from "react";
import {
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

export interface HeaderProps {
  noPaddingHorizontal?: boolean;
}

export function Header(props: HeaderProps) {
  const [open_sidebar, setOpenSidebar] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`
        sticky top-0 z-50 w-full transition-all duration-300
        ${props.noPaddingHorizontal ? "" : "px-6 xl:px-[10%]"}
        bg-white/80 backdrop-blur-md border-b border-secondary/5 py-3
      `}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* LOGO & ADMIN TAG */}
        <Link to={"/"} className="group">
          <div className="flex gap-3 items-center">
            <div className="bg-secondary p-1.5 rounded-xl shadow-lg shadow-secondary/20 transition-transform group-hover:scale-105">
              <img
                className="object-contain h-10"
                src="/logoBudiman.png"
                alt="Logo"
              />
            </div>
            <div className="font-bold leading-tight text-secondary">
              <div className="text-[10px] tracking-[0.2em] text-primary font-black uppercase">
                Admin Portal
              </div>
              <div className="text-sm md:text-base">DRESTANTA</div>
            </div>
          </div>
        </Link>

        {/* DESKTOP MENU - DASHBOARD NAVIGATION */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-2">
          {[
            // {
            //   label: "Dashboard",
            //   path: "/",
            //   icon: <LayoutDashboard size={18} />,
            // },
            {
              label: "Verifikasi Berkas",
              path: "/",
              icon: <UserCheck size={18} />,
            },
            {
              label: "Verikasi Pembayaran",
              path: "/pembayaran",
              icon: <HandCoins size={18} />,
            },
            // {
            //   label: "Settings",
            //   path: "/settings",
            //   icon: <Settings size={18} />,
            // },
          ].map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "flat" : "light"}
              color={isActive(item.path) ? "primary" : "default"}
              className={`font-bold transition-all rounded-xl ${
                isActive(item.path)
                  ? "text-primary"
                  : "text-secondary/60 hover:text-secondary"
              }`}
              onPress={() => navigate(item.path)}
              startContent={item.icon}
            >
              {item.label}
            </Button>
          ))}
        </div>

        {/* RIGHT ACTIONS: NOTIF & PROFILE */}
        <div className="flex items-center gap-2 md:gap-6">
          {/* Notifications */}
          {/* <Badge
            color="danger"
            content="5"
            size="sm"
            className="font-bold border-2 border-white"
          >
            <Button
              isIconOnly
              variant="light"
              className="text-secondary/60 hover:text-primary rounded-xl"
            >
              <Bell size={22} />
            </Button>
          </Badge> */}

          {/* Profile Dropdown */}
          <div className="hidden md:block">
            <Dropdown
              placement="bottom-end"
              className="rounded-2xl border border-secondary/5 shadow-2xl"
            >
              <DropdownTrigger>
                <div className="flex items-center gap-3 cursor-pointer group">
                  <Avatar
                    isBordered
                    className="transition-transform ring-primary"
                    color="primary"
                    size="sm"
                  />
                  <div className="hidden lg:flex flex-col items-start leading-none">
                    <span className="text-sm font-bold text-secondary group-hover:text-primary transition-colors">
                      Admin Utama
                    </span>
                    <span className="text-[10px] font-black text-secondary/40 uppercase mt-1">
                      Super Admin
                    </span>
                  </div>
                </div>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Admin Actions"
                variant="flat"
                className="p-2"
                disabledKeys={["profile"]}
              >
                <DropdownItem
                  key="profile"
                  className="h-12 gap-2 opacity-100 cursor-default"
                >
                  <p className="font-black text-primary text-xs italic">
                    info.yayasanbdt@gmail.com
                  </p>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  className="text-danger font-bold"
                  startContent={<LogOut size={16} />}
                  onPress={() => navigate("/login")}
                >
                  Keluar Panel
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpenSidebar(true)}
            className="md:hidden p-2 rounded-xl text-secondary hover:bg-primary/10 transition-colors"
          >
            <AlignJustify size={28} />
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 bg-secondary/60 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${
          open_sidebar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpenSidebar(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-[280px] bg-white p-8 flex flex-col gap-6 transition-transform duration-300 ${
            open_sidebar ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center border-b pb-4">
            <img className="h-10" src="/logoBudiman.png" alt="Logo" />
            <button
              onClick={() => setOpenSidebar(false)}
              className="text-secondary p-1"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              {
                label: "Dashboard",
                path: "/",
                icon: <LayoutDashboard size={20} />,
              },
              {
                label: "Verifikasi Berkas",
                path: "/",
                icon: <UserCheck size={18} />,
              },
              {
                label: "Verikasi Pembayaran",
                path: "/pembayaran",
                icon: <HandCoins size={18} />,
              },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpenSidebar(false)}
                className={`flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${
                  isActive(item.path)
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-secondary hover:bg-primary/5"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t">
            <Button
              onPress={() => navigate("/login")}
              className="w-full bg-danger/10 text-danger font-bold h-14 rounded-2xl"
              startContent={<LogOut size={18} />}
            >
              Keluar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
