// External imports
import React from 'react';
import { CrudTable } from '@/components/crud-table/crud-table';

// Internal imports
import { TaskForm } from './components/task-form';
import { columns } from './constants/table';

export const Tasks: React.FC = () => {
  return (
    <CrudTable<any>
      resource="tasks"
      columns={columns}
      FormComponent={TaskForm}
      DetailsComponent={() => <></>}
      drawerTitles={{
        create: 'Create Project',
        edit: 'Edit Project',
        view: 'Project Details',
      }}
    />
  );
};
