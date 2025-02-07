import { Edit } from "react-admin";
import UserForm from "./user-form";

const UserEdit: React.FC = () => (
  <Edit>
    <UserForm />
  </Edit>
);

export default UserEdit;
