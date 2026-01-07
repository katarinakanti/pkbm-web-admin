import { Link } from "react-router";
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
} from "lucide-react";

export interface FooterProps {
  noPaddingHorizontal?: boolean;
}

export function Footer(props: FooterProps) {
  return (
    <footer
      className={`
      ${props.noPaddingHorizontal ? "" : "px-6 xl:px-[10%]"} 
      py-16 bg-secondary text-white relative overflow-hidden
    `}
    >
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32" />

      <div className="flex flex-col md:flex-row gap-12 md:gap-20 relative z-10">
        {/* BRAND COLUMN */}
        <div className="flex flex-col gap-6 md:flex-1">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl shadow-lg shadow-black/20">
              <img
                className="w-10 object-contain"
                src="/logoBudiman.png"
                alt="Logo"
              />
            </div>
            <div className="font-bold text-xl tracking-tight leading-tight">
              PKBM <br />
              <span className="text-primary">Budiman Drestanta</span>
            </div>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
            Membangun masa depan melalui pendidikan alternatif yang inklusif,
            fleksibel, dan berfokus pada potensi unik setiap siswa.
          </p>

          <div className="flex items-center gap-4">
            {[
              {
                Icon: () => (
                  <img
                    className="w-5 h-5 brightness-0 invert"
                    src="https://www.svgrepo.com/show/500461/whatsapp.svg"
                    alt="WA"
                  />
                ),
                href: "https://wa.me/6281277653313",
              },
              {
                Icon: Facebook,
                href: "https://web.facebook.com/profile.php?id=100082845901246",
              },
            ].map(({ Icon, href }, i) => (
              <Link
                key={i}
                to={href}
                className="p-2 rounded-full bg-white/5 hover:bg-primary transition-all duration-300 text-white flex items-center justify-center"
              >
                {/* Jika Icon adalah komponen (Lucide), panggil dengan size. Jika fungsi/img, render langsung */}
                {typeof Icon === "function" && Icon.name === "" ? (
                  <Icon />
                ) : (
                  <Icon size={18} />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="flex flex-col gap-6 md:w-40">
          <h4 className="text-lg font-bold border-b border-primary/30 pb-2 inline-block">
            Tautan
          </h4>
          <nav className="flex flex-col gap-3">
            {[
              { name: "Tentang Kami", path: "/tentang-kami" },
              { name: "Program", path: "/program" },
              { name: "Admisi", path: "/admisi" },
              { name: "Kontak", path: "/kontak" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-zinc-400 hover:text-primary transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* LOCATION MAP */}
        <div className="flex flex-col gap-6 md:flex-[1.5]">
          <h4 className="text-lg font-bold border-b border-primary/30 pb-2 inline-block">
            Lokasi Kami
          </h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-zinc-300 text-sm italic leading-relaxed">
              <MapPin size={20} className="text-primary shrink-0" />
              <span>Ruko Botania 2 Blok A23 No.1, Batam City</span>
            </div>
            <div className="rounded-2xl overflow-hidden border-2 border-white/5 shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.070812451973!2d104.08441897595202!3d1.1091128623003086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d98987a513263d%3A0xd0f2160c56d04d09!2sPKBM%20Budiman%20Drestanta%20Tiyasa!5e0!3m2!1sen!2sid!4v1767028440915!5m2!1sen!2sid"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* CONTACT / CTA */}
        <div className="flex flex-col gap-6 md:flex-1">
          <h4 className="text-lg font-bold border-b border-primary/30 pb-2 inline-block">
            Hubungi Kami
          </h4>
          <div className="space-y-4">
            <p className="text-sm text-zinc-400">
              Ada pertanyaan? Tim kami siap membantu Anda.
            </p>

            <Link
              to="https://wa.me/628117778132"
              className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] transition-all px-6 py-3 rounded-full font-bold text-white shadow-lg shadow-green-900/20 self-start group"
            >
              <img
                className="w-5 h-5 brightness-0 invert"
                src="https://www.svgrepo.com/show/500461/whatsapp.svg"
                alt="WA"
              />
              <span>WhatsApp Kami</span>
            </Link>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <Mail size={18} className="text-primary" />
                <span>info.yayasanbdt@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <Phone size={18} className="text-primary" />
                <span>0811 777 8132</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-zinc-500 tracking-wider uppercase">
        <div>
          © 2025 PKBM Budiman Drestanta & 210 Roomi Studios. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
}
