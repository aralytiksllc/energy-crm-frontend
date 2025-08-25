import React from 'react';
import { Form, Input, Select, DatePicker, Row, Col, Typography, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title, Text } = Typography;

export const CompanyInfoTab: React.FC = () => {
  return (
    <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Identification Section */}
        <div>
          <Title level={5} style={{ margin: '0 0 16px 0' }}>Identification</Title>
          
          <Input
            placeholder="Search business ID or MPID..."
            prefix={<SearchOutlined />}
          />
          <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
            Enter the company ID or MPID to automatically add from ARBK or you can do it the manual way
          </Text>
        </div>

        {/* Form Fields */}
        <Form layout="vertical">
          <Row gutter={[16, 16]} style={{ margin: 0 }}>
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Company Name">
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Business Registration Number">
                <Input placeholder="Autofill" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Legal ID">
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Legal Status">
                <Select placeholder="Type here">
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                  <Option value="pending">Pending</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={8} lg={8}>
              <Form.Item label="Code">
                <Input placeholder="Autofill" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={8} lg={8}>
              <Form.Item label="Type">
                <Select placeholder="Autofill">
                  <Option value="corporation">Corporation</Option>
                  <Option value="llc">LLC</Option>
                  <Option value="partnership">Partnership</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={8} lg={8}>
              <Form.Item label="Description">
                <Input placeholder="Autofill" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Status">
                <Select placeholder="Select">
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Founding Date">
                <DatePicker style={{ width: '100%' }} placeholder="Type here" />
              </Form.Item>
            </Col>
          </Row>

          {/* Address & Location Section */}
          <Row gutter={[16, 16]} style={{ margin: 0 }}>
            <Col xs={24}>
              <Title level={5} style={{ margin: '24px 0 16px 0' }}>Address & Location</Title>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Registered Address">
                <Input placeholder="Autofill" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="City / Region">
                <Select placeholder="Autofill">
                  <Option value="pristina">Pristina</Option>
                  <Option value="ferizaj">Ferizaj</Option>
                  <Option value="gjakova">Gjakova</Option>
                  <Option value="peja">Peja</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Business Profile Section */}
          <Row gutter={[16, 16]} style={{ margin: 0 }}>
            <Col xs={24}>
              <Title level={5} style={{ margin: '24px 0 16px 0' }}>Business Profile</Title>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Authorized Representative">
                <Input placeholder="Autofill" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Role">
                <Input placeholder="Autofill" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Sector Primary">
                <Select placeholder="Autofill">
                  <Option value="technology">Technology</Option>
                  <Option value="finance">Finance</Option>
                  <Option value="healthcare">Healthcare</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Sector Secondary">
                <Select placeholder="Autofill">
                  <Option value="technology">Technology</Option>
                  <Option value="finance">Finance</Option>
                  <Option value="healthcare">Healthcare</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Client Status">
                <Select placeholder="Autofill (Lead / Qualified / Contracted / Active Supply)">
                  <Option value="lead">Lead</Option>
                  <Option value="qualified">Qualified</Option>
                  <Option value="contracted">Contracted</Option>
                  <Option value="active">Active Supply</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Preferred Communication Language">
                <Select placeholder="Autofill (Albanian / English / Serbian)">
                  <Option value="albanian">Albanian</Option>
                  <Option value="english">English</Option>
                  <Option value="serbian">Serbian</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Space>
    </div>
  );
};
