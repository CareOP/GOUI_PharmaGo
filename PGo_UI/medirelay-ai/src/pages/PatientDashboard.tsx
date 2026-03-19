import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/cards/StatCard";
import { AppointmentCard } from "@/components/cards/AppointmentCard";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { AIChatbot } from "@/components/AIChatbot";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { appointments, symptoms, doctors, notifications, prescriptions } from "@/lib/mockData";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Bell,
  User,
  Activity,
  Clock,
  Pill,
  Brain,
  Search,
  Plus,
  ChevronRight,
  Sparkles,
  AlertCircle,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/patient", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Appointments", href: "/patient/appointments", icon: <Calendar className="h-5 w-5" /> },
  { label: "Prescriptions", href: "/patient/prescriptions", icon: <FileText className="h-5 w-5" /> },
  { label: "Notifications", href: "/patient/notifications", icon: <Bell className="h-5 w-5" /> },
  { label: "Profile", href: "/patient/profile", icon: <User className="h-5 w-5" /> },
];

export default function PatientDashboard() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showBooking, setShowBooking] = useState(false);

  const upcomingAppointment = appointments.find((a) => a.status === "confirmed");

  return (
    <DashboardLayout role="patient" userName="Sarah Johnson" navItems={navItems}>
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Upcoming Appointments"
            value="2"
            icon={<Calendar className="h-6 w-6" />}
            variant="patient"
          />
          <StatCard
            title="Active Prescriptions"
            value="3"
            icon={<Pill className="h-6 w-6" />}
            variant="default"
          />
          <StatCard
            title="Health Score"
            value="85%"
            icon={<Activity className="h-6 w-6" />}
            trend={{ value: 5, isPositive: true }}
            variant="default"
          />
          <StatCard
            title="Next Checkup"
            value="7 days"
            icon={<Clock className="h-6 w-6" />}
            variant="default"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Symptom Assessment */}
            <Card className="border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">AI Symptom Assessment</CardTitle>
                      <p className="text-sm text-muted-foreground">Pre-fill your case history</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <Sparkles className="h-3 w-3" />
                    AI Powered
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search or describe symptoms..." className="pl-10" />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {symptoms.slice(0, 6).map((symptom) => (
                    <label
                      key={symptom}
                      className="flex items-center gap-2 p-2 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                    >
                      <Checkbox
                        checked={selectedSymptoms.includes(symptom)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedSymptoms([...selectedSymptoms, symptom]);
                          } else {
                            setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
                          }
                        }}
                      />
                      <span className="text-sm">{symptom}</span>
                    </label>
                  ))}
                </div>

                {selectedSymptoms.length > 0 && (
                  <Card className="bg-patient-muted border-patient/20">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-patient mt-0.5" />
                        <div className="space-y-2">
                          <p className="text-sm font-medium">AI Assessment Result</p>
                          <p className="text-sm text-muted-foreground">
                            Based on your symptoms ({selectedSymptoms.join(", ")}), 
                            we recommend consulting with a General Physician. 
                            Would you like to book an appointment?
                          </p>
                          <Button size="sm" onClick={() => setShowBooking(true)} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Book Appointment
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Quick Booking */}
            {showBooking && (
              <Card className="border">
                <CardHeader>
                  <CardTitle className="text-lg">Available Doctors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {doctors.map((doctor) => (
                      <div
                        key={doctor.id}
                        className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-doctor/10 flex items-center justify-center">
                            <User className="h-6 w-6 text-doctor" />
                          </div>
                          <div>
                            <p className="font-medium">{doctor.name}</p>
                            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={doctor.available ? "default" : "secondary"}>
                            {doctor.available ? "Available" : "Busy"}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">{doctor.nextSlot}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upcoming Appointments */}
            <Card className="border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Your Appointments</CardTitle>
                  <Button variant="outline" size="sm" className="gap-2">
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.slice(0, 3).map((apt) => (
                    <AppointmentCard
                      key={apt.id}
                      patientName={apt.patientName}
                      doctor={apt.doctor}
                      time={apt.time}
                      type={apt.type}
                      status={apt.status as "confirmed" | "pending" | "completed"}
                      showQR={apt.status === "confirmed"}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* QR Code for Check-in */}
            {upcomingAppointment && (
              <QRCodeDisplay
                appointmentId={upcomingAppointment.id}
                patientName={upcomingAppointment.patientName}
                time={`Today, ${upcomingAppointment.time}`}
                location="Main Building, Room 204"
              />
            )}

            {/* Notifications */}
            <Card className="border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Notifications</CardTitle>
                  <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                    {notifications.filter((n) => !n.read).length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border transition-colors ${
                          notification.read ? "bg-muted/50" : "bg-accent"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                          </div>
                          {!notification.read && (
                            <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Prescription Status */}
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-lg">Prescription Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptions.slice(0, 2).map((rx) => (
                    <div key={rx.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{rx.id}</span>
                        <Badge variant="outline" className="text-xs capitalize">
                          {rx.status}
                        </Badge>
                      </div>
                      <Progress
                        value={
                          rx.status === "dispensed"
                            ? 100
                            : rx.status === "ready"
                            ? 75
                            : rx.status === "processing"
                            ? 50
                            : 25
                        }
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        {rx.medications.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AIChatbot />
    </DashboardLayout>
  );
}
