export const textOperators = [
  { label: 'Contains (case-insensitive)', value: 'ilike' },
  { label: 'Equals', value: 'eq' },
  { label: 'Not Equals', value: 'ne' },
  { label: 'Contains (case-sensitive)', value: 'like' },
];

export const numberOperators = [
  { label: 'Equals', value: 'eq' },
  { label: 'Not Equals', value: 'ne' },
  { label: 'Greater Than', value: 'gt' },
  { label: 'Less Than', value: 'lt' },
  { label: 'Greater Than or Equal', value: 'gte' },
  { label: 'Less Than or Equal', value: 'lte' },
];

export const dateOperators = [
  { label: 'Is', value: 'eq' },
  { label: 'Is Not', value: 'ne' },
  { label: 'Is After', value: 'gt' },
  { label: 'Is Before', value: 'lt' },
  { label: 'Is On or After', value: 'gte' },
  { label: 'Is On or Before', value: 'lte' },
];

export const filterOperators = [
  ...textOperators,
  ...numberOperators,
  { label: 'In', value: 'in' },
  { label: 'Range', value: 'range' },
];
