import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Calendar, Users, FileText } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/doctor", icon: <LayoutDashboard className="h-5 w-5" /> },
//   { label: "Appointments", href: "/doctor/appointments", icon: <Calendar className="h-5 w-5" /> },
  { label: "Patients", href: "/doctor/patients", icon: <Users className="h-5 w-5" /> },
  { label: "Records", href: "/doctor/records", icon: <FileText className="h-5 w-5" /> },
];

const patients = [
  { id: "P001", name: "Sarah Johnson", age: 34, condition: "Fever", status: "Active" },
  { id: "P002", name: "Michael Chen", age: 45, condition: "Flu", status: "Under Treatment" },
  { id: "P003", name: "Emily Davis", age: 28, condition: "Headache", status: "Recovered" },
  { id: "P004", name: "Lisa Anderson", age: 39, condition: "Cough", status: "Active" },
];

export default function Patient() {
  return (
    <DashboardLayout role="doctor" userName="Dr. Sarah Smith" navItems={navItems}>
      <div className="space-y-6">

        <h1 className="text-2xl font-bold">Patients</h1>

        <div className="grid gap-4">
          {patients.map((patient) => (
            <Card key={patient.id}>
              <CardHeader>
                <CardTitle>{patient.name}</CardTitle>
              </CardHeader>

              <CardContent className="flex justify-between items-center">
                <div className="space-y-1 text-sm">
                  <p>ID: {patient.id}</p>
                  <p>Age: {patient.age}</p>
                  <p>Condition: {patient.condition}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge>{patient.status}</Badge>
                  <Button variant="outline">View Profile</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}