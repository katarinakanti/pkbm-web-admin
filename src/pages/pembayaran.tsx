import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  useDisclosure,
  addToast,
} from "@heroui/react";
import { Eye, RefreshCcw, HandCoins } from "lucide-react";
import { useEffect, useState } from "react";
import { Header } from "../components/layout/Header";
import { AxiosClient } from "../api/AxiosClient";
import { UserUtility } from "../utils";
import moment from "moment";
import { PaymentVerificationModal } from "../components/PaymentVerificationModal";

export function PembayaranPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchPayments() {
    setLoading(true);
    try {
      const res = await AxiosClient.adminGetUserApplicationsList({
        headers: { authorization: UserUtility.getAuthHeader() },
        query: { limit: 100, offset: 0 },
      });

      const antreanBayar = res.data.filter(
        (app: any) =>
          app.status_application === "VERIFIED" || app.payment_proof_url
      );

      setData(antreanBayar);
    } catch (err: any) {
      addToast({ title: "Gagal memuat data pembayaran", color: "danger" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="min-h-screen bg-background-light">
      <Header />
      <div className="container mx-auto px-6 py-10 max-w-7xl space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <HandCoins size={24} />
            </div>
            <h2 className="text-3xl font-black text-secondary italic underline decoration-primary/30">
              Daftar Verikasi Pembayaran
            </h2>
          </div>
          <Button
            isIconOnly
            variant="flat"
            onPress={fetchPayments}
            isLoading={loading}
          >
            <RefreshCcw size={18} />
          </Button>
        </div>

        <div className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-secondary/5">
          <Table aria-label="Payment Table" removeWrapper className="p-4">
            <TableHeader>
              <TableColumn className="uppercase text-[10px] font-black tracking-widest text-secondary/40">
                Nama Siswa
              </TableColumn>
              {/* KOLOM JENJANG BARU */}
              <TableColumn className="uppercase text-[10px] font-black tracking-widest text-secondary/40">
                Jenjang
              </TableColumn>
              <TableColumn className="uppercase text-[10px] font-black tracking-widest text-secondary/40">
                Status Bayar
              </TableColumn>
              <TableColumn className="uppercase text-[10px] font-black tracking-widest text-secondary/40">
                Verfikasi Bukti Pembayaran
              </TableColumn>
              <TableColumn
                align="center"
                className="uppercase text-[10px] font-black tracking-widest text-secondary/40"
              >
                Aksi
              </TableColumn>
            </TableHeader>
            <TableBody
              items={data}
              emptyContent={loading ? "Memuat..." : "Antrean kosong"}
            >
              {(row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors"
                >
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-secondary">
                        {row.parent_fullname || row.full_name || "Siswa"}
                      </span>
                      <span className="text-xs text-zinc-400 font-medium">
                        ID: #{row.id}
                      </span>
                    </div>
                  </TableCell>

                  {/* CELL JENJANG DENGAN CHIP */}
                  <TableCell>
                    <Chip
                      size="sm"
                      variant="flat"
                      color="primary"
                      className="font-bold text-[10px] uppercase px-3"
                    >
                      {row.application_type}
                    </Chip>
                  </TableCell>

                  <TableCell>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={row.payment_status ? "success" : "warning"}
                      className="font-bold text-[10px] uppercase"
                    >
                      {row.payment_status ? "LUNAS" : "PENDING"}
                    </Chip>
                  </TableCell>

                  <TableCell>
                    <Chip
                      variant="dot"
                      color={
                        row.payment_verification_status === true
                          ? "success"
                          : row.payment_verification_status === false
                          ? "danger"
                          : "warning"
                      }
                      className="font-bold border-none text-[10px] uppercase"
                    >
                      {row.payment_verification_status === true
                        ? "Verified"
                        : row.payment_verification_status === false
                        ? "Rejected"
                        : "Menunggu Verifikasi"}
                    </Chip>
                  </TableCell>

                  <TableCell>
                    <Button
                      size="sm"
                      color="secondary"
                      className="font-bold rounded-lg px-4"
                      onPress={() => {
                        setSelectedApp(row);
                        onOpen();
                      }}
                      startContent={<Eye size={14} />}
                    >
                      Cek Bukti
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <PaymentVerificationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        application={selectedApp}
        onSuccess={fetchPayments}
      />
    </div>
  );
}
