// External
import * as React from 'react';
import { Authenticated } from '@refinedev/core';
import { NavigateToResource } from '@refinedev/react-router';
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

import { UsersList } from './pages/users/users-list';
import { Forecast } from './pages/forecast/forecast';
import { CommingSoon } from './pages/comming-soon';
import { GenerateContractPdf } from './pages/GenerateContractPdf';

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
          <Route path="/contracts/:id/generate-pdf" element={<GenerateContractPdf />} />
        </Route>
      </Route>

      <Route path="/users" element={<UsersList />} />
      <Route path="/forecasting" element={<Forecast />} />
      <Route path="/consumptions" element={<CommingSoon />} />
      <Route path="/invoices" element={<CommingSoon />} />
      <Route path="/payments" element={<CommingSoon />} />
      <Route path="/reports" element={<CommingSoon />} />
      <Route path="/settings" element={<CommingSoon />} />
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
