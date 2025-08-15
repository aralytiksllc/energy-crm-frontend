import React from 'react';
import { Form, Select, Space } from 'antd';
import { DragUpload } from '../../../components/drag-upload';

const { Option } = Select;

export const DocumentsTab: React.FC = () => {
  return (
    <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Document Type Selection */}
        <Form.Item label="Document Type">
          <Select 
            placeholder="Select (KEDS Data Certificate / Business Registration Certificate / VAT Certificate / Prior Invoices / Signed Contracts / Power of Attorney)"
            size="large"
          >
            <Option value="keds">KEDS Data Certificate</Option>
            <Option value="business">Business Registration Certificate</Option>
            <Option value="vat">VAT Certificate</Option>
            <Option value="invoices">Prior Invoices</Option>
            <Option value="contracts">Signed Contracts</Option>
            <Option value="power">Power of Attorney</Option>
          </Select>
        </Form.Item>

        {/* File Upload Area */}
        <DragUpload
          uploadText="Click or drag file to this area to upload"
          uploadHint="Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files"
        />
      </Space>
    </div>
  );
};
