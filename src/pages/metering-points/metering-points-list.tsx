// External
import * as React from 'react';
import { 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Row, 
  Col, 
  Table, 
  Button, 
  Card,
  Checkbox,
  Typography 
} from 'antd';
import { useParams } from 'react-router';

// Internal

const { Option } = Select;
const { Title } = Typography;

export type MeteringPointsListProps = Record<string, never>;

export const MeteringPointsList: React.FC<MeteringPointsListProps> = () => {
  const { customerId } = useParams();

  // Mock data for the table
  const mockData = [
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

  const columns = [
    {
      title: '',
      dataIndex: 'checkbox',
      key: 'checkbox',
      width: 50,
      render: () => <Checkbox />,
    },
    {
      title: 'Branch Name',
      dataIndex: 'branchName',
      key: 'branchName',
    },
    {
      title: 'Branch ID',
      dataIndex: 'branchId',
      key: 'branchId',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'City / Region',
      dataIndex: 'cityRegion',
      key: 'cityRegion',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* Form Section */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ marginBottom: '24px' }}>
          Metering Point Details
        </Title>
        
        <Form layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="meteringPointId"
                label="Metering Point ID (EIC)"
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="status"
                label="Status"
              >
                <Select placeholder="Select">
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                  <Option value="pending">Pending</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="connectionType"
                label="Connection Type"
              >
                <Select placeholder="Select (Consumption / Generation / Both)">
                  <Option value="consumption">Consumption</Option>
                  <Option value="generation">Generation</Option>
                  <Option value="both">Both</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="utilityProvider"
                label="Utility Provider"
              >
                <Select placeholder="Select (KEDS / KESCO / Other)">
                  <Option value="keds">KEDS</Option>
                  <Option value="kesco">KESCO</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="locationAddress"
                label="Location Address"
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="gpsCoordinates"
                label="GPS Coordinates"
              >
                <Input placeholder="Type here (Lat / Long)" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="branchName"
                label="Branch Name"
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="branchCode"
                label="Branch Code / ID"
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="registeredAddress"
                label="Registered Address"
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="cityRegion"
                label="City / Region"
              >
                <Select placeholder="Select">
                  <Option value="pristina">Pristina</Option>
                  <Option value="ferizaj">Ferizaj</Option>
                  <Option value="gjakova">Gjakova</Option>
                  <Option value="peja">Peja</Option>
                  <Option value="mitrovica">Mitrovica</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="contactPerson"
                label="Contact Person"
              >
                <Input placeholder="Link to Contacts tab" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="operationalStatus"
                label="Operational Status"
              >
                <Select placeholder="Select (Active / Inactive)">
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="installationDate"
                label="Installation Date"
              >
                <DatePicker style={{ width: '100%' }} placeholder="Select Date" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="contractEndDate"
                label="Contract End Date"
              >
                <DatePicker style={{ width: '100%' }} placeholder="Select Date" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="searchBranchName"
                label="Branch Name"
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="searchBranchCode"
                label="Branch Code / ID"
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* Table Section */}
      <Card>
        <Title level={4} style={{ marginBottom: '16px' }}>
          Branch Information
        </Title>
        <Table
          dataSource={mockData}
          columns={columns}
          pagination={false}
          rowKey="id"
        />
      </Card>

      {/* Save Button */}
      <div style={{ 
        position: 'fixed', 
        bottom: '24px', 
        right: '24px', 
        zIndex: 1000 
      }}>
        <Button type="primary" size="large">
          Save
        </Button>
      </div>
    </div>
  );
};
