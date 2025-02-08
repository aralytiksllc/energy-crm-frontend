// in src/admin/index.tsx
import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import UserCreate from "./resources/users/user-create";
import UserEdit from "./resources/users/user-edit";
import { theme } from "./theme";
import {MYLayout} from "./compomens/Layout"
import DescriptionIcon from '@mui/icons-material/Description';

const dataProvider = jsonServerProvider("http://localhost:3000");

import { defaultTheme } from 'react-admin';

const App = () => (
  <Admin dataProvider={dataProvider} theme={theme} layout={MYLayout}>
    <Resource
      name="users"
      list={ListGuesser}
      create={UserCreate}
      edit={UserEdit}
      icon={DescriptionIcon}
      options={{
        label: "This is sexy"
      }}
    />
  </Admin>
);

export default App;
