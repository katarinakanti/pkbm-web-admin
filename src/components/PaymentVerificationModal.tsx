import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Image,
  addToast,
} from "@heroui/react";
import { AxiosClient } from "../api/AxiosClient";
import { UserUtility } from "../utils";
import {
  CheckCircle,
  XCircle,
  Download,
  ExternalLink,
  ImageIcon,
} from "lucide-react";
import { Application } from "../api/model/table/Application";

interface PaymentVerificationProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  application: Application | null;
  onSuccess: () => void;
}

export function PaymentVerificationModal({
  isOpen,
  onOpenChange,
  application,
  onSuccess,
}: PaymentVerificationProps) {
  const [submitting, setSubmitting] = useState(false);

  /**
   * Menangani aksi verifikasi pembayaran
   * @param approve true untuk Konfirmasi Lunas, false untuk Tolak Bukti
   */
  async function handleAction(approve: boolean) {
    if (!application?.id) return;

    setSubmitting(true);
    try {
      await AxiosClient.adminVerifyPayment({
        headers: { authorization: UserUtility.getAuthHeader() },
        path: { id: application.id },
        body: {
          // Mengirimkan status verifikasi sesuai parameter
          payment_verification_status: approve,
        },
      });

      addToast({
        title: approve ? "Pembayaran Disetujui" : "Pembayaran Ditolak",
        color: approve ? "success" : "danger",
      });

      onSuccess(); // Refresh data di table utama
      onOpenChange(false); // Tutup modal
    } catch (err: unknown) {
      addToast({
        title: "Gagal memproses pembayaran",
        description: err instanceof Error ? err.message : "Terjadi kesalahan pada server",
        color: "danger",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const proofUrl = application?.payment_proof_url;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      backdrop="blur"
      className="rounded-[32px]"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 p-6">
          <h2 className="text-xl font-black text-secondary uppercase tracking-tight">
            Verifikasi Pembayaran
          </h2>
        </ModalHeader>
        <Divider />
        <ModalBody className="py-6 px-8">
          <div className="space-y-6">
            {/* Informasi Siswa */}
            <div className="flex justify-between items-center bg-zinc-50 p-5 rounded-2xl border border-zinc-100">
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">
                  Nama Pendaftar
                </p>
                <p className="font-bold text-secondary text-lg">
                  {application?.parent_fullname ||
                    application?.parent_email ||
                    "Nama Siswa"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">
                  ID Billing
                </p>
                <p className="font-bold text-primary text-lg italic">
                  #{application?.id}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-black text-secondary uppercase tracking-widest flex items-center gap-2">
                <ImageIcon size={16} className="text-primary" /> Bukti Transfer
              </p>

              {proofUrl ? (
                <div className="relative group rounded-3xl overflow-hidden border-2 border-dashed border-zinc-200 aspect-video bg-zinc-50 flex items-center justify-center transition-all hover:border-primary/50">
                  <Image
                    src={proofUrl}
                    alt="Bukti Pembayaran"
                    className="object-contain max-h-[350px] w-full"
                  />
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10">
                    <Button
                      as="a"
                      href={proofUrl}
                      target="_blank"
                      isIconOnly
                      className="bg-white text-secondary hover:bg-primary hover:text-white transition-colors"
                      radius="full"
                    >
                      <ExternalLink size={20} />
                    </Button>
                    <Button
                      as="a"
                      href={proofUrl}
                      download
                      isIconOnly
                      className="bg-white text-secondary hover:bg-primary hover:text-white transition-colors"
                      radius="full"
                    >
                      <Download size={20} />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="h-64 rounded-3xl bg-zinc-50 border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center text-zinc-400">
                  <ImageIcon
                    size={48}
                    strokeWidth={1}
                    className="mb-2 opacity-20"
                  />
                  <p className="text-xs font-bold uppercase tracking-widest opacity-50">
                    Belum ada bukti unggahan
                  </p>
                </div>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="p-6 bg-zinc-50/50 flex justify-between gap-3">
          <Button
            color="danger"
            variant="light"
            className="font-bold px-6"
            // Mengirim false untuk penolakan
            onPress={() => handleAction(false)}
            isLoading={submitting}
            startContent={!submitting && <XCircle size={18} />}
          >
            Tolak Bukti
          </Button>

          <Button
            color="primary"
            className="bg-secondary text-white font-black px-10 rounded-xl shadow-lg shadow-secondary/20"
            // Mengirim true untuk persetujuan
            onPress={() => handleAction(true)}
            isLoading={submitting}
            startContent={!submitting && <CheckCircle size={18} />}
          >
            Konfirmasi Lunas
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
