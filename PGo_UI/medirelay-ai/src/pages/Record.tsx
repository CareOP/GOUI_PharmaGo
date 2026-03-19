import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Calendar, Users, FileText } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/doctor", icon: <LayoutDashboard className="h-5 w-5" /> },
//   { label: "Appointments", href: "/doctor/appointments", icon: <Calendar className="h-5 w-5" /> },
  { label: "Patients", href: "/doctor/patients", icon: <Users className="h-5 w-5" /> },
  { label: "Records", href: "/doctor/records", icon: <FileText className="h-5 w-5" /> },
];

const records = [
  {
    id: "R001",
    patient: "Sarah Johnson",
    diagnosis: "Seasonal Flu",
    date: "March 15, 2026",
  },
  {
    id: "R002",
    patient: "Michael Chen",
    diagnosis: "Viral Fever",
    date: "March 14, 2026",
  },
  {
    id: "R003",
    patient: "Emily Davis",
    diagnosis: "Migraine",
    date: "March 12, 2026",
  },
];

export default function Record() {
  return (
    <DashboardLayout role="doctor" userName="Dr. Sarah Smith" navItems={navItems}>
      <div className="space-y-6">

        <h1 className="text-2xl font-bold">Medical Records</h1>

        {records.map((record) => (
          <Card key={record.id}>
            <CardHeader>
              <CardTitle>{record.patient}</CardTitle>
            </CardHeader>

            <CardContent className="flex justify-between items-center">

              <div className="space-y-1 text-sm">
                <p>Record ID: {record.id}</p>
                <p>Diagnosis: {record.diagnosis}</p>
                <p>Date: {record.date}</p>
              </div>

              <Button variant="outline">
                View Full Record
              </Button>

            </CardContent>
          </Card>
        ))}

      </div>
    </DashboardLayout>
  );
}