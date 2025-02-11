import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
} from "react-admin";

const TimelogList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="project.name" label="Project Name" />
      <TextField source="description" />
      <DateField source="date" />
      <NumberField source="hours" />
    </Datagrid>
  </List>
);

export default TimelogList;
