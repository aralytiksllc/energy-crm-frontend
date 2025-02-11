import { Create } from "react-admin";
import TimelogForm from "./timelog-form";

const TimelogCreate: React.FC = () => (
  <Create>
    <TimelogForm />
  </Create>
);

export default TimelogCreate;
