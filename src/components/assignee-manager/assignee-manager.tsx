import React from 'react';
import { Form, Row, Col, Button, InputNumber, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { UserSelect } from '@/components/user-select/user-select';
import { FormListFieldData } from 'antd/es/form';
import { assigneeManagerStyles } from './styles';

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
  return (
    <div style={assigneeManagerStyles.container}>
      <div style={assigneeManagerStyles.header}>
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
        <Row
          key={key}
          align="middle"
          gutter={[16, 0]}
          style={{ marginBottom: '8px' }}
        >
          <Col span={12}>
            <Form.Item
              {...restField}
              name={[fieldName, 'userId']}
              rules={[{ required: true, message: 'Please select a user' }]}
              noStyle
            >
              <UserSelect placeholder="Select User" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {...restField}
              name={[fieldName, 'estimatedHours']}
              rules={[{ required: true, message: 'Hours?' }]}
              noStyle
            >
              <InputNumber
                placeholder="Hours"
                min={0}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={4} style={{ textAlign: 'center' }}>
            <MinusCircleOutlined onClick={() => remove(fieldName)} />
          </Col>
        </Row>
      ))}

      <Button
        type="link"
        onClick={() => add()}
        icon={<PlusOutlined />}
        style={{ paddingLeft: 0, marginTop: '8px' }}
      >
        Add Assignee
      </Button>
    </div>
  );
};
