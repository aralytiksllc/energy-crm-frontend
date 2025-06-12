export const projectsResource = {
  name: 'projects',
  list: '/projects',
  create: '/projects/create',
  edit: '/projects/edit/:id',
  show: '/projects/show/:id',
  meta: {
    canDelete: true,
  },
  options: {
    label: 'Projects',
  },
};
