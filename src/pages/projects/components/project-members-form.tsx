import React from 'react';
import { Form, FormProps } from 'antd';
import { ProjectMemberManager } from '@components/project-member-manager';

export interface ProjectMembersFormProps {
  formProps?: FormProps;
}

export const ProjectMembersForm: React.FC<ProjectMembersFormProps> = (
  props,
) => {
  const { formProps = {} } = props;

  return (
    <>
      <Form.List name="members">
        {(fields, { add, remove }) => (
          <ProjectMemberManager fields={fields} add={add} remove={remove} />
        )}
      </Form.List>
    </>
  );
};
