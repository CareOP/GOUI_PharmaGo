import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

import {
  LayoutDashboard,
  Calendar,
  FileText,
  Bell,
  User
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/patient", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Appointments", href: "/patient/appointments", icon: <Calendar className="h-5 w-5" /> },
  { label: "Prescriptions", href: "/patient/prescriptions", icon: <FileText className="h-5 w-5" /> },
  { label: "Notifications", href: "/patient/notifications", icon: <Bell className="h-5 w-5" /> },
  { label: "Profile", href: "/patient/profile", icon: <User className="h-5 w-5" /> },
];

export default function Appointments() {
  const appointments = [
    { id: 1, doctor: "Dr. Smith", date: "March 18, 2026", time: "09:30 AM", status: "Confirmed" },
    { id: 2, doctor: "Dr. Patel", date: "March 20, 2026", time: "10:30 AM", status: "Confirmed" },
    { id: 3, doctor: "Dr. Johnson", date: "March 25, 2026", time: "02:00 PM", status: "Pending" },
  ];

  return (
    <DashboardLayout role="patient" userName="Sarah Johnson" navItems={navItems}>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Appointments</h1>

        {appointments.map((appt) => (
          <Card key={appt.id}>
            <CardHeader>
              <CardTitle>{appt.doctor}</CardTitle>
            </CardHeader>

            <CardContent className="flex justify-between items-center">
              <div>
                <p>Date: {appt.date}</p>
                <p>Time: {appt.time}</p>
                <p>Status: {appt.status}</p>
              </div>

              <Button>View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}