// External
import * as React from 'react';
import { Authenticated } from '@refinedev/core';
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router';
import { Routes, Route, Outlet } from 'react-router';

// Internal
import { MainLayout } from './layouts/main-layout/main-layout';
import { PaneLayout } from './layouts/pane-layout/pane-layout';
import { ListLayout } from './layouts/list-layout/list-layout';
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
import { MeteringPointList } from './pages/metering-points/metering-point-list';
import { MeteringPointCreate } from './pages/metering-points/metering-point-create';
import { MeteringPointEdit } from './pages/metering-points/metering-point-edit';
import { ConsumptionList } from './pages/consumption/consumption-list';
import { DocumentsList } from './pages/documents/documents-list';

import { ContractList } from './pages/contracts/contract-list';
import { ContractCreate } from './pages/contracts/contract-create';
import { ContractEdit } from './pages/contracts/contract-edit';

import { Forecast } from './pages/forecast/forecast';
import { CommingSoon } from './pages/comming-soon';

import UsersProfile from './pages/__users__/profile';

import { PermissionsMatrix } from './pages/permissions';

// Users
import { UserList } from './pages/users/user-list';
import { UserCreate } from './pages/users/user-create';
import { UserEdit } from './pages/users/user-edit';

// Roles
import { RoleList } from './pages/roles/role-list';
import { RoleCreate } from './pages/roles/role-create';
import { RoleEdit } from './pages/roles/role-edit';
import { ErrorComponent } from '@refinedev/antd';

export type AppRoutesProps = {};

export const AppRoutes: React.FC = () => (
  <Routes>
    {/* PROTECTED AREA */}
    <Route
      element={
        <Authenticated
          key="authenticated-inner"
          fallback={<CatchAllNavigate to="/login" />}
        >
          <MainLayout>
            <Outlet />
          </MainLayout>
        </Authenticated>
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
        <Route path=":customerId/contacts">
          <Route index element={<ContactList />} />
          <Route path="create" element={<ContactCreate />} />
          <Route path=":id" element={<ContactEdit />} />
        </Route>
        <Route path=":customerId/metering-points">
          <Route index element={<MeteringPointList />} />
          <Route path="create" element={<MeteringPointCreate />} />
          <Route path=":id" element={<MeteringPointEdit />} />
        </Route>
        <Route path=":customerId/consumption">
          <Route index element={<ConsumptionList />} />
          <Route path="create" element={<CommingSoon />} />
          <Route path=":consumptionId" element={<CommingSoon />} />
        </Route>
        <Route path=":customerId/documents">
          <Route index element={<DocumentsList />} />
          <Route path="create" element={<CommingSoon />} />
          <Route path=":documentId" element={<CommingSoon />} />
        </Route>
      </Route>

      <Route
        element={
          <ListLayout>
            <Outlet />
          </ListLayout>
        }
      >
        <Route path="/contracts">
          <Route index element={<ContractList />} />
          <Route path="create" element={<ContractCreate />} />
          <Route path=":id" element={<ContractEdit />} />
        </Route>

        <Route path="/roles">
          <Route index element={<RoleList />} />
          <Route path="create" element={<RoleCreate />} />
          <Route path=":id/edit" element={<RoleEdit />} />
        </Route>

        <Route path="/users">
          <Route index element={<UserList />} />
          <Route path="create" element={<UserCreate />} />
          <Route path=":id/edit" element={<UserEdit />} />
        </Route>

        <Route path="/permissions" element={<PermissionsMatrix />} />
      </Route>

      <Route path="/forecasting" element={<Forecast />} />
      <Route path="/consumptions" element={<CommingSoon />} />
      <Route path="/invoices" element={<CommingSoon />} />
      <Route path="/payments" element={<CommingSoon />} />
      <Route path="/reports" element={<CommingSoon />} />
      <Route path="/settings" element={<CommingSoon />} />
      <Route path="*" element={<ErrorComponent />} />
    </Route>

    {/* PUBLIC AUTH PAGES */}
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
      <Route path="/update-password" element={<UpdatePassword />} />
      <Route path="*" element={<ErrorComponent />} />
    </Route>
  </Routes>
);
