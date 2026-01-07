import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  useDisclosure,
  addToast,
} from "@heroui/react";
import { Search, Filter, Eye, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { Header } from "../components/layout/Header";
import { Verification } from "../components/VerificationModal";
import { AxiosClient } from "../api/AxiosClient";
import { UserUtility } from "../utils";
import { Application } from "../api/model/table/Application";
import moment from "moment";

export function VerifikasiPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<Application | null>(null);
  const [data, setData] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchApplications() {
    setLoading(true);
    try {
      console.log("fetchApplications");
      const res = await AxiosClient.adminGetUserApplicationsList({
        headers: { authorization: UserUtility.getAuthHeader() },
        query: { limit: 10, offset: 0 },
      });
      setData(res.data);
      console.log("res", res);
    } catch (err: any) {
      addToast({
        title:
          err?.response?.data?.toString() ?? err?.message ?? "Unknown Error",
      });
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchApplications();
  }, []);

  const handleOpenVerify = (user: any) => {
    setSelectedUser(user);
    onOpen();
  };

  return (
    <div className="min-h-screen bg-background-light">
      <Header />
      <div className="container mx-auto px-6 py-10 max-w-7xl space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-black text-secondary italic underline decoration-primary/30">
            Daftar Antrean Verifikasi
          </h2>
          <Button
            isIconOnly
            variant="flat"
            className="bg-white"
            onPress={() => fetchApplications()}
            aria-label="Refresh"
            disabled={loading}
          >
            <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
          </Button>
        </div>

        {/* TOOLBAR */}
        {/* <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-3xl shadow-sm border border-secondary/5">
          <Input
            isClearable
            className="w-full md:max-w-xs font-medium"
            placeholder="Cari Siswa..."
            startContent={<Search size={18} className="text-zinc-400" />}
            variant="flat"
          />
          <div className="flex gap-2">
            <Button
              variant="flat"
              startContent={<Filter size={18} />}
              className="font-bold"
            >
              Filter Paket
            </Button>
            <Button
              color="primary"
              className="font-bold rounded-xl shadow-lg shadow-primary/20"
            >
              Ekspor Data
            </Button>
          </div>
        </div> */}

        {/* TABLE */}
        <div className="relative bg-white rounded-[40px] shadow-xl overflow-hidden border border-secondary/5">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
              <div className="flex flex-col items-center gap-2">
                <RefreshCcw size={36} className="animate-spin text-primary" />
                <span className="text-sm font-medium text-secondary/70">
                  Loading...
                </span>
              </div>
            </div>
          )}
          <Table
            aria-label="Verifikasi Table"
            className="p-4"
            selectionMode="single"
          >
            <TableHeader>
              <TableColumn className="bg-transparent text-secondary/40 font-black tracking-widest uppercase text-[10px]">
                Nama Siswa
              </TableColumn>
              <TableColumn className="bg-transparent text-secondary/40 font-black tracking-widest uppercase text-[10px]">
                Jenjang
              </TableColumn>
              <TableColumn className="bg-transparent text-secondary/40 font-black tracking-widest uppercase text-[10px]">
                Tgl Pendaftaran
              </TableColumn>
              <TableColumn className="bg-transparent text-secondary/40 font-black tracking-widest uppercase text-[10px]">
                Status
              </TableColumn>
              <TableColumn
                align="center"
                className="bg-transparent text-secondary/40 font-black tracking-widest uppercase text-[10px]"
              >
                Aksi
              </TableColumn>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id_user}
                  className="border-b border-zinc-50 last:border-none hover:bg-background-light transition-colors"
                >
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-secondary">
                        {row.id_user}
                      </span>
                      <span className="text-xs text-zinc-400 font-medium">
                        {row.parent_email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      variant="flat"
                      color="primary"
                      className="font-bold text-[10px] uppercase"
                    >
                      {row.application_type}
                    </Chip>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-secondary/60 italic">
                    {moment(row.created_at).format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell>
                    <Chip
                      variant="dot"
                      color="warning"
                      className="font-bold border-none text-[10px] uppercase"
                    >
                      Pending
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      color="secondary"
                      className="font-bold rounded-lg px-4"
                      onPress={() => handleOpenVerify(row)}
                      startContent={<Eye size={14} />}
                    >
                      Proses Berkas
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Verification
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        user={
          selectedUser
            ? {
                name: String(selectedUser.id_user),
                email: selectedUser.parent_email,
                package: selectedUser.application_type,
                note: selectedUser.notes || "",
                status: selectedUser.status_application,
                application: selectedUser,
              }
            : null
        }
        applicationId={selectedUser?.id ?? null}
      />
    </div>
  );
}
