import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  Divider,
  User,
  addToast,
} from "@heroui/react";
import { AxiosClient } from "../api/AxiosClient";
import { UserUtility } from "../utils";
import {
  CheckCircle,
  FileText,
  MapPin,
  Clock,
  XCircle,
  ExternalLink,
  Download,
} from "lucide-react";
import { ApplicationStatus } from "../api/model/enum/ApplicationStatus";
import { Application } from "../api/model/table/Application";

export interface VerificationProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  user: {
    name: string;
    email: string;
    package: string;
    note: string;
    status: ApplicationStatus;
    application: Application;
  } | null;
  applicationId?: number | null;
}

export function Verification(props: VerificationProps) {
  const [submitting, setSubmitting] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    console.log("NOTES CHANGED", notes);
  }, [notes]);
  useEffect(() => {
    if (props.isOpen) {
      if (props.user?.note) {
        setNotes(props.user.note);
      } else {
        setNotes("");
      }
    }
  }, [props.applicationId, props.isOpen]);

  async function handleVerify() {
    if (!props.applicationId) return;
    setSubmitting(true);
    try {
      console.log(
        "Verifying application:",
        props.applicationId,
        "with notes:",
        notes
      );
      await AxiosClient.adminVerifyApplicationById({
        headers: { authorization: UserUtility.getAuthHeader() },
        path: { id_application: props.applicationId },
        body: {
          application_status: ApplicationStatus.VERIFIED,
          notes: notes,
        },
      });
      console.log("berhasil");
      addToast({ title: "Aplikasi berhasil diverifikasi" });
      props.onOpenChange(false);
    } catch (err: any) {
      addToast({ title: err?.message ?? "Gagal memverifikasi" });
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      size="4xl"
      scrollBehavior="inside"
      backdrop="blur"
      className="rounded-[40px] border border-white/20 shadow-2xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 p-8 bg-background-light">
              <div className="flex justify-between items-start w-full">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-secondary uppercase tracking-tight">
                    Verifikasi Pendaftar
                  </h2>
                  <p className="text-sm text-secondary/50 font-medium">
                    Tinjau berkas dan tentukan jadwal belajar siswa.
                  </p>
                </div>
                {props.user && (
                  <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-secondary/5 flex items-center gap-3">
                    <User
                      name={props.user.name}
                      description={props.user.package}
                      avatarProps={{
                        size: "sm",
                        className: "bg-primary/20 text-primary font-bold",
                      }}
                      classNames={{
                        name: "font-bold text-secondary",
                        description:
                          "text-primary text-[10px] font-black uppercase",
                      }}
                    />
                  </div>
                )}
              </div>
            </ModalHeader>

            <Divider />

            <ModalBody className="p-8">
              <div className="grid md:grid-cols-2 gap-12">
                {/* DOKUMEN PREVIEW - KIRI */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-zinc-400 uppercase tracking-[0.2em]">
                      Dokumen Terlampir
                    </h4>
                    <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full font-bold">
                      4 File
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {props.user?.application &&
                      [
                        { label: "Kartu Keluarga", key: "kk_url" },
                        { label: "Akte Lahir", key: "akta_lahir_url" },
                        { label: "KTP Ortu", key: "ktp_ortu_url" },
                        {
                          label: "Ijazah Terakhir",
                          key: "ijazah_terakhir_url",
                        },
                        // { label: "Raport", key: "raport_url" },
                        // { label: "Photo", key: "photo_url" },
                        // { label: "Selfie", key: "selfie_url" },
                      ].map((doc) => {
                        const url = props.user?.application?.[
                          doc.key as keyof typeof props.user.application
                        ] as string | undefined;
                        const fileUrl = url
                          ? `https://api-fir1.onrender.com${url}`
                          : null;

                        return (
                          <div
                            key={doc.key}
                            className="aspect-video bg-background-light rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 group hover:border-primary hover:bg-white transition-all relative overflow-hidden"
                            style={{ cursor: fileUrl ? "pointer" : "default" }}
                          >
                            {fileUrl && (
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0"
                                title={`View ${doc.label}`}
                              />
                            )}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                              {fileUrl && (
                                <>
                                  {/* <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      window.open(fileUrl, "_blank");
                                    }}
                                    className="p-1 bg-primary/10 hover:bg-primary/20 rounded text-primary"
                                    title="View"
                                  >
                                    <ExternalLink size={14} />
                                  </button> */}
                                  <a
                                    href={fileUrl}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-1 bg-primary/10 hover:bg-primary/20 rounded text-primary"
                                    title="Download"
                                  >
                                    <Download size={14} />
                                  </a>
                                </>
                              )}
                            </div>
                            <FileText
                              className="text-zinc-300 group-hover:text-primary group-hover:scale-110 transition-transform"
                              size={28}
                            />
                            <span className="text-[10px] mt-3 font-bold text-secondary/60 group-hover:text-primary uppercase tracking-tight text-center px-2">
                              {doc.label}
                            </span>
                            {!fileUrl && (
                              <span className="text-[8px] text-red-500 font-bold mt-1">
                                No File
                              </span>
                            )}
                          </div>
                        );
                      })}
                  </div>

                  <div className="p-4 bg-secondary/5 rounded-2xl border border-secondary/10">
                    <p className="text-[10px] text-secondary/40 font-bold uppercase mb-1">
                      Catatan Admin:
                    </p>
                    <p className="text-xs text-secondary/70 leading-relaxed italic">
                      "Pastikan NIK pada KK sesuai dengan data Dapodik sekolah
                      sebelumnya."
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-xs text-zinc-400 uppercase tracking-[0.2em]">
                    Notes
                  </h4>
                  <div className="space-y-5">
                    <textarea
                      value={notes}
                      onChange={(e) => {
                        console.log("TEXTAREA INPUT:", e.target.value);
                        setNotes(e.target.value);
                      }}
                      placeholder="Tambahkan catatan untuk pendaftar di sini..."
                      className="w-full h-32 p-4 border border-secondary/10 rounded-2xl bg-background-light text-secondary text-sm font-medium placeholder:text-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    />
                  </div>
                </div>

                {/* PENENTUAN JADWAL - KANAN */}
                {/* <div className="space-y-8">
                  <h4 className="font-bold text-xs text-zinc-400 uppercase tracking-[0.2em]">
                    Penempatan Siswa
                  </h4>

                  <div className="space-y-5">
                    <Select
                      label="Ruang Kelas"
                      variant="flat"
                      labelPlacement="outside"
                      placeholder="Pilih Ruangan"
                      startContent={
                        <MapPin size={18} className="text-primary" />
                      }
                      className="font-bold"
                    >
                      <SelectItem
                        key="r1"
                        className="font-medium text-secondary"
                      >
                        Ruang A1 - Gedung Utama
                      </SelectItem>
                      <SelectItem
                        key="r2"
                        className="font-medium text-secondary"
                      >
                        Ruang B2 - Lab Komputer
                      </SelectItem>
                      <SelectItem
                        key="r3"
                        className="font-medium text-secondary"
                      >
                        Ruang Belajar Mandiri
                      </SelectItem>
                    </Select>

                    <Select
                      label="Sesi Belajar"
                      variant="flat"
                      labelPlacement="outside"
                      placeholder="Pilih Sesi"
                      startContent={
                        <Clock size={18} className="text-primary" />
                      }
                      className="font-bold"
                    >
                      <SelectItem
                        key="s1"
                        className="font-medium text-secondary"
                      >
                        Pagi (08:00 - 11:00)
                      </SelectItem>
                      <SelectItem
                        key="s2"
                        className="font-medium text-secondary"
                      >
                        Siang (13:00 - 15:00)
                      </SelectItem>
                      <SelectItem
                        key="s3"
                        className="font-medium text-secondary"
                      >
                        Sore (15:30 - 17:30)
                      </SelectItem>
                    </Select>

                    <Select
                      label="Hari Tatap Muka"
                      variant="flat"
                      labelPlacement="outside"
                      placeholder="Pilih Hari"
                      selectionMode="multiple"
                      className="font-bold"
                    >
                      {[
                        "Senin",
                        "Selasa",
                        "Rabu",
                        "Kamis",
                        "Jumat",
                        "Sabtu",
                      ].map((day) => (
                        <SelectItem
                          key={day.toLowerCase()}
                          className="font-medium text-secondary"
                        >
                          {day}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  <div className="p-5 bg-primary/5 rounded-[28px] border border-primary/10 space-y-2">
                    <p className="text-xs font-black text-primary uppercase tracking-widest">
                      Informasi
                    </p>
                    <p className="text-[11px] text-secondary/70 leading-relaxed">
                      Setelah menekan tombol terima, sistem akan otomatis
                      mengirimkan email konfirmasi dan jadwal kepada siswa yang
                      bersangkutan.
                    </p>
                  </div>
                </div> */}
              </div>
            </ModalBody>
            {props.user?.status === ApplicationStatus.VERIFIED ? null : (
              <ModalFooter className="p-8 bg-background-light flex justify-between items-center">
                <Button
                  variant="light"
                  color="danger"
                  onPress={onClose}
                  className="font-bold rounded-xl px-6"
                  startContent={<XCircle size={18} />}
                >
                  Tolak & Kirim Revisi
                </Button>

                <div className="flex gap-3">
                  <Button
                    color="primary"
                    className="bg-secondary text-white font-black px-10 rounded-xl shadow-xl shadow-secondary/20"
                    onPress={handleVerify}
                    startContent={<CheckCircle size={18} />}
                    disabled={submitting}
                  >
                    {submitting ? "Processing..." : "Terima & Publikasi"}
                  </Button>
                </div>
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
