import React from 'react';
import { Form, FormProps } from 'antd';
import { ProjectMemberManager } from '@components/project-member-manager';
import { IUser } from '@interfaces/users';

export interface ProjectMembersFormProps {
  formProps?: FormProps;
  users?: IUser[];
  usersLoading?: boolean;
}

export const ProjectMembersForm: React.FC<ProjectMembersFormProps> = (
  props,
) => {
  const { formProps = {}, users, usersLoading } = props;

  return (
    <>
      <Form.List name="members">
        {(fields, { add, remove }) => (
          <ProjectMemberManager
            fields={fields}
            add={add}
            remove={remove}
            users={users}
            usersLoading={usersLoading}
          />
        )}
      </Form.List>
    </>
  );
};
