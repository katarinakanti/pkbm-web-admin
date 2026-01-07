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
import { Eye, RefreshCcw, UserCheck } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { Header } from "../components/layout/Header";
import { Verification } from "../components/VerificationModal";
import { AxiosClient } from "../api/AxiosClient";
import { UserUtility } from "../utils";
import { Application } from "../api/model/table/Application";
import { UserApplicant } from "../api/model/table/UserApplicant";
import moment from "moment";
import { ApplicationStatus } from "../api/model/enum/ApplicationStatus";

// Extend the Application type to include the UI-specific full_name
type ExtendedApplication = Application & { full_name: string };

export function VerifikasiPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<ExtendedApplication | null>(
    null
  );
  const [selectedApplicant, setSelectedApplicant] =
    useState<UserApplicant | null>(null);
  const [data, setData] = useState<ExtendedApplication[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchApplications() {
    setLoading(true);
    try {
      const res = await AxiosClient.adminGetUserApplicationsList({
        headers: { authorization: UserUtility.getAuthHeader() },
        query: { limit: 50, offset: 0 },
      });

      const applicantsRes = await AxiosClient.userGetUserApplicantsList({
        headers: { authorization: UserUtility.getAuthHeader() },
      });

      const applicantsList = applicantsRes || [];

      const merged: ExtendedApplication[] = (res.data || []).map((app: Application) => {
        const found = applicantsList.find(
          (a: { id: number }) => a.id === app.id_user_applicant
        );

        const full_name =
          app.full_name ||
          found?.fullname ||
          app.otm_id_user_applicant?.fullname ||
          app.parent_fullname ||
          app.parent_email ||
          "Unknown Student";

        return { ...app, full_name };
      });

      setData(merged);
    } catch (err: unknown) {
      const errorMessage = err && typeof err === 'object' && 'response' in err 
        ? String((err as { response?: { data?: unknown } }).response?.data) 
        : err instanceof Error ? err.message : "Unknown error";
      addToast({
        title: "Error fetching data",
        description: errorMessage,
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  // Filter logic
  const filteredItems = useMemo(() => {
    return data;
  }, [data]);

  const handleOpenVerify = (user: ExtendedApplication) => {
    setSelectedUser(user);
    // Look up the corresponding applicant
    const applicants = data;
    const found = applicants.find(
      (a: any) => a.id_user_applicant === user.id_user_applicant
    )?.otm_id_user_applicant;
    setSelectedApplicant(found || null);
    onOpen();
  };

  return (
    <div className="min-h-screen bg-background-light">
      <Header />
      <div className="container mx-auto px-6 py-10 max-w-7xl space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <UserCheck size={24} />
            </div>
            <h2 className="text-3xl font-black text-secondary italic underline decoration-primary/30">
              Daftar Verikasi Berkas
            </h2>
          </div>
          <Button
            isIconOnly
            variant="flat"
            className="bg-white"
            onPress={() => fetchApplications()}
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
            value={filterValue}
            onValueChange={setFilterValue}
            variant="flat"
          />
          <div className="flex gap-2">
            <Button
              variant="flat"
              startContent={<Filter size={18} />}
              className="font-bold"
            >
              Filter
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
          <Table
            aria-label="Verifikasi Table"
            className="p-4"
            selectionMode="single"
            removeWrapper
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
            <TableBody
              items={filteredItems}
              emptyContent={
                loading ? "Sedang memuat data..." : "Tidak ada data ditemukan"
              }
            >
              {(row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-zinc-50 last:border-none hover:bg-background-light transition-colors"
                >
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-secondary">
                        {row.full_name}
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
                    {(() => {
                      const isVerified =
                        row.status_application === ApplicationStatus.VERIFIED;
                      const isRejected =
                        row.status_application === ApplicationStatus.REJECTED;
                      const isPaid = row.payment_status === true;

                      let color: "success" | "warning" | "danger" = "warning";
                      let label = "Pending";

                      if (isVerified) {
                        color = "success";
                        label = "Verified";
                      } else if (isRejected) {
                        color = "danger";
                        label = "Rejected";
                      } else if (isPaid) {
                        color = "primary";
                        label = "Paid / Approved";
                      }

                      return (
                        <Chip
                          variant="dot"
                          color={color}
                          className="font-bold border-none text-[10px] uppercase"
                        >
                          {label}
                        </Chip>
                      );
                    })()}
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
              )}
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
                name: selectedUser.full_name,
                email: selectedUser.parent_email,
                package: selectedUser.application_type,
                note: selectedUser.notes || "",
                status: selectedUser.status_application,
                application: selectedUser,
              }
            : null
        }
        applicationId={selectedUser?.id ?? null}
        applicant={selectedApplicant}
      />
    </div>
  );
}
