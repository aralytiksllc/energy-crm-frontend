// External
import * as React from 'react';
import {
  Typography,
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
} from 'antd';
import { useParams } from 'react-router';

// Internal

const { Title, } = Typography;
const { Option } = Select;

export type ContactListProps = Record<string, never>;

export const ContactList: React.FC<ContactListProps> = () => {
  const { customerId } = useParams();

  return (
    <div style={{ padding: '24px' }}>

      <Title level={4}>Contacts</Title>
        <Form layout="vertical">
          <Row gutter={[24, 16]}>
            {/* Left Column */}
            <Col xs={24} md={12}>
              <Form.Item
                name="contactName"
                label="Contact Name"
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="contactType"
                label="Contact type"
              >
                <Select placeholder="Select">
                  <Option value="primary">Primary</Option>
                  <Option value="secondary">Secondary</Option>
                  <Option value="emergency">Emergency</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="companyDepartment"
                label="Company / Department"
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="role"
                label="Role"
              >
                <Select placeholder="Select">
                  <Option value="manager">Manager</Option>
                  <Option value="supervisor">Supervisor</Option>
                  <Option value="operator">Operator</Option>
                  <Option value="analyst">Analyst</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="emailAddress"
                label="Email Address"
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="languagePreference"
                label="Language Preference"
              >
                <Select placeholder="Select language">
                  <Option value="en">English</Option>
                  <Option value="sq">Albanian</Option>
                  <Option value="sr">Serbian</Option>
                  <Option value="tr">Turkish</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="status"
                label="Status"
              >
                <Select placeholder="Select status">
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                  <Option value="pending">Pending</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="branchName"
                label="Branch Name"
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
          </Row>
        </Form>

      {/* Action Buttons */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        display: 'flex',
        gap: '12px'
      }}>
        <Button size="large" style={{
          backgroundColor: '#f5f5f5',
          borderColor: '#d9d9d9',
          color: '#262626'
        }}>
          Next Step
        </Button>
        <Button type="primary" size="large">
          Create
        </Button>
      </div>
    </div>
  );
};
