import React from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col } from 'antd';

const { Option } = Select;

export const CompanyForm: React.FC = () => {
  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: 0,
      maxHeight: '100%'
    }}>
      <div style={{ 
        flex: 1, 
        overflow: 'hidden', 
        paddingRight: 8,
        minHeight: 0,
        maxHeight: 'calc(100% - 80px)' // Reserve space for Save button
      }}>
        <Form layout="vertical">
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Company Name">
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Business Registration Number">
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Legal ID">
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Legal Status">
                <Select placeholder="Select status">
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                  <Option value="pending">Pending</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={8} lg={8}>
              <Form.Item label="Code">
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={8} lg={8}>
              <Form.Item label="Type">
                <Select placeholder="Select type">
                  <Option value="corporation">Corporation</Option>
                  <Option value="llc">LLC</Option>
                  <Option value="partnership">Partnership</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={8} lg={8}>
              <Form.Item label="Description">
                <Input.TextArea rows={1} placeholder="Type here" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Status">
                <Select placeholder="Select status">
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Founding Date">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Registered Address">
                <Input.TextArea rows={1} placeholder="Type here" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="City / Region">
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Authorized Representative">
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Role">
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Sector Primary">
                <Select placeholder="Select sector">
                  <Option value="technology">Technology</Option>
                  <Option value="finance">Finance</Option>
                  <Option value="healthcare">Healthcare</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Sector Secondary">
                <Select placeholder="Select sector">
                  <Option value="technology">Technology</Option>
                  <Option value="finance">Finance</Option>
                  <Option value="healthcare">Healthcare</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Client Status">
                <Select placeholder="Select status">
                  <Option value="active">Active</Option>
                  <Option value="lead">Lead</Option>
                  <Option value="qualified">Qualified</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} lg={12}>
              <Form.Item label="Preferred Communication Language">
                <Select placeholder="Select language">
                  <Option value="en">English</Option>
                  <Option value="es">Spanish</Option>
                  <Option value="fr">French</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      
      <div style={{ 
        textAlign: 'right', 
        paddingTop: 16, 
        borderTop: '1px solid #f0f0f0',
        flexShrink: 0,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}>
        <Button type="primary" size="large">
          Save
        </Button>
      </div>
    </div>
  );
};
