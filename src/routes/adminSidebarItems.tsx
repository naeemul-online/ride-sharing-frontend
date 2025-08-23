import Analytics from "@/pages/admin/Analytics";
import Ride from "@/pages/Ride/Ride";
import type { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Ride Management",
    items: [
      {
        title: "Manage Ride",
        url: "/admin/ride",
        component: Ride,
      },
    ],
  },
];
