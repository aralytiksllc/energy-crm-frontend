import type { Rule } from 'antd/lib/form';

export const projectMemberValidationRules: Record<string, Rule[]> = {
  user: [{ required: true, message: 'Please select a user' }],
  role: [{ required: true, message: 'Please select a role' }],
};
