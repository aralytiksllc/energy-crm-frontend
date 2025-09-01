// External
import { AuthPage } from '@refinedev/antd';

// Internal

export type LoginProps = {};

const registerLink = <></>;

export const Login: React.FC<LoginProps> = () => {
  return <AuthPage type="login" registerLink={registerLink} />;
};
