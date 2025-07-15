import type { Rule } from 'antd/lib/form';
import { Task } from '@interfaces/task';

type TaskFormRules = Partial<Record<keyof Task, Rule[]>>;

export const rules: TaskFormRules = {
  projectId: [
    {
      required: true,
      message: 'Please select a project',
    },
  ],
  title: [
    {
      required: true,
      message: 'Please enter a title',
    },
  ],
  type: [
    {
      required: true,
      message: 'Please select a type',
    },
  ],
};
