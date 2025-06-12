// External imports
import { AuthPage } from '@refinedev/antd';

export interface ForgotPasswordProps {}

export const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  return <AuthPage type="forgotPassword" />;
};
