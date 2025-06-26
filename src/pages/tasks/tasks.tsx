import React, { useCallback } from 'react';
import type { FormProps } from 'antd';
import type { Task } from '@/interfaces/task';
import { CrudTable } from '@/components/crud-table/crud-table';
import { TaskForm } from './components/task-form';
import { columns } from './constants/table';

interface AssigneeValue {
  userId?: number;
  estimatedHours?: number;
}

export const Tasks: React.FC = () => {
  const renderForm = useCallback((formProps: FormProps) => {
    const { onFinish, initialValues, ...restFormProps } = formProps;

    const handleFinish = async (values: any) => {
      const transformedValues = { ...values };

      if (Array.isArray(transformedValues.assignees)) {
        transformedValues.assignees = transformedValues.assignees
          .filter((a: AssigneeValue) => a && a.userId)
          .map((a: AssigneeValue) => ({
            userId: a.userId,
            estimatedHours: a.estimatedHours || 0,
          }));
      } else {
        transformedValues.assignees = [];
      }

      if (onFinish) {
        await onFinish(transformedValues);
      }
    };

    const augmentedFormProps = {
      ...restFormProps,
      onFinish: handleFinish,
      initialValues: initialValues
        ? {
            ...initialValues,
            assignees: initialValues.assignees?.map((a: any) => ({
              userId: a.userId,
              estimatedHours: a.estimatedHours,
            })),
          }
        : undefined,
    };

    return <TaskForm formProps={augmentedFormProps} />;
  }, []);

  return (
    <CrudTable<Task>
      resource="tasks"
      renderForm={renderForm}
      columns={columns}
      createInitialValues={{ assignees: [{}] }}
      drawerTitles={{
        create: 'Create Task',
        edit: 'Edit Task',
      }}
    />
  );
};
