import { useEffect, useState } from "react";
import { Input, Button, addToast } from "@heroui/react";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { AxiosClient } from "../api/AxiosClient";
import { UserUtility } from "../utils";

export function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading_submit, setLoadingSubmit] = useState<boolean>(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  async function handleLogin() {
    try {
      setLoadingSubmit(true);
      console.log("here");

      const res = await AxiosClient.loginAdmin({
        body: {
          email: data.email,
          password: data.password,
        },
      });
      console.log("res", res);

      UserUtility.setToken(res.token);
      addToast({
        title: `Selamat datang, ${res.admin.fullname}`,
      });
      navigate("/");
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === "object" && "response" in err
          ? String((err as { response?: { data?: unknown } }).response?.data)
          : err instanceof Error
          ? err.message
          : "Unknown Error";
      addToast({
        title: errorMessage,
      });
    } finally {
      setLoadingSubmit(false);
    }
  }

  useEffect(() => {
    console.log("LOGIN DATA CHANGED", data);
  }, [data]);

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />

      <div className="w-full max-w-[1100px] grid md:grid-cols-2 bg-white/5 backdrop-blur-xl rounded-[40px] border border-white/10 shadow-2xl overflow-hidden relative z-10">
        {/* LEFT SIDE: Branding & Info */}
        <div className="hidden md:flex flex-col justify-between p-12">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-2xl shadow-xl">
              <img
                className="h-10 w-10 object-contain"
                src="/logoBudiman.png"
                alt="Logo"
              />
            </div>
            <div className="text-white font-black leading-none">
              <div className="text-[10px] tracking-[0.2em] text-primary uppercase">
                Management
              </div>
              <div className="text-xl tracking-tighter">PORTAL ADMIN</div>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl font-black text-white leading-tight">
              Akses Kendali <br />
              <span className="text-primary italic">Budiman Drestanta</span>
            </h1>
            <p className="text-white/60 text-lg font-medium leading-relaxed">
              Silakan masuk untuk mengelola pendaftaran, verifikasi dokumen, dan
              pengaturan sistem akademik.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Login Form */}
        <div className="p-8 md:p-16 bg-white flex flex-col justify-center">
          <div className="mb-10 space-y-2">
            <h2 className="text-3xl font-black text-secondary">Sign In</h2>
            <p className="text-zinc-400 font-medium">
              Gunakan kredensial administrator Anda
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <Input
                type="email"
                value={data.email}
                onChange={(e) =>
                  setData((d) => ({ ...d, email: e.target.value }))
                }
                label="ID Administrator"
                labelPlacement="outside"
                placeholder="admin@email.id"
                variant="bordered"
                size="lg"
                classNames={{
                  label:
                    "font-black text-secondary uppercase text-[11px] tracking-widest",
                  inputWrapper:
                    "rounded-2xl border-2 group-data-[focus=true]:border-primary transition-all",
                }}
                startContent={<Mail className="text-zinc-400" size={20} />}
              />

              <Input
                value={data.password}
                onChange={(e) =>
                  setData((d) => ({ ...d, password: e.target.value }))
                }
                label="Password"
                labelPlacement="outside"
                placeholder="••••••••"
                variant="bordered"
                size="lg"
                classNames={{
                  label:
                    "font-black text-secondary uppercase text-[11px] tracking-widest",
                  inputWrapper:
                    "rounded-2xl border-2 group-data-[focus=true]:border-primary transition-all",
                }}
                startContent={<Lock className="text-zinc-400" size={20} />}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeOff className="text-zinc-400" size={20} />
                    ) : (
                      <Eye className="text-zinc-400" size={20} />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
            </div>

            {/* <div className="flex justify-between items-center px-1">
              <Checkbox
                size="sm"
                classNames={{ label: "text-zinc-500 font-bold" }}
              >
                Tetap Masuk
              </Checkbox>
              <button
                type="button"
                className="text-primary font-black text-xs uppercase hover:underline"
              >
                Butuh Bantuan?
              </button>
            </div> */}

            <Button
              type="submit"
              isLoading={loading_submit}
              className="w-full bg-secondary text-white font-black py-8 text-lg rounded-2xl"
            >
              LOG IN KE DASHBOARD
            </Button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-[10px] text-zinc-300 font-black uppercase tracking-widest leading-loose">
              &copy; 2026 Yayasan Budiman Drestanta Tiyasa <br />
              All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
