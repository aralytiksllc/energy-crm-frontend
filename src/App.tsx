// in src/admin/index.tsx
import { Admin, Resource, ListGuesser } from "react-admin";
import UserCreate from "./resources/users/user-create";
import UserEdit from "./resources/users/user-edit";
import ProjectCreate from "./resources/projects/project-create";
import ProjectEdit from "./resources/projects/project-edit";
import TimelogCreate from "./resources/timelogs/timelog-create";
import TimelogEdit from "./resources/timelogs/timelog-edit";
import TimelogList from "./resources/timelogs/timelog-list";
import { theme } from "./theme";
import { MYLayout } from "./compomens/Layout";
import DescriptionIcon from "@mui/icons-material/Description";
import { authProvider } from "./auth-provider";
import { dataProvider } from "./data-provider";

const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    theme={theme}
    // layout={MYLayout}
  >
    <Resource
      name="users"
      list={ListGuesser}
      create={UserCreate}
      edit={UserEdit}
      icon={DescriptionIcon}
      options={{
        label: "Users",
      }}
    />
    <Resource
      name="projects"
      list={ListGuesser}
      create={ProjectCreate}
      edit={ProjectEdit}
      icon={DescriptionIcon}
      options={{
        label: "Projects",
      }}
    />
    <Resource
      name="timelogs"
      list={TimelogList}
      create={TimelogCreate}
      edit={TimelogEdit}
      icon={DescriptionIcon}
      options={{
        label: "Actual Hours",
      }}
    />
  </Admin>
);

export default App;
