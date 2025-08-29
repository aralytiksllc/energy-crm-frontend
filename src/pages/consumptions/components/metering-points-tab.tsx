import React from 'react';
import { Form, Input, Select, DatePicker, Row, Col } from 'antd';
import { DayjsTransformer } from '@/helpers/dayjs-transformer';

const { Option } = Select;

export const MeteringPointsTab: React.FC = () => {
  return (
    <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      <Form layout="vertical">
        <Row gutter={[16, 16]} style={{ margin: 0 }}>
          <Col xs={24} sm={12}>
            <Form.Item label="Metering Point ID (EIC)">
              <Input placeholder="Type here" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Status">
              <Select placeholder="Select">
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
                <Option value="pending">Pending</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Connection Type">
              <Select placeholder="Select (Consumption / Generation / Both)">
                <Option value="consumption">Consumption</Option>
                <Option value="generation">Generation</Option>
                <Option value="both">Both</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Utility Provider">
              <Select placeholder="Select (KEDS / KESCO / Other)">
                <Option value="keds">KEDS</Option>
                <Option value="kesco">KESCO</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Location Address">
              <Input placeholder="Type here" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="GPS Coordinates">
              <Input placeholder="Type here (Lat / Long)" />
            </Form.Item>
          </Col>

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
            <Form.Item label="Registered Address">
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
              <Input placeholder="Link to Contacts tab" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Operational Status">
              <Select placeholder="Select (Active / Inactive)">
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Installation Date"
              getValueProps={DayjsTransformer.toValueProps}
              normalize={DayjsTransformer.toNormalizedDate}
            >
              <DatePicker style={{ width: '100%' }} placeholder="Select Date" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Contract End Date"
              getValueProps={DayjsTransformer.toValueProps}
              normalize={DayjsTransformer.toNormalizedDate}
            >
              <DatePicker style={{ width: '100%' }} placeholder="Select Date" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
