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
  Card,
  Table,
  Space,
  Avatar,
} from 'antd';
import { useParams } from 'react-router';
import { EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';

// Internal

const { Title } = Typography;
const { Option } = Select;

export type ContactListProps = Record<string, never>;

export const ContactList: React.FC<ContactListProps> = () => {
  const { customerId } = useParams();

  // Mock data for contacts list
  const mockContacts = [
    {
      id: '1',
      name: 'Arben Gashi',
      type: 'Primary',
      company: 'HIB Petrol',
      role: 'Manager',
      phone: '+383 44 123 456',
      email: 'arben.gashi@hibpetrol.com',
      language: 'Albanian',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Liridon Kastrati',
      type: 'Secondary',
      company: 'Blue Energy',
      role: 'Supervisor',
      phone: '+383 49 234 567',
      email: 'liridon.kastrati@blueenergy.com',
      language: 'Albanian',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Albulena Hoxha',
      type: 'Emergency',
      company: 'QuickGas',
      role: 'Operator',
      phone: '+383 45 345 678',
      email: 'albulena.hoxha@quickgas.com',
      language: 'English',
      status: 'Active',
    },
  ];

  const columns = [
    {
      title: 'Contact Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <Avatar icon={<UserOutlined />} size="small" />
          {text}
        </Space>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span style={{ 
          color: status === 'Active' ? '#52c41a' : '#faad14',
          fontWeight: 'bold'
        }}>
          {status}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            onClick={() => console.log('Edit contact:', record.id)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={() => console.log('Delete contact:', record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
        <Title level={4} style={{ marginBottom: '24px' }}>
          Add New Contact
        </Title>
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
        <Table
          dataSource={mockContacts}
          columns={columns}
          pagination={false}
          rowKey="id"
        />

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
