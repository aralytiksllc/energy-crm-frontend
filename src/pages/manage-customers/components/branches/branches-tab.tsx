import React from 'react';
import { Form, Input, Select, Button, Row, Col, Space } from 'antd';
import { GenericTable } from '../../../../components/generic-table';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;

interface Branch {
  id: string;
  branchName: string;
  branchId: string;
  address: string;
  cityRegion: string;
  contact: string;
  status: string;
}

export const BranchesTab: React.FC = () => {
  const branchesData: Branch[] = [
    {
      id: '1',
      branchName: 'HIB Petrol',
      branchId: 'GF5678',
      address: 'Rruga Blerim Sykaj 22',
      cityRegion: 'Pristina',
      contact: 'Arben Gashi',
      status: 'Active',
    },
    {
      id: '2',
      branchName: 'Blue Energy',
      branchId: 'BE9101',
      address: 'Rruga 1 Tetori 15',
      cityRegion: 'Ferizaj',
      contact: 'Liridon Kastrati',
      status: 'Active',
    },
    {
      id: '3',
      branchName: 'QuickGas',
      branchId: 'QG1122',
      address: 'Rruga Skenderbeu 10',
      cityRegion: 'Gjakova',
      contact: 'Albulena Hoxha',
      status: 'Active',
    },
  ];

  const columns: ColumnsType<Branch> = [
    {
      title: 'Branch Name',
      dataIndex: 'branchName',
      key: 'branchName',
      sorter: true,
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Branch ID',
      dataIndex: 'branchId',
      key: 'branchId',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'City / Region',
      dataIndex: 'cityRegion',
      key: 'cityRegion',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <span>{text}</span>,
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%', marginTop: '1rem' }}>
      {/* Form Section */}
        <Form layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Branch Name">
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Branch Code / ID">
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Address">
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="City / Region">
                <Select placeholder="Select">
                  <Option value="pristina">Pristina</Option>
                  <Option value="ferizaj">Ferizaj</Option>
                  <Option value="gjakova">Gjakova</Option>
                  <Option value="peja">Peja</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Contact Person">
                <Select placeholder="Select">
                  <Option value="arben">Arben Gashi</Option>
                  <Option value="liridon">Liridon Kastrati</Option>
                  <Option value="albulena">Albulena Hoxha</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Operational Status">
                <Select placeholder="Select(Active / Inactive)">
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <GenericTable<Branch>
          resource="branches"
          columns={columns}
          dataSource={branchesData}
          showCheckbox={true}
          showPagination={false}
          size="middle"
        />
      
      <div style={{ 
        textAlign: 'right', 
        paddingTop: 16, 
        borderTop: '1px solid #f0f0f0',
        paddingBottom: 16
      }}>
        <Button type="primary" size="large">
          Save
        </Button>
      </div>
    </Space>
  );
};
