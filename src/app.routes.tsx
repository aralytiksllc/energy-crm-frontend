// External
import * as React from 'react';
import { Authenticated } from '@refinedev/core';
import { NavigateToResource } from '@refinedev/react-router';
import { Routes, Route, Outlet } from 'react-router';

// Internal
import { MainLayout } from './layouts/main-layout/main-layout';
import { PaneLayout } from './layouts/pane-layout/pane-layout';
import { Register } from './pages/authentication/register';
import { Login } from './pages/authentication/login';
import { ForgotPassword } from './pages/authentication/forgot-password';
import { UpdatePassword } from './pages/authentication/update-password';
import { CustomerCreate } from './pages/customers/customer-create';
import { CustomerEdit } from './pages/customers/customer-edit';
import { CustomerList } from './pages/customers/customer-list';
import { BranchCreate } from './pages/branches/branch-create';
import { BranchEdit } from './pages/branches/branch-edit';
import { BranchList } from './pages/branches/branch-list';
import { ContactCreate } from './pages/contacts/contact-create';
import { ContactEdit } from './pages/contacts/contact-edit';
import { ContactList } from './pages/contacts/contact-list';
import { CommingSoon } from './pages/comming-soon';


export type AppRoutesProps = {};

export const AppRoutes: React.FC<AppRoutesProps> = () => (
  <Routes>
    <Route
      element={
        <MainLayout>
          <Outlet />
        </MainLayout>
      }
    >
      <Route
        path="/customers"
        element={
          <PaneLayout sider={<CustomerList />}>
            <Outlet />
          </PaneLayout>
        }
      >
        <Route index element={<CustomerCreate />} />
        <Route path=":id" element={<CustomerEdit />} />
        <Route path=":customerId/branches">
          <Route index element={<BranchList />} />
          <Route path="create" element={<BranchCreate />} />
          <Route path=":id" element={<BranchEdit />} />
        </Route>
        <Route path=":customerId/branches">
          <Route index element={<BranchList />} />
          <Route path="create" element={<BranchCreate />} />
          <Route path=":id" element={<BranchEdit />} />
        </Route>
        <Route path=":customerId/contacts">
          <Route index element={<ContactList />} />
          <Route path="create" element={<ContactCreate />} />
          <Route path=":id" element={<ContactEdit />} />
        </Route>
      </Route>
      <Route path="/consumptions" element={<CommingSoon />} />
      <Route path="/invoices" element={<CommingSoon />} />
      <Route path="/payments" element={<CommingSoon />} />
      <Route path="/reports" element={<CommingSoon />} />
      <Route path="/settings" element={<CommingSoon />} />
      <Route path="/users" element={<CommingSoon />} />
      <Route path="/roles" element={<CommingSoon />} />
      <Route path="/permissions" element={<CommingSoon />} />
    </Route>
    <Route
      element={
        <Authenticated key="authenticated-outer" fallback={<Outlet />}>
          <NavigateToResource />
        </Authenticated>
      }
    >
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/update-password/:token" element={<UpdatePassword />} />
    </Route>
  </Routes>
);
