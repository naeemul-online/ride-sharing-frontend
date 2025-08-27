import AllUsers from "@/pages/admin/All Users";
import Analytics from "@/pages/admin/Analytics";
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
    title: "All Users",
    items: [
      {
        title: "Manage Users",
        url: "/admin/all-users",
        component: AllUsers,
      },
    ],
  },
];
