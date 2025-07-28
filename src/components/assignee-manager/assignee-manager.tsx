import React from 'react';
import { Form, Row, Col, Button, Typography, InputNumber } from 'antd';
import { UserSelect } from '@components/user-select/user-select';
import { UserAvatar } from '@components/user-avatar';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FormListFieldData } from 'antd/es/form';
import { useAssigneeManagerStyles } from './styles';
import { IUser } from '@interfaces/users';

const { Text } = Typography;

interface AssigneeManagerProps {
  fields: FormListFieldData[];
  add: () => void;
  remove: (index: number) => void;
  users?: IUser[];
  usersLoading?: boolean;
}

export const AssigneeManager: React.FC<AssigneeManagerProps> = ({
  fields,
  add,
  remove,
  users,
  usersLoading,
}) => {
  const { styles } = useAssigneeManagerStyles();

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
          <Col span={20}>
            <Text strong>Assignee</Text>
          </Col>
        </Row>
      </div>

      {fields.map(({ key, name: fieldName, ...restField }) => (
        <Row key={key} align="middle" gutter={[16, 0]} className={styles.row}>
          <Col span={16}>
            <Form.Item {...restField} name={[fieldName, 'userId']} noStyle>
              <UserSelect<IUser>
                entities={users || []}
                optionValue={getUserValue}
                optionLabel={getUserLabel}
                renderOption={renderUserOption}
                renderLabel={renderUserOption}
                searchText={getUserLabel}
                loading={usersLoading}
                placeholder="Select Assignee"
                className={styles.fullWidth}
                showSearch
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              {...restField}
              name={[fieldName, 'estimatedHours']}
              noStyle
            >
              <InputNumber
                placeholder="Hours"
                min={0}
                step={0.5}
                className={styles.fullWidth}
                addonAfter="hrs"
              />
            </Form.Item>
          </Col>
          <Col span={2} className={styles.removeButtonCol}>
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
        Add Assignee
      </Button>
    </div>
  );
};
