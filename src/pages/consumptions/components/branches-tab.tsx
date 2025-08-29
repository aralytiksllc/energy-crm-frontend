import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';

const { Option } = Select;

export const BranchesTab: React.FC = () => {
  return (
    <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      <Form layout="vertical">
        <Row gutter={[16, 16]} style={{ margin: 0 }}>
          <Col xs={24} sm={12}>
            <Form.Item label="Branch Name">
              <Input placeholder="Type here" />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item label="Branch Code / ID">
              <Input placeholder="Type here" />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item label="Address">
              <Input placeholder="Type here" />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item label="City / Region">
              <Select placeholder="Select">
                <Option value="pristina">Pristina</Option>
                <Option value="ferizaj">Ferizaj</Option>
                <Option value="gjakova">Gjakova</Option>
                <Option value="peja">Peja</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item label="Contact Person">
              <Select placeholder="Select">
                <Option value="arben">Arben Gashi</Option>
                <Option value="liridon">Liridon Kastrati</Option>
                <Option value="albulena">Albulena Hoxha</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item label="Operational Status">
              <Select placeholder="Select(Active / Inactive)">
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
