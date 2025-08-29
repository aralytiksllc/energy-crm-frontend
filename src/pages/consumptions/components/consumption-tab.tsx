import React from 'react';
import { Form, Input, Row, Col, Space } from 'antd';
// import { DragUpload } from '../../../components/drag-upload';

export const ConsumptionTab: React.FC = () => {
  return (
    <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Metering Point ID Field */}
        <Form.Item label="Metering Point ID (EIC)">
          <Input placeholder="Autofill" />
        </Form.Item>

        {/* File Upload Area */}
        {/* <DragUpload
          uploadText="Click or drag file to this area to upload"
          uploadHint="Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files"
        /> */}

        {/* Summary Data Fields */}
        <Row gutter={[16, 16]} style={{ margin: 0 }}>
          <Col xs={24} sm={12}>
            <Form.Item label="Data Range Covered">
              <Input placeholder="Auto after upload" />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item label="Average Daily kWh">
              <Input placeholder="Auto after upload" />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item label="Peak Load (kW)">
              <Input placeholder="Auto after upload" />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item label="Weather Data Linkage">
              <Input placeholder="Auto after upload" />
            </Form.Item>
          </Col>
        </Row>
      </Space>
    </div>
  );
};
