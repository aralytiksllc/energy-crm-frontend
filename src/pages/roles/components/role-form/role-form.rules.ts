// External
import type { Rule } from 'antd/es/form';

// Internal
import type { IRole } from '@/interfaces/roles';

export const rules: Record<keyof IRole, Rule[]> = {
  id: [],

  name: [
    {
      required: true,
      message: 'Role name is required.',
    },
  ],

  description: [],
};
