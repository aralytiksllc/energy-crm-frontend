import React from 'react';
import { Form, Input, DatePicker, Row, Col, Button, Space } from 'antd';
import { UserSelect } from '@components/user-select/user-select';
import { RemoteSelect } from '@components/remote-select';
import { planningValidationRules } from '@modules/planning/validation';

const { TextArea } = Input;

interface PlanningFormProps {
  onSuccess: () => void;
}

const PlanningForm: React.FC<PlanningFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('Planning form values:', values);
    onSuccess();
  };

  const handleCancel = () => {
    form.resetFields();
    onSuccess();
  };
  return (
    <div style={{ padding: '24px' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={true}
        size="large"
        validateTrigger={['onBlur', 'onSubmit']}
        validateMessages={{
          required: '${label} is required',
          types: {
            number: '${label} must be a valid number',
          },
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Assigned User"
              name="userId"
              rules={planningValidationRules.user}
              required
            >
              <UserSelect placeholder="Select a user to assign" showSearch />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Project"
              name="projectId"
              rules={planningValidationRules.project}
              required
            >
              <RemoteSelect
                resource="projects"
                optionLabel="name"
                optionValue="id"
                placeholder="Select a project"
                showSearch
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={planningValidationRules.startDate}
              required
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder="Select start date"
                showTime={false}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="End Date"
              name="endDate"
              rules={planningValidationRules.endDate}
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder="Select end date (optional)"
                showTime={false}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={24}>
            <Form.Item
              label="Notes"
              name="notes"
              rules={planningValidationRules.notes}
            >
              <TextArea
                rows={3}
                placeholder="Any additional notes about this planning assignment (optional)..."
                maxLength={500}
                showCount
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          style={{
            marginBottom: 0,
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid #f0f0f0',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'flex-end',
            }}
          >
            <Space>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Create Planning
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PlanningForm;
