import type { Rule } from 'antd/lib/form';
import type { IProject } from '@interfaces/project';

type ProjectOverviewFormRules = Partial<Record<keyof IProject, Rule[]>>;

export const rules: ProjectOverviewFormRules = {
  customerId: [{ required: true, message: 'Please select a customer' }],
  name: [{ required: true, message: 'Project name is required' }],
  description: [{ required: true, message: 'Description is required' }],
  budget: [{ required: true, message: 'Budget is required' }],
  status: [{ required: true, message: 'Status is required' }],
  priority: [{ required: true, message: 'Priority is required' }],
  startDate: [{ required: true, message: 'Start date is required' }],
};
