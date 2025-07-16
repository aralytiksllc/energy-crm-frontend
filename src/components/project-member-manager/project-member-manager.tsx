// External imports
import React from 'react';
import { Form, Row, Col, Button, Select, Switch, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { UserSelect } from '@components/user-select/user-select';
import { UserAvatar } from '@components/user-avatar';
import { FormListFieldData } from 'antd/es/form';
import { useProjectMemberManagerStyles } from './styles';
import { roleOptions } from './constants';
import { projectMemberValidationRules } from './project-member-manager.rules';
import { IUser } from '@interfaces/users';

const { Text } = Typography;

interface ProjectMemberManagerProps {
  fields: FormListFieldData[];
  add: () => void;
  remove: (index: number) => void;
  users?: IUser[];
  usersLoading?: boolean;
}

export const ProjectMemberManager: React.FC<ProjectMemberManagerProps> = ({
  fields,
  add,
  remove,
  users,
  usersLoading,
}) => {
  const { styles } = useProjectMemberManagerStyles();

  const renderUserOption = (user: IUser) => {
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <UserAvatar user={user} size="small" />
        {fullName}
      </div>
    );
  };

  const getUserLabel = (user: IUser) => {
    return `${user.firstName || ''} ${user.lastName || ''}`.trim();
  };

  const getUserValue = (user: IUser) => user.id || 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Row align="middle">
          <Col span={8}>
            <Text strong>User</Text>
          </Col>
          <Col span={8}>
            <Text strong>Role</Text>
          </Col>
          <Col span={4}>
            <Text strong>Active</Text>
          </Col>
        </Row>
      </div>

      {fields.map(({ key, name: fieldName, ...restField }) => (
        <Row
          key={key}
          align="middle"
          gutter={[16, 0]}
          className={styles.memberRow}
        >
          <Col span={8}>
            <Form.Item
              {...restField}
              name={[fieldName, 'userId']}
              rules={projectMemberValidationRules.user}
              noStyle
            >
              <UserSelect<IUser>
                entities={users || []}
                optionValue={getUserValue}
                optionLabel={getUserLabel}
                renderOption={renderUserOption}
                renderLabel={renderUserOption}
                searchText={getUserLabel}
                loading={usersLoading}
                placeholder="Select User"
                className={styles.fullWidth}
                showSearch
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {...restField}
              name={[fieldName, 'role']}
              rules={projectMemberValidationRules.role}
              noStyle
            >
              <Select
                placeholder="Select Role"
                options={roleOptions}
                className={styles.fullWidth}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              {...restField}
              name={[fieldName, 'isActive']}
              valuePropName="checked"
              noStyle
            >
              <Switch defaultChecked />
            </Form.Item>
          </Col>
          <Col span={4} className={styles.removeButtonCol}>
            <MinusCircleOutlined onClick={() => remove(fieldName)} />
          </Col>
        </Row>
      ))}

      <Button
        type="link"
        onClick={() => add()}
        icon={<PlusOutlined />}
        className={styles.addButton}
      >
        Add Member
      </Button>
    </div>
  );
};
