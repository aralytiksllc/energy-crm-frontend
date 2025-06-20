// External imports
import { AuthPage } from '@refinedev/antd';

type UpdatePasswordProps = Record<string, never>;

export const UpdatePassword: React.FC<UpdatePasswordProps> = () => {
  return <AuthPage type="updatePassword" />;
};
