import { SimpleForm, TextInput, DateInput, SelectInput } from "react-admin";
import Grid from "@mui/material/Grid2";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    dateOfBirth: yup.date().required("Date of Birth is required"),
    dateOfJoining: yup.date().required("Date of Joining is required"),
    status: yup
      .string()
      .oneOf(["Active", "Inactive", "Pending"], "Invalid status")
      .required("Status is required"),
  })
  .required();

const UserForm: React.FC = () => {
  return (
    <SimpleForm resolver={yupResolver(schema) as any}>
      <Grid container spacing={{ sm: 1, md: 2 }}>
        <Grid size={{ sm: 12, md: 6 }}>
          <TextInput source="firstName" label="First Name" fullWidth />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <TextInput source="lastName" label="Last Name" fullWidth />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <TextInput source="email" label="Email" type="email" fullWidth />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <TextInput
            source="password"
            label="Password"
            type="password"
            fullWidth
          />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <DateInput source="dateOfBirth" label="Date of Birth" fullWidth />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <DateInput source="dateOfJoining" label="Date of Joining" fullWidth />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
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
      </Grid>
    </SimpleForm>
  );
};

export default UserForm;
