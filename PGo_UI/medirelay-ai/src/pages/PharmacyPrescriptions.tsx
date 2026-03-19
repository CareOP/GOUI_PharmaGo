import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrescriptionCard } from "@/components/cards/PrescriptionCard";
import { prescriptions } from "@/lib/mockData";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Package,
  FileText,
  QrCode,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/pharmacy", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Prescriptions", href: "/pharmacy/prescriptions", icon: <FileText className="h-5 w-5" /> },
  { label: "Inventory", href: "/pharmacy/inventory", icon: <Package className="h-5 w-5" /> },
];

export default function PharmacyPrescriptions() {
  const [rxList, setRxList] = useState(prescriptions);

  const pendingOrders = rxList.filter(
    (rx) => rx.status === "pending" || rx.status === "processing"
  );

  const readyOrders = rxList.filter((rx) => rx.status === "ready");

  const handleProcessOrder = (id: string) => {
    setRxList((prev) =>
      prev.map((rx) =>
        rx.id === id
          ? {
              ...rx,
              status:
                rx.status === "pending"
                  ? "processing"
                  : "ready",
            }
          : rx
      )
    );

    toast.success("Order status updated!");
  };

  return (
    <DashboardLayout role="pharmacy" userName="MediCare Pharmacy" navItems={navItems}>
      <div className="space-y-6">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Prescription Orders</CardTitle>

            <Button className="gap-2">
              <QrCode className="h-4 w-4" />
              Scan QR
            </Button>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="pending">

              <TabsList className="w-full mb-4">
                <TabsTrigger value="pending" className="flex-1">
                  Pending
                  <Badge className="ml-2">{pendingOrders.length}</Badge>
                </TabsTrigger>

                <TabsTrigger value="ready" className="flex-1">
                  Ready
                  <Badge className="ml-2">{readyOrders.length}</Badge>
                </TabsTrigger>

                <TabsTrigger value="completed" className="flex-1">
                  Completed
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {pendingOrders.map((rx) => (
                      <PrescriptionCard
                        key={rx.id}
                        id={rx.id}
                        patientName={rx.patientName}
                        doctor={rx.doctor}
                        date={rx.date}
                        medications={rx.medications}
                        status={rx.status as "pending" | "processing" | "ready" | "dispensed"} 
                        onFulfill={() => handleProcessOrder(rx.id)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="ready">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {readyOrders.map((rx) => (
                      <PrescriptionCard
                        key={rx.id}
                        id={rx.id}
                        patientName={rx.patientName}
                        doctor={rx.doctor}
                        date={rx.date}
                        medications={rx.medications}
                        status={rx.status as "pending" | "processing" | "ready" | "dispensed"}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="completed">
                <div className="text-center py-20 text-muted-foreground">
                  24 orders completed today
                </div>
              </TabsContent>

            </Tabs>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
}