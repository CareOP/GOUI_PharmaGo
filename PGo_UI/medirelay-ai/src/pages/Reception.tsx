import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QrCode, LayoutDashboard, Users, BarChart3 } from "lucide-react";
import { patients } from "@/lib/mockData";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Reception", href: "/admin/reception", icon: <QrCode className="h-5 w-5" /> },
  { label: "Staff", href: "/admin/staff", icon: <Users className="h-5 w-5" /> },
];

export default function Reception() {
  return (
    <DashboardLayout role="admin" userName="Admin User" navItems={navItems}>
      <div className="space-y-6">

        <h1 className="text-2xl font-bold">Reception Queue</h1>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Patient Check-In</CardTitle>

            <Button className="gap-2">
              <QrCode className="h-4 w-4" />
              Scan QR
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between border p-4 rounded-lg"
              >
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ID: {patient.id} • {patient.appointmentTime}
                  </p>
                </div>

                <Badge variant="outline">
                  {patient.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
}