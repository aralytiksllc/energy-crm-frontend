import * as React from "react";
import { AppBar, TitlePortal } from "react-admin";
import { Box, useMediaQuery, Theme } from "@mui/material";
import { LoadingIndicator, LocalesMenuButton } from "react-admin";
import { SVGProps } from "react";
import { useTheme } from "@mui/material/styles";

const Logo = (props: SVGProps<SVGSVGElement>) => {
  const theme = useTheme();
  return <strong>hr.aralytiks.com</strong>;
};

export const AppBarToolbar = () => (
  <>
    <LocalesMenuButton />
    <LoadingIndicator />
  </>
);

const CustomAppBar = () => {
  const isLargeEnough = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("sm"),
  );
  return (
    <AppBar color="secondary" toolbar={<AppBarToolbar />}>
      {/* <TitlePortal /> */}
      {isLargeEnough && <Logo />}
      {isLargeEnough && <Box component="span" sx={{ flex: 1 }} />}
    </AppBar>
  );
};

export default CustomAppBar;
