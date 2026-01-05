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
} from "@heroui/react";
import { Search, Filter, Eye, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { Header } from "../components/layout/Header";
import { Verification } from "../components/VerificationModal";

export function VerifikasiPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenVerify = (user: any) => {
    setSelectedUser(user);
    onOpen();
  };

  const data = [
    {
      id: 1,
      name: "Budi Santoso",
      email: "budi@mail.com",
      package: "Paket C",
      status: "pending",
      date: "02 Jan 2025",
    },
    {
      id: 2,
      name: "Siti Aminah",
      email: "siti@mail.com",
      package: "Paket B",
      status: "pending",
      date: "01 Jan 2025",
    },
    {
      id: 3,
      name: "Ani Wijaya",
      email: "ani@mail.com",
      package: "Paket A",
      status: "pending",
      date: "30 Des 2024",
    },
  ];

  return (
    <div className="min-h-screen bg-background-light">
      <Header />
      <div className="container mx-auto px-6 py-10 max-w-7xl space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-black text-secondary italic underline decoration-primary/30">
            Daftar Antrean Verifikasi
          </h2>
          <Button isIconOnly variant="flat" className="bg-white">
            <RefreshCcw size={18} />
          </Button>
        </div>

        {/* TOOLBAR */}
        <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-3xl shadow-sm border border-secondary/5">
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
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-secondary/5">
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
                  key={row.id}
                  className="border-b border-zinc-50 last:border-none hover:bg-background-light transition-colors"
                >
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-secondary">
                        {row.name}
                      </span>
                      <span className="text-xs text-zinc-400 font-medium">
                        {row.email}
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
                      {row.package}
                    </Chip>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-secondary/60 italic">
                    {row.date}
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
        user={selectedUser}
      />
    </div>
  );
}
