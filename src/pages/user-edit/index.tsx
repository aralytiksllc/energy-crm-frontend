import { Edit, SimpleForm, TextInput, DateInput, SelectInput } from "react-admin";
import { Card, Grid } from "@mui/material";

const UserEdit = () => (
  <Edit title="Edit User">
    <Card sx={{ padding: 2 }}>
      <SimpleForm>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextInput source="firstName" label="First Name" fullWidth />
            <TextInput source="username" label="Username" fullWidth />
            <DateInput source="dateOfBirth" label="Date of Birth" fullWidth />
            <SelectInput
              source="status"
              label="Status"
              choices={[
                { id: "Active", name: "Active" },
                { id: "Inactive", name: "Inactive" },
                { id: "Pending", name: "Pending" },
              ]}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput source="lastName" label="Last Name" fullWidth />
            <TextInput source="password" label="Password" type="password" fullWidth />
            <DateInput source="dateOfJoining" label="Date of Joining" fullWidth />
          </Grid>
        </Grid>
      </SimpleForm>
    </Card>
  </Edit>
);

export default UserEdit;
