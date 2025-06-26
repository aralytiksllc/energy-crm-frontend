export const roleOptions = [
  { label: 'Manager', value: 'Manager' },
  { label: 'Developer', value: 'Developer' },
  { label: 'Designer', value: 'Designer' },
  { label: 'QA', value: 'QA' },
  { label: 'Stakeholder', value: 'Stakeholder' },
];

export const projectMemberValidationRules = {
  user: [{ required: true, message: 'Please select a user' }],
  role: [{ required: true, message: 'Please select a role' }],
};
