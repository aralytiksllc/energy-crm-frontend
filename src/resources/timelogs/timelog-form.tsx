import {
  SimpleForm,
  TextInput,
  DateInput,
  NumberInput,
  SelectInput,
} from "react-admin";
import Grid from "@mui/material/Grid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGetList } from "react-admin";

const schema = yup
  .object()
  .shape({
    projectId: yup.string().required("Project is required"),
    description: yup.string().required("Description is required"),
    date: yup.date().required("Date is required"),
    hours: yup
      .number()
      .positive("Hours must be greater than 0")
      .required("Hours are required"),
  })
  .required();

const TimelogForm: React.FC = () => {
  const { data: projects = [], isLoading } = useGetList("projects");

  return (
    <SimpleForm resolver={yupResolver(schema) as any}>
      <Grid container spacing={{ sm: 1, md: 2 }}>
        <Grid item xs={12} md={6}>
          <SelectInput
            source="projectId"
            label="Project"
            choices={projects.map((p) => ({ id: p.id, name: p.name }))}
            fullWidth
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            source="description"
            label="Description"
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DateInput source="date" label="Date" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <NumberInput source="hours" label="Hours" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  );
};

export default TimelogForm;
