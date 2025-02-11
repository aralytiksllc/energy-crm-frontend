import { SimpleForm, TextInput, DateInput } from "react-admin";
import Grid from "@mui/material/Grid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Project Name is required"),
    description: yup.string().required("Description is required"),
    startDate: yup.date().required("Start Date is required"),
    endDate: yup.date().nullable(),
  })
  .required();

const ProjectForm: React.FC = () => {
  return (
    <SimpleForm resolver={yupResolver(schema) as any}>
      <Grid container spacing={{ sm: 1, md: 2 }}>
        <Grid item xs={12} md={6}>
          <TextInput source="name" label="Project Name" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput source="description" label="Description" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <DateInput source="startDate" label="Start Date" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <DateInput source="endDate" label="End Date" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  );
};

export default ProjectForm;
