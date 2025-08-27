import ActiveStatusSwitch from "@/pages/driver/ActiveStatusSwitch";
import DriverAnalytics from "@/pages/driver/DriverAnalytics";
import DriverUpdateProfile from "@/pages/driver/DriverUpdateProfile";
import VehicleStatus from "@/pages/driver/VehicleStatus";
import type { ISidebarItem } from "@/types";

export const driverSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/driver/analytics",
        component: DriverAnalytics,
      },
    ],
  },
  {
    title: "Vehicles",
    items: [
      {
        title: "Status",
        url: "/driver/status",
        component: VehicleStatus,
      },
    ],
  },
  {
    title: "Manage profile",
    items: [
      {
        title: "Profile",
        url: "/driver/profile",
        component: DriverUpdateProfile,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Active Status",
        url: "/driver/active-status",
        component: ActiveStatusSwitch,
      },
    ],
  },
];
