import { useState } from "react";

import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import {
  Settings,
  Plus,
  Edit2,
  Trash2,
  DoorOpen,
  Calendar,
  Tag,
  Users,
} from "lucide-react";
import { Header } from "../components/layout/Header";

export function SettingsPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeTab, setActiveTab] = useState("occupancy");

  return (
    <div className="min-h-screen bg-background-light">
      <Header />
      <div className="container mx-auto px-6 py-10 max-w-6xl space-y-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-secondary rounded-2xl text-white shadow-lg">
            <Settings size={24} />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-secondary">
              Pengaturan Sistem
            </h1>
            <p className="text-secondary/50 font-medium">
              Konfigurasi operasional dan parameter akademik
            </p>
          </div>
        </div>

        <Tabs
          aria-label="Settings Options"
          color="primary"
          variant="underlined"
          classNames={{
            base: "w-full",
            tabList:
              "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-primary",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-primary font-bold",
          }}
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
        >
          {/* TAB 1: OCCUPANCY */}
          <Tab
            key="occupancy"
            title={
              <div className="flex items-center gap-2">
                <Users size={18} /> Okupansi Kelas
              </div>
            }
          >
            <Card className="mt-4 rounded-[32px] border-none shadow-sm">
              <CardBody className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-secondary">
                    Target & Kapasitas Paket
                  </h3>
                  <Button
                    color="primary"
                    size="sm"
                    startContent={<Plus size={18} />}
                    className="font-bold rounded-xl"
                    onPress={onOpen}
                  >
                    Atur Kapasitas
                  </Button>
                </div>
                <Table
                  aria-label="Occupancy Table"
                  shadow="none"
                  className="border border-zinc-100 rounded-2xl overflow-hidden"
                >
                  <TableHeader>
                    <TableColumn>PROGRAM</TableColumn>
                    <TableColumn>TARGET SISWA</TableColumn>
                    <TableColumn>TERISI</TableColumn>
                    <TableColumn align="center">AKSI</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell className="font-bold">Paket A (SD)</TableCell>
                      <TableCell>50 Siswa</TableCell>
                      <TableCell>42 Siswa</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button isIconOnly size="sm" variant="light">
                            <Edit2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </Tab>

          {/* TAB 2: ROOMS */}
          <Tab
            key="rooms"
            title={
              <div className="flex items-center gap-2">
                <DoorOpen size={18} /> List Ruangan
              </div>
            }
          >
            <Card className="mt-4 rounded-[32px] border-none shadow-sm">
              <CardBody className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-secondary">
                    Daftar Ruang Belajar
                  </h3>
                  <Button
                    color="primary"
                    size="sm"
                    startContent={<Plus size={18} />}
                    className="font-bold rounded-xl"
                  >
                    Tambah Ruangan
                  </Button>
                </div>
                <Table aria-label="Rooms Table" shadow="none">
                  <TableHeader>
                    <TableColumn>NAMA RUANG</TableColumn>
                    <TableColumn>LOKASI</TableColumn>
                    <TableColumn>KAPASITAS</TableColumn>
                    <TableColumn align="center">AKSI</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell className="font-bold">Ruang A1</TableCell>
                      <TableCell>Gedung Utama Lt. 1</TableCell>
                      <TableCell>25 Orang</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </Tab>

          {/* TAB 3: INTAKE PERIOD */}
          <Tab
            key="intake"
            title={
              <div className="flex items-center gap-2">
                <Calendar size={18} /> Periode Intake
              </div>
            }
          >
            <Card className="mt-4 rounded-[32px] border-none shadow-sm">
              <CardBody className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-secondary">
                    Periode Pendaftaran Aktif
                  </h3>
                  <Button
                    color="primary"
                    size="sm"
                    startContent={<Plus size={18} />}
                    className="font-bold rounded-xl"
                  >
                    Buka Periode
                  </Button>
                </div>
                <Table aria-label="Intake Table" shadow="none">
                  <TableHeader>
                    <TableColumn>NAMA PERIODE</TableColumn>
                    <TableColumn>MULAI</TableColumn>
                    <TableColumn>AKHIR</TableColumn>
                    <TableColumn align="center">STATUS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell className="font-bold">
                        Gelombang 1 - 2026
                      </TableCell>
                      <TableCell>01 Jan 2026</TableCell>
                      <TableCell>30 Jun 2026</TableCell>
                      <TableCell className="text-center">
                        <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-bold">
                          AKTIF
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </Tab>

          {/* TAB 4: PRICES */}
          <Tab
            key="prices"
            title={
              <div className="flex items-center gap-2">
                <Tag size={18} /> Biaya Paket
              </div>
            }
          >
            <Card className="mt-4 rounded-[32px] border-none shadow-sm">
              <CardBody className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-secondary">
                    Konfigurasi Biaya Pendidikan
                  </h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { pkg: "Paket A", price: "Rp 2.500.000" },
                    { pkg: "Paket B", price: "Rp 3.500.000" },
                    { pkg: "Paket C", price: "Rp 4.500.000" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-6 bg-background-light rounded-[24px] border border-secondary/5 space-y-4"
                    >
                      <p className="font-black text-secondary">{item.pkg}</p>
                      <Input
                        defaultValue={item.price}
                        variant="bordered"
                        label="Biaya Pendaftaran"
                        className="bg-white rounded-xl"
                      />
                      <Button
                        size="sm"
                        className="bg-secondary text-white w-full font-bold rounded-lg"
                      >
                        Simpan Harga
                      </Button>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>

      {/* MODAL PLACEHOLDER UNTUK CRUD */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="rounded-[32px]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-black text-secondary uppercase">
                Edit Kapasitas
              </ModalHeader>
              <ModalBody className="space-y-4">
                <Input
                  label="Nama Program"
                  defaultValue="Paket A"
                  variant="flat"
                />
                <Input label="Target Siswa Baru" type="number" variant="flat" />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose} className="font-bold">
                  Batal
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  className="font-bold bg-secondary"
                >
                  Simpan Perubahan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
