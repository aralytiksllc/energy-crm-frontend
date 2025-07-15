import React from 'react';
import { Form, Row, Col, Button, InputNumber, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { UserSelect } from '@components/user-select/user-select';
import { FormListFieldData } from 'antd/es/form';
import { useAssigneeManagerStyles } from './styles';
import { rules } from './assignee-manager.rules';

const { Text } = Typography;

interface AssigneeManagerProps {
  fields: FormListFieldData[];
  add: () => void;
  remove: (index: number) => void;
}

export const AssigneeManager: React.FC<AssigneeManagerProps> = ({
  fields,
  add,
  remove,
}) => {
  const { styles } = useAssigneeManagerStyles();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Row align="middle">
          <Col span={12}>
            <Text strong>User</Text>
          </Col>
          <Col span={8}>
            <Text strong>Assigned Hours</Text>
          </Col>
        </Row>
      </div>

      {fields.map(({ key, name: fieldName, ...restField }) => (
        <Row key={key} align="middle" gutter={[16, 0]} className={styles.row}>
          <Col span={12}>
            <Form.Item
              {...restField}
              name={[fieldName, 'userId']}
              rules={rules.userId}
              noStyle
            >
              <UserSelect
                placeholder="Select User"
                className={styles.fullWidth}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {...restField}
              name={[fieldName, 'estimatedHours']}
              rules={rules.estimatedHours}
              noStyle
            >
              <InputNumber
                placeholder="Hours"
                min={0}
                className={styles.fullWidth}
              />
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
        Add Assignee
      </Button>
    </div>
  );
};
