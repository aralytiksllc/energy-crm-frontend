import React from 'react';
import { Form, Input, Select, Button, Row, Col, DatePicker, Space, Card } from 'antd';
import { GenericTable } from '../../../../components/generic-table';
import { COLORS } from '../../../../styles/theme';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;

interface MeteringPoint {
  id: string;
  branchName: string;
  branchId: string;
  address: string;
  cityRegion: string;
  contact: string;
  status: string;
}

export const MeteringPointsTab: React.FC = () => {
  const meteringPointsData: MeteringPoint[] = [
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

  const columns: ColumnsType<MeteringPoint> = [
    {
      title: 'Branch Name',
      dataIndex: 'branchName',
      key: 'branchName',
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
          <Row gutter={[16, 8]}>
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Metering Point ID (EIC)">
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Status">
                <Select placeholder="Select">
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                  <Option value="pending">Pending</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Connection Type">
                <Select placeholder="Select (Consumption / Generation / Both)">
                  <Option value="consumption">Consumption</Option>
                  <Option value="generation">Generation</Option>
                  <Option value="both">Both</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Utility Provider">
                <Select placeholder="Select (KEDS / KESCO / Other)">
                  <Option value="keds">KEDS</Option>
                  <Option value="kesco">KESCO</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Location Address">
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="GPS Coordinates">
                <Input placeholder="Type here (Lat / Long)" />
              </Form.Item>
            </Col>
            
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
              <Form.Item label="Registered Address">
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
            
            <Col xs={24} sm={24} lg={24}>
              <Form.Item label="Contact Person">
                <Input 
                  placeholder="Link to Contacts tab" 
                  disabled 
                  style={{ color: COLORS.text.secondary }}
                />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Operational Status">
                <Select placeholder="Select (Active / Inactive)">
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Installation Date">
                <DatePicker style={{ width: '100%' }} placeholder="Select Date" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Contract Start Date">
                <DatePicker style={{ width: '100%' }} placeholder="Select Date" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Contract End Date">
                <DatePicker style={{ width: '100%' }} placeholder="Select Date" />
              </Form.Item>
            </Col>
          </Row>
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
        </Row>
        </Form>
        

      

      {/* Table Section */}
      <Card title="Existing Metering Points" size="small">
        <GenericTable<MeteringPoint>
          resource="metering-points"
          columns={columns}
          dataSource={meteringPointsData}
          showCheckbox={true}
          showPagination={false}
          size="middle"
        />
      </Card>
      
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
