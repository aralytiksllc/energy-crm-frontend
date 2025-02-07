// in src/admin/index.tsx
import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import UserList from "./pages/user-list";
import UserCreate from "./resources/users/user-create";
import UserEdit from "./resources/users/user-edit";

const dataProvider = jsonServerProvider("http://localhost:3000");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="users"
      list={ListGuesser}
      create={UserCreate}
      edit={UserEdit}
    />
  </Admin>
);

export default App;
