// External
import * as React from 'react';
import { Form, Input, Select, DatePicker, Row, Col } from 'antd';

// Internal
import type { MeteringPointFormProps } from './metering-point-form.types';

const { Option } = Select;

export const MeteringPointForm: React.FC<MeteringPointFormProps> = (
  props,
) => {
  const { formProps } = props;

  return (
    <Form {...formProps} layout="vertical" scrollToFirstError>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="meteringPointId" label="Metering Point ID (EIC)">
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="status" label="Status">
            <Select placeholder="Select">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="pending">Pending</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="connectionType" label="Connection Type">
            <Select placeholder="Select (Consumption / Generation / Both)">
              <Option value="consumption">Consumption</Option>
              <Option value="generation">Generation</Option>
              <Option value="both">Both</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="utilityProvider" label="Utility Provider">
            <Select placeholder="Select (KEDS / KESCO / Other)">
              <Option value="keds">KEDS</Option>
              <Option value="kesco">KESCO</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="locationAddress" label="Location Address">
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="gpsCoordinates" label="GPS Coordinates">
            <Input placeholder="Type here (Lat / Long)" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="branchName" label="Branch Name">
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="branchCode" label="Branch Code / ID">
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="registeredAddress" label="Registered Address">
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="cityRegion" label="City / Region">
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
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="contactPerson" label="Contact Person">
            <Input placeholder="Link to Contacts tab" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="operationalStatus" label="Operational Status">
            <Select placeholder="Select (Active / Inactive)">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="installationDate" label="Installation Date">
            <DatePicker style={{ width: '100%' }} placeholder="Select Date" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="contractEndDate" label="Contract End Date">
            <DatePicker style={{ width: '100%' }} placeholder="Select Date" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="searchBranchName" label="Branch Name">
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="searchBranchCode" label="Branch Code / ID">
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
