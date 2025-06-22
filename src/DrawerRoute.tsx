// src/routes/DrawerRoute.tsx
import React from 'react';
import { Drawer } from 'antd';
import { useBack } from '@refinedev/core';
import { useNavigate } from 'react-router';

type DrawerRouteProps = {
  element: React.ReactNode;
  width?: number;
};

export const DrawerRoute = ({ element }: { element: React.ReactNode }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false); // trigger antd closing animation

    // // wait ~300ms (same as AntD Drawer animation)
    // const timeout = setTimeout(() => {
    //   navigate(-1);
    // }, 300);

    // return () => clearTimeout(timeout);
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      afterOpenChange={(open) => {
        // alert(`open: ${open}`);
        if (!open) {
          navigate(-1);
        }
      }}
      destroyOnClose
      width={720}
    >
      {element}
    </Drawer>
  );
};
