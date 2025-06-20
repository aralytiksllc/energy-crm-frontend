// External imports
import { AuthPage } from '@refinedev/antd';

type LoginProps = Record<string, never>;

export const Login: React.FC<LoginProps> = () => {
  return <AuthPage type="login" />;
};
