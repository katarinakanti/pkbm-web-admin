import { Button, Card, CardBody, Chip, Progress } from "@heroui/react";
import {
  ArrowUpRight,
  Calendar,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "../components/layout/Header";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-background-light">
      <Header />
      <div className="container mx-auto px-6 py-10 max-w-7xl space-y-8">
        {/* ROW 1: BIG STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-secondary text-white rounded-[40px] p-4 shadow-xl border-none overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl" />
            <CardBody className="p-8 space-y-4">
              <div className="p-3 bg-white/10 w-fit rounded-2xl">
                <Users className="text-primary" />
              </div>
              <div>
                <h3 className="text-4xl font-black">248</h3>
                <p className="text-white/50 text-sm font-bold uppercase tracking-widest">
                  Total Siswa Aktif
                </p>
              </div>
              <div className="flex gap-2 items-center text-accent text-xs font-bold">
                <ArrowUpRight size={14} /> +12% dari bulan lalu
              </div>
            </CardBody>
          </Card>

          <Card className="bg-white rounded-[40px] p-4 shadow-sm border border-secondary/5">
            <CardBody className="p-8 space-y-4">
              <div className="p-3 bg-warning/10 w-fit rounded-2xl">
                <Clock className="text-warning" />
              </div>
              <div>
                <h3 className="text-4xl font-black text-secondary">14</h3>
                <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest">
                  Antrean Verifikasi
                </p>
              </div>
              <Button
                as={Link}
                to="/verifikasi"
                variant="flat"
                color="warning"
                className="font-bold rounded-xl w-full"
              >
                Proses Sekarang
              </Button>
            </CardBody>
          </Card>

          <Card className="bg-white rounded-[40px] p-4 shadow-sm border border-secondary/5">
            <CardBody className="p-8 space-y-4">
              <div className="p-3 bg-accent/10 w-fit rounded-2xl">
                <CheckCircle className="text-accent" />
              </div>
              <div>
                <h3 className="text-4xl font-black text-secondary">92%</h3>
                <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest">
                  Tingkat Kelulusan
                </p>
              </div>
              <Progress value={92} color="success" className="h-2" />
            </CardBody>
          </Card>
        </div>

        {/* ROW 2: QUOTA TRACKER (VISUAL) */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="rounded-[40px] p-8 border-none shadow-xl bg-white">
            <h3 className="text-2xl font-black text-secondary mb-8 flex items-center gap-3">
              <div className="w-2 h-8 bg-primary rounded-full" />
              Okupansi Kelas
            </h3>
            <div className="space-y-8">
              {[
                {
                  label: "Paket A (SD)",
                  used: 40,
                  total: 50,
                  color: "primary",
                },
                {
                  label: "Paket B (SMP)",
                  used: 85,
                  total: 100,
                  color: "warning",
                },
                {
                  label: "Paket C (SMA)",
                  used: 115,
                  total: 120,
                  color: "success",
                },
              ].map((item, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between font-bold text-secondary italic">
                    <span>{item.label}</span>
                    <span>
                      {item.used}/{item.total}
                    </span>
                  </div>
                  <Progress
                    value={(item.used / item.total) * 100}
                    color={item.color as any}
                    size="md"
                    radius="sm"
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[40px] p-8 border-none shadow-xl bg-white">
            <h3 className="text-2xl font-black text-secondary mb-6 flex items-center gap-3">
              <Calendar className="text-primary" />
              Kalender Akademik
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-background-light rounded-2xl border-l-4 border-primary flex justify-between items-center">
                <div>
                  <p className="font-bold text-secondary">
                    Ujian Kesetaraan Paket C
                  </p>
                  <p className="text-xs text-zinc-400">12 - 15 Januari 2026</p>
                </div>
                <Chip size="sm" color="primary">
                  Mendatang
                </Chip>
              </div>
              <div className="p-4 bg-background-light rounded-2xl border-l-4 border-zinc-200 flex justify-between items-center opacity-50">
                <div>
                  <p className="font-bold text-secondary">
                    Cuti Bersama Akhir Tahun
                  </p>
                  <p className="text-xs text-zinc-400">24 - 26 Desember 2025</p>
                </div>
                <Chip size="sm">Selesai</Chip>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
