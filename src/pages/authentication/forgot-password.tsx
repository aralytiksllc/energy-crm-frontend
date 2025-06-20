// External imports
import { AuthPage } from '@refinedev/antd';

type ForgotPasswordProps = Record<string, never>;

export const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  return <AuthPage type="forgotPassword" />;
};
