import * as React from "react";
import { Fragment, useCallback } from "react";
import {
  Count,
  DatagridConfigurable,
  DateField,
  ExportButton,
  FilterButton,
  List,
  NullableBooleanInput,
  NumberField,
  SearchInput,
  SelectColumnsButton,
  TextField,
  TopToolbar,
  useDefaultTitle,
  useListContext,
} from "react-admin";
import { Divider, Tabs, Tab } from "@mui/material";

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <SelectColumnsButton />
    <ExportButton />
  </TopToolbar>
);

const UsersTitle = () => {
  const title = useDefaultTitle();
  const { defaultTitle } = useListContext();
  return (
    <>
      <title>{`${title} - ${defaultTitle}`}</title>
      <span>{defaultTitle}</span>
    </>
  );
};

const UserList = () => (
  <List
    sort={{ field: "dateOfJoining", order: "DESC" }}
    perPage={25}
    filters={userFilters}
    actions={<ListActions />}
    title={<UsersTitle />}
  >
    <TabbedDatagrid />
  </List>
);

const userFilters = [
  <SearchInput source="q" alwaysOn />,
  <DateField source="dateOfBirth" label="Date of Birth" />,
  <DateField source="dateOfJoining" label="Date of Joining" />,
  <NullableBooleanInput source="isActive" label="Active Users" />,
];

const tabs = [
  { id: "active", name: "Active" },
  { id: "inactive", name: "Inactive" },
  { id: "pending", name: "Pending" },
];

const TabbedDatagrid = () => {
  const listContext = useListContext();
  const { filterValues, setFilters, displayedFilters } = listContext;

  const handleChange = useCallback(
    (event: React.ChangeEvent<{}>, value: any) => {
      setFilters &&
        setFilters({ ...filterValues, status: value }, displayedFilters);
    },
    [displayedFilters, filterValues, setFilters],
  );

  return (
    <Fragment>
      <Tabs
        variant="fullWidth"
        centered
        value={filterValues.status ?? "active"}
        indicatorColor="primary"
        onChange={handleChange}
      >
        {tabs.map((choice) => (
          <Tab
            key={choice.id}
            label={
              <span>
                {choice.name} (
                <Count
                  filter={{ ...filterValues, status: choice.id }}
                  sx={{ lineHeight: "inherit" }}
                />
                )
              </span>
            }
            value={choice.id}
          />
        ))}
      </Tabs>
      <Divider />
      <>
        {(filterValues.status == null || filterValues.status === "active") && (
          <DatagridConfigurable rowClick="edit" preferenceKey="users.list1">
            <TextField source="firstName" label="First Name" />
            <TextField source="lastName" label="Last Name" />
            <TextField source="username" label="Username" />
            <DateField source="dateOfBirth" label="Date of Birth" />
            <DateField source="dateOfJoining" label="Date of Joining" />
            <TextField source="status" label="Status" />
          </DatagridConfigurable>
        )}
        {filterValues.status === "inactive" && (
          <DatagridConfigurable rowClick="edit" preferenceKey="users.list2">
            <TextField source="firstName" label="First Name" />
            <TextField source="lastName" label="Last Name" />
            <TextField source="username" label="Username" />
            <DateField source="dateOfBirth" label="Date of Birth" />
            <DateField source="dateOfJoining" label="Date of Joining" />
            <TextField source="status" label="Status" />
          </DatagridConfigurable>
        )}
        {filterValues.status === "pending" && (
          <DatagridConfigurable rowClick="edit" preferenceKey="users.list3">
            <TextField source="firstName" label="First Name" />
            <TextField source="lastName" label="Last Name" />
            <TextField source="username" label="Username" />
            <DateField source="dateOfBirth" label="Date of Birth" />
            <DateField source="dateOfJoining" label="Date of Joining" />
            <TextField source="status" label="Status" />
          </DatagridConfigurable>
        )}
      </>
    </Fragment>
  );
};

export default UserList;
