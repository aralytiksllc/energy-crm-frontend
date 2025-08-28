// External
import * as React from 'react';
import { 
  Card, 
  Typography, 
  Row, 
  Col, 
  Table, 
  Input, 
  Select, 
  DatePicker, 
  Button, 
  Checkbox,
  Tag,
  Space
} from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Internal

const { Title } = Typography;
const { Option } = Select;

export type UsersListProps = {};

export const UsersList: React.FC<UsersListProps> = () => {
  // Mock data for users
  const mockUsers = [
    {
      id: '1',
      name: 'Arben Gashi',
      email: 'Arbengashi@company.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2025-02-20',
    },
    {
      id: '2',
      name: 'Liridon Kastrati',
      email: 'Liridonkastrati@company.com',
      role: 'Analyst',
      status: 'Active',
      lastLogin: '2025-03-05',
    },
    {
      id: '3',
      name: 'Albulena Hoxha',
      email: 'Albulenahoxha@company.com',
      role: 'Analyst',
      status: 'Active',
      lastLogin: '2025-04-10',
    },
  ];

  const columns = [
    {
      title: '',
      dataIndex: 'checkbox',
      key: 'checkbox',
      width: 50,
      render: () => <Checkbox />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Emails',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color="green">{status}</Tag>
      ),
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => console.log('Edit user:', record.id)}
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            onClick={() => console.log('Delete user:', record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <Title level={2} style={{ marginBottom: '24px' }}>
        Manage User Access
      </Title>

      {/* Search and Filters */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <div>
              <div style={{ marginBottom: '8px', fontWeight: 500 }}>Search</div>
              <Input 
                placeholder="Search..." 
                prefix={<SearchOutlined />}
                style={{ width: '100%' }}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div>
              <div style={{ marginBottom: '8px', fontWeight: 500 }}>Role</div>
              <Select 
                placeholder="All Selected" 
                style={{ width: '100%' }}
                defaultValue="all"
              >
                <Option value="all">All Selected</Option>
                <Option value="admin">Admin</Option>
                <Option value="analyst">Analyst</Option>
                <Option value="user">User</Option>
              </Select>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div>
              <div style={{ marginBottom: '8px', fontWeight: 500 }}>Status</div>
              <Select 
                placeholder="All Selected" 
                style={{ width: '100%' }}
                defaultValue="all"
              >
                <Option value="all">All Selected</Option>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
                <Option value="pending">Pending</Option>
              </Select>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div>
              <div style={{ marginBottom: '8px', fontWeight: 500 }}>Installation Date</div>
              <DatePicker 
                placeholder="Select Date" 
                style={{ width: '100%' }}
              />
            </div>
          </Col>
        </Row>
      </Card>

      {/* Users Table */}
      <Card>
        <Table
          dataSource={mockUsers}
          columns={columns}
          pagination={false}
          rowKey="id"
        />
      </Card>
    </div>
  );
};
