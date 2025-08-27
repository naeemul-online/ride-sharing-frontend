import RideHistory from "@/pages/rider/RideHistory";
import RiderAnalytics from "@/pages/rider/RiderAnalytics";
import RiderProfileManagement from "@/pages/rider/RiderProfileManagement";
import type { ISidebarItem } from "@/types";

export const riderSidebarItems: ISidebarItem[] = [
  {
    title: "Analytics",
    items: [
      {
        title: "Rider Analytics",
        url: "/rider/analytics",
        component: RiderAnalytics,
      },
    ],
  },
  {
    title: "History",
    items: [
      {
        title: "Ride History",
        url: "/rider/history",
        component: RideHistory,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "Manage Profile",
        url: "/rider/profile",
        component: RiderProfileManagement,
      },
    ],
  },
];
