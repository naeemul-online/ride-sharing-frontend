import type { ComponentType } from "react";

export type TRole = "super_admin" | "admin" | "rider" | "driver";

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
