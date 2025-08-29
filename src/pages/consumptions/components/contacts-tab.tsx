import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';

const { Option } = Select;

export const ContactsTab: React.FC = () => {
  return (
    <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      <Form layout="vertical">
        <Row gutter={[16, 16]} style={{ margin: 0 }}>
          <Col xs={24} sm={12}>
            <Form.Item label="Contact Name">
              <Input placeholder="Type here" />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item label="Contact type">
              <Select placeholder="Select">
                <Option value="primary">Primary</Option>
                <Option value="secondary">Secondary</Option>
                <Option value="emergency">Emergency</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item label="Company / Department">
              <Input placeholder="Type here" />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item label="Role">
              <Select placeholder="Select">
                <Option value="manager">Manager</Option>
                <Option value="director">Director</Option>
                <Option value="coordinator">Coordinator</Option>
                <Option value="representative">Representative</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item label="Phone Number">
              <Input placeholder="Type here" />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item label="Email Address">
              <Input placeholder="Type here" />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item label="Language Preference">
              <Select placeholder="Select language">
                <Option value="en">English</Option>
                <Option value="es">Spanish</Option>
                <Option value="fr">French</Option>
                <Option value="de">German</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item label="Status">
              <Select placeholder="Select status">
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
                <Option value="pending">Pending</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item label="Branch Name">
              <Input placeholder="Type here" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
