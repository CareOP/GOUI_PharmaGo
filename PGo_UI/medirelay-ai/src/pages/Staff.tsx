import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, QrCode, BarChart3, UserPlus } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Reception", href: "/admin/reception", icon: <QrCode className="h-5 w-5" /> },
  { label: "Staff", href: "/admin/staff", icon: <Users className="h-5 w-5" /> },
];

const staff = [
  { name: "Dr. Sarah Smith", role: "Doctor", department: "General Medicine" },
  { name: "Dr. Michael Brown", role: "Doctor", department: "Cardiology" },
  { name: "Emily Clark", role: "Nurse", department: "Pediatrics" },
  { name: "John Wilson", role: "Receptionist", department: "Front Desk" },
];

export default function Staff() {
  return (
    <DashboardLayout role="admin" userName="Admin User" navItems={navItems}>
      <div className="space-y-6">

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Hospital Staff</h1>

          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Staff
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Staff Members</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {staff.map((member, i) => (
              <div
                key={i}
                className="flex items-center justify-between border p-4 rounded-lg"
              >
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {member.department}
                  </p>
                </div>

                <Badge variant="outline">
                  {member.role}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
} 