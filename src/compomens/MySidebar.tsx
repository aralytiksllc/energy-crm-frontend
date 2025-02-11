// in src/MySidebar.js
import * as React from "react";
import { Drawer, Toolbar } from "@mui/material";
import { SidebarClasses, useLocale, useSidebarState } from "react-admin";

const drawerWidth = 240;

export const MySidebar = ({ children }) => {
  return <div style={{ backgroundColor: "white" }}>{children}</div>;
};
