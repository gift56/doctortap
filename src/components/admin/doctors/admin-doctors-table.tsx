"use client";

import { useState } from "react";

import { AdminDoctorDetailsDrawer } from "@/components/admin/doctors/admin-doctor-details-drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AdminDoctorRow } from "@/lib/admin/admin-doctors";
import {
  formatAdminDoctorStatus,
  getAdminDoctorDetailProfile,
} from "@/lib/admin/admin-doctors";
import { cn } from "@/lib/utils";

const activeBadgeClassName =
  "w-max rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700";

const suspendedBadgeClassName =
  "w-max rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700";

function statusBadgeClassName(status: AdminDoctorRow["status"]): string {
  return status === "ACTIVE" ? activeBadgeClassName : suspendedBadgeClassName;
}

const tableCellClassName = "px-3 py-3 sm:px-6 sm:py-4";

interface AdminDoctorsTableProps {
  doctors: AdminDoctorRow[];
}

export function AdminDoctorsTable({ doctors }: AdminDoctorsTableProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<AdminDoctorRow | null>(
    null,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDetails = (doctor: AdminDoctorRow) => {
    setSelectedDoctor(doctor);
    setDrawerOpen(true);
  };

  const detailProfile = selectedDoctor
    ? getAdminDoctorDetailProfile(selectedDoctor)
    : null;

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Doctor ID
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Practitioner Name
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Medical Council ID
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Assigned Specialty
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Consult Fee
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Account Status
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Actions Window
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className={cn(
                    tableCellClassName,
                    "text-center text-sm text-text-secondary",
                  )}
                >
                  No doctors match your filters.
                </TableCell>
              </TableRow>
            ) : (
              doctors.map((doctor) => (
                <TableRow key={doctor.id} className="hover:bg-bg-surface">
                  <TableCell
                    className={cn(
                      tableCellClassName,
                      "font-medium text-text-primary",
                    )}
                  >
                    {doctor.id}
                  </TableCell>
                  <TableCell className={tableCellClassName}>
                    <p className="font-medium text-text-primary">{doctor.name}</p>
                  </TableCell>
                  <TableCell
                    className={cn(tableCellClassName, "text-text-primary")}
                  >
                    {doctor.councilId}
                  </TableCell>
                  <TableCell
                    className={cn(tableCellClassName, "text-text-primary")}
                  >
                    {doctor.specialty}
                  </TableCell>
                  <TableCell
                    className={cn(
                      tableCellClassName,
                      "font-medium text-text-primary",
                    )}
                  >
                    {doctor.fee}
                  </TableCell>
                  <TableCell className={tableCellClassName}>
                    <span
                      className={cn(
                        "inline-flex",
                        statusBadgeClassName(doctor.status),
                      )}
                    >
                      {formatAdminDoctorStatus(doctor.status)}
                    </span>
                  </TableCell>
                  <TableCell className={tableCellClassName}>
                    <button
                      type="button"
                      onClick={() => openDetails(doctor)}
                      className="cursor-pointer text-xs font-semibold text-accent-primary hover:underline"
                    >
                      View Details
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AdminDoctorDetailsDrawer
        doctor={detailProfile}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </>
  );
}
