// External imports
import { AuthPage } from '@refinedev/antd';

type RegisterProps = Record<string, never>;

export const Register: React.FC<RegisterProps> = () => {
  return <AuthPage type="register" />;
};
