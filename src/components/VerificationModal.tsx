import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  addToast,
  Chip,
} from "@heroui/react";
import { AxiosClient } from "../api/AxiosClient";
import { UserUtility } from "../utils";
import {
  CheckCircle,
  FileText,
  XCircle,
  Download,
  User as UserIcon,
  BookOpen,
  GraduationCap,
  Phone,
} from "lucide-react";
import { ApplicationStatus } from "../api/model/enum/ApplicationStatus";
import { Application } from "../api/model/table/Application";
import { UserApplicant } from "../api/model/table/UserApplicant";
import moment from "moment";

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
  applicant?: UserApplicant | null;
}

export function Verification(props: VerificationProps) {
  const [submitting, setSubmitting] = useState(false);
  const [notes, setNotes] = useState("");
  const [fetchedApplicant, setFetchedApplicant] =
    useState<UserApplicant | null>(null);

  useEffect(() => {
    if (props.isOpen) {
      const existingNotes =
        props.user?.application?.notes || props.user?.note || "";
      setNotes(existingNotes);
    }
  }, [props.isOpen, props.user]);

  // Fetch applicant data from API when modal opens
  useEffect(() => {
    const fetchApplicant = async () => {
      if (!props.isOpen || !props.user?.application?.id_user_applicant) return;

      try {
        const res = await AxiosClient.userGetUserApplicantsList({
          headers: { authorization: UserUtility.getAuthHeader() },
        });

        const applicantsList = res || [];
        const found = applicantsList.find(
          (a: UserApplicant) =>
            a.id === props.user?.application?.id_user_applicant
        );

        setFetchedApplicant(found || null);
      } catch (err) {
        console.error("Failed to fetch applicant", err);
      }
    };

    fetchApplicant();
  }, [props.isOpen, props.user?.application?.id_user_applicant]);

  async function handleAction(status: ApplicationStatus) {
    if (!props.applicationId) return;
    setSubmitting(true);
    try {
      await AxiosClient.adminVerifyApplicationById({
        headers: { authorization: UserUtility.getAuthHeader() },
        path: { id_application: props.applicationId },
        body: { application_status: status, notes: notes },
      });
      addToast({ title: "Status Berhasil Diperbarui", color: "success" });
      props.onOpenChange(false);
    } catch (err: unknown) {
      addToast({ title: err instanceof Error ? err.message : "Gagal memverifikasi" });
    } finally {
      setSubmitting(false);
    }
  }
  async function handleReject() {
    if (!props.applicationId) return;
    setSubmitting(true);
    try {
      console.log(
        "Denying application:",
        props.applicationId,
        "with notes:",
        notes
      );
      await AxiosClient.adminVerifyApplicationById({
        headers: { authorization: UserUtility.getAuthHeader() },
        path: { id_application: props.applicationId },
        body: {
          application_status: ApplicationStatus.REJECTED,
          notes: notes,
        },
      });
      console.log("deny berhasil");
      addToast({ title: "Aplikasi berhasil ditolak" });
      props.onOpenChange(false);
    } catch (err: unknown) {
      addToast({ title: err instanceof Error ? err.message : "Gagal memverifikasi" });
    } finally {
      setSubmitting(false);
    }
  }

  const app = props.user?.application;
  const applicant =
    fetchedApplicant || props.applicant || app?.otm_id_user_applicant;

  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      size="5xl" // Changed to 5xl for a centered look on desktop
      scrollBehavior="inside"
      backdrop="blur"
      placement="center" // Ensures it is centered
      className="rounded-[40px] shadow-2xl overflow-hidden mx-4 md:mx-0" // High rounding and mobile margins
    >
      <ModalContent>
        <>
          <ModalHeader className="p-6 md:p-8 bg-zinc-50 border-b">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary shrink-0">
                  <GraduationCap size={32} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl md:text-2xl font-black text-secondary uppercase tracking-tight truncate">
                    Verifikasi Pendaftaran
                  </h2>
                  <p className="text-xs md:text-sm text-zinc-500">
                    ID: #{props.applicationId} •{" "}
                    {moment(app?.created_at).format("DD MMM YYYY")}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Chip
                  color="secondary"
                  variant="shadow"
                  size="sm"
                  className="font-bold px-2 md:px-4"
                >
                  PAKET {app?.application_type}
                </Chip>
                <Chip variant="flat" size="sm" className="font-bold uppercase">
                  {app?.student_status}
                </Chip>
              </div>
            </div>
          </ModalHeader>

          <ModalBody className="p-6 md:p-8 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
              {/* COL 1: DOCUMENTS */}
              <div className="space-y-6">
                <SectionHeader
                  icon={<FileText size={16} />}
                  title="Berkas Lampiran"
                />
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "KK", key: "kk_url" },
                    { label: "Akte", key: "akta_lahir_url" },
                    { label: "KTP", key: "ktp_ortu_url" },
                    { label: "Foto", key: "photo_url" },
                    { label: "Selfie", key: "selfie_url" },
                    { label: "Ijazah", key: "ijazah_terakhir_url" },
                    { label: "Rapor", key: "raport_url" },
                    { label: "Mutasi", key: "surat_pindah_url" },
                  ].map((doc) => {
                    const url = app?.[doc.key as keyof Application] as string;
                    const CardContent = (
                      <>
                        <FileText
                          size={20}
                          className={url ? "text-primary" : "text-zinc-300"}
                        />
                        <span className="text-[10px] font-black uppercase mt-1 text-zinc-500">
                          {doc.label}
                        </span>
                        {url && (
                          <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-all">
                            <div className="flex items-center justify-center w-7 h-7 bg-primary/10 rounded-lg text-primary backdrop-blur-sm">
                              <Download size={14} />
                            </div>
                          </div>
                        )}
                        {!url && (
                          <span className="text-[8px] text-zinc-400 font-bold">
                            KOSONG
                          </span>
                        )}
                      </>
                    );

                    return (
                      <div key={doc.key} className="relative">
                        {url ? (
                          <a
                            href={url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group h-20 md:h-24 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all border-primary/30 bg-primary/5 hover:bg-white hover:border-primary cursor-pointer overflow-hidden"
                          >
                            {CardContent}
                          </a>
                        ) : (
                          <div className="h-20 md:h-24 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center border-zinc-100 bg-zinc-50 opacity-60">
                            {CardContent}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* COL 2: STUDENT DATA */}
              <div className="space-y-8 bg-zinc-50/50 p-6 rounded-[40px] border border-zinc-100">
                <div className="space-y-6">
                  <SectionHeader icon={<UserIcon size={16} />} title="Siswa" />
                  <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                    <DataBox
                      label="Nama"
                      value={applicant?.fullname}
                      isFullWidth
                    />
                    <DataBox
                      label="Gender"
                      value={applicant?.gender === "M" ? "L" : "P"}
                    />
                    <DataBox label="Agama" value={applicant?.religion} />
                    <DataBox label="Lahir" value={applicant?.birth_place} />
                    <DataBox
                      label="Tgl"
                      value={
                        applicant?.birth_date
                          ? moment(applicant.birth_date).format("DD/MM/YY")
                          : "-"
                      }
                    />
                    <DataBox
                      label="Email"
                      value={applicant?.email}
                      isFullWidth
                    />
                  </div>
                </div>

                <Divider />

                <div className="space-y-6">
                  <SectionHeader
                    icon={<BookOpen size={16} />}
                    title="Akademik"
                  />
                  <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                    <DataBox label="NIK" value={app?.nik} />
                    <DataBox label="NISN" value={app?.nisn} />
                    <DataBox
                      label="Sekolah"
                      value={app?.asal_sekolah}
                      isFullWidth
                    />
                    <DataBox label="Jenjang" value={app?.pendidikan_terakhir} />
                    <DataBox label="Grade" value={app?.grade_terakhir} />
                    <DataBox label="Status Siswa" value={app?.student_status} />
                    <DataBox
                      label="Alasan Pindah"
                      value={app?.alasan_pindah}
                      isFullWidth
                    />
                  </div>
                </div>
              </div>

              {/* COL 3: PARENTS & ACTION */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <SectionHeader icon={<Phone size={16} />} title="Orang Tua" />
                  <div className="p-6 bg-secondary text-white rounded-[40px] space-y-4 shadow-lg">
                    <DataBox label="Nama" value={app?.parent_fullname} light />
                    <DataBox label="WhatsApp" value={app?.parent_phone} light />
                    <DataBox label="Email" value={app?.parent_email} light />
                  </div>
                </div>

                <div className="space-y-4">
                  <SectionHeader
                    icon={<CheckCircle size={16} />}
                    title="Verifikasi"
                  />
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Catatan pendaftar..."
                    className="w-full h-32 md:h-40 p-5 rounded-[30px] border-2 border-zinc-100 bg-zinc-50 focus:bg-white focus:border-primary transition-all outline-none text-sm font-medium resize-none shadow-inner"
                    disabled={
                      props.user?.status !== ApplicationStatus.SUBMITTED
                    }
                  />
                </div>
              </div>
            </div>
          </ModalBody>

          {props.user?.status === ApplicationStatus.SUBMITTED && (
            <ModalFooter className="p-6 md:p-8 bg-zinc-50 border-t flex flex-col md:flex-row gap-3 md:justify-between">
              <Button
                variant="light"
                color="danger"
                onPress={() => handleAction(ApplicationStatus.REJECTED)}
                isLoading={submitting}
                className="font-black rounded-2xl w-full md:w-auto px-10 h-14"
                startContent={!submitting && <XCircle size={20} />}
              >
                TOLAK
              </Button>

              <Button
                color="primary"
                onPress={() => handleAction(ApplicationStatus.VERIFIED)}
                isLoading={submitting}
                className="bg-secondary text-white font-black rounded-2xl w-full md:w-auto px-12 h-14 shadow-xl shadow-secondary/30"
                startContent={!submitting && <CheckCircle size={20} />}
              >
                TERIMA
              </Button>
            </ModalFooter>
          )}
        </>
      </ModalContent>
    </Modal>
  );
}

function SectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
      <span className="text-primary">{icon}</span>
      <h4 className="font-black text-[11px] text-secondary uppercase tracking-[0.2em]">
        {title}
      </h4>
    </div>
  );
}

function DataBox({
  label,
  value,
  isFullWidth = false,
  light = false,
}: {
  label: string;
  value: any;
  isFullWidth?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`${isFullWidth ? "col-span-2" : "col-span-1"} space-y-0.5`}>
      <p
        className={`text-[8px] font-black uppercase tracking-widest ${
          light ? "text-white/40" : "text-zinc-400"
        }`}
      >
        {label}
      </p>
      <p
        className={`text-xs font-bold leading-tight truncate ${
          light ? "text-white" : "text-secondary"
        }`}
      >
        {value || "-"}
      </p>
    </div>
  );
}
