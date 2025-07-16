import React from 'react';
import {
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Button,
  Space,
  Switch,
  Select,
} from 'antd';
import { useCreate } from '@refinedev/core';
import { UserSelect } from '@components/user-select/user-select';
import { UserAvatar } from '@components/user-avatar';
import { planningValidationRules } from '@modules/planning/validation';
import type { IPlanningFormValues } from '@interfaces/planning';
import type { IProject } from '@interfaces/project';
import type { IUser } from '@interfaces/users';
import dayjs from 'dayjs';

const { TextArea } = Input;

interface PlanningFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  filteredProjects?: IProject[];
  users?: IUser[];
  usersLoading?: boolean;
}

const PlanningForm: React.FC<PlanningFormProps> = ({
  onSuccess,
  onCancel,
  filteredProjects = [],
  users = [],
  usersLoading = false,
}) => {
  const [form] = Form.useForm();
  const { mutate: createPlanning, isLoading } = useCreate();

  const renderUserOption = (user: IUser) => {
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    return (
      <Space>
        <UserAvatar user={user} size="small" />
        {fullName}
      </Space>
    );
  };

  const getUserLabel = (user: IUser) => {
    return `${user.firstName || ''} ${user.lastName || ''}`.trim();
  };

  const getUserValue = (user: IUser) => user.id || 0;

  const handleSubmit = (values: IPlanningFormValues) => {
    const transformedValues = {
      ...values,
      startDate: values.startDate
        ? dayjs(values.startDate).format('YYYY-MM-DD')
        : undefined,
      endDate: values.endDate
        ? dayjs(values.endDate).format('YYYY-MM-DD')
        : undefined,
      completedDate: values.completedDate
        ? dayjs(values.completedDate).format('YYYY-MM-DD')
        : undefined,
      isCompleted: values.isCompleted || false,
    };

    createPlanning(
      {
        resource: 'plannings',
        values: transformedValues,
      },
      {
        onSuccess: () => {
          form.resetFields();
          onSuccess();
        },
      },
    );
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleCompletedChange = (checked: boolean) => {
    if (!checked) {
      form.setFieldValue('completedDate', undefined);
    }
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
          <Col xs={24}>
            <Form.Item
              label="Title"
              name="title"
              rules={planningValidationRules.title}
              required
            >
              <Input placeholder="Enter planning title" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={planningValidationRules.description}
            >
              <TextArea
                rows={3}
                placeholder="Enter planning description (optional)..."
                maxLength={1000}
                showCount
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Assigned User"
              name="assignedUserId"
              rules={planningValidationRules.assignedUserId}
              required
            >
              <UserSelect<IUser>
                entities={users}
                optionValue={getUserValue}
                optionLabel={getUserLabel}
                renderOption={renderUserOption}
                renderLabel={renderUserOption}
                searchText={getUserLabel}
                loading={usersLoading}
                placeholder="Select a user to assign"
                showSearch
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Project"
              name="projectId"
              rules={planningValidationRules.projectId}
              required
            >
              <Select
                placeholder="Select a project"
                showSearch
                optionFilterProp="children"
              >
                {filteredProjects.map((project) => (
                  <Select.Option key={project.id} value={project.id}>
                    {project.name}
                  </Select.Option>
                ))}
              </Select>
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
              required
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder="Select end date"
                showTime={false}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Form.Item
              label="Notes"
              name="notes"
              rules={planningValidationRules.notes}
            >
              <TextArea
                rows={3}
                placeholder="Any additional notes about this planning (optional)..."
                maxLength={1000}
                showCount
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Form.Item
              label="Mark as Completed"
              name="isCompleted"
              valuePropName="checked"
              rules={planningValidationRules.isCompleted}
            >
              <Switch onChange={handleCompletedChange} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Form.Item
              label="Completed Date"
              name="completedDate"
              rules={planningValidationRules.completedDate}
              dependencies={['isCompleted']}
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder="Select completion date"
                showTime={false}
                disabled={!Form.useWatch('isCompleted', form)}
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
            <Button onClick={handleCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Create Planning
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PlanningForm;
