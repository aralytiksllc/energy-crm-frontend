import type { Rule } from 'antd/lib/form';
import type { Assignee } from '@interfaces/assignee';

type AssigneeFormRules = Partial<Record<keyof Assignee, Rule[]>>;

export const rules: AssigneeFormRules = {
  userId: [
    {
      required: true,
      message: 'Please select a user',
    },
  ],
  estimatedHours: [
    {
      required: true,
      message: 'Hours?',
    },
  ],
};
