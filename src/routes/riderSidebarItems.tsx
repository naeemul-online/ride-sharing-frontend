import Analytics from "@/pages/admin/Analytics";
import Ride from "@/pages/Ride/Ride";
import type { ISidebarItem } from "@/types";

export const riderSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
      {
        title: "Analytics",
        url: "/rider/analytics",
        component: Analytics,
      },
      {
        title: "Ride",
        url: "/rider/ride",
        component: Ride,
      },
    ],
  },
];
