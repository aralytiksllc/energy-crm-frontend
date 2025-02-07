import { SimpleForm, TextInput, DateInput, SelectInput } from "react-admin";
import { Grid } from "@mui/material";

const UserForm: React.FC = () => (
  <SimpleForm>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextInput source="firstName" label="First Name" fullWidth />
        <TextInput source="email" label="Email" type="email" fullWidth />
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
        <TextInput
          source="password"
          label="Password"
          type="password"
          fullWidth
        />
        <DateInput source="dateOfJoining" label="Date of Joining" fullWidth />
      </Grid>
    </Grid>
  </SimpleForm>
);

export default UserForm;
