import { Create } from "react-admin";
import UserForm from "./user-form";

const UserCreate: React.FC = () => (
  <Create>
    <UserForm />
  </Create>
);

export default UserCreate;
