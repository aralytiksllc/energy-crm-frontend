import { Rule } from 'antd/es/form';

export const rules: Record<string, Rule[] | any> = {
  name: [
    { required: true, message: 'Project name is required' },
    { min: 2, message: 'Project name must be at least 2 characters' },
  ],
  title: [
    { required: true, message: 'Please enter a title' },
    { min: 2, message: 'Title must be at least 2 characters' },
  ],
  description: [
    { required: true, message: 'Description is required' },
    { min: 5, message: 'Description must be at least 5 characters' },
  ],
  stagesList: [
    {
      validator: async (_: any, value: string[]) => {
        if (!value || value.length < 1) {
          return Promise.reject(new Error('At least one stage is required'));
        }
      },
    },
  ],
  stageItem: [
    { required: true, message: 'Please enter stage name' },
    { min: 1, message: 'Stage name cannot be empty' },
  ],
  tagsList: [
    {
      validator: async (_: any, value: string[]) => {
        if (!value || value.length < 1) {
          return Promise.reject(new Error('At least one tag is required'));
        }
      },
    },
  ],
  tagItem: [
    { required: true, message: 'Please enter tag' },
    { min: 1, message: 'Tag cannot be empty' },
  ],
};
