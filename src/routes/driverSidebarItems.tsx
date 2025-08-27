import Analytics from "@/pages/admin/Analytics";
import Driver from "@/pages/driver/Driver";
import type { ISidebarItem } from "@/types";

export const driverSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
      {
        title: "Analytics",
        url: "/driver/analytics",
        component: Analytics,
      },
      {
        title: "Driver",
        url: "/driver/history",
        component: Driver,
      },
    ],
  },
];
