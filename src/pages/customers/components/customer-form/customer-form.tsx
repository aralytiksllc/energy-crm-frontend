// External
import * as React from 'react';
import { Form, Input, Select, DatePicker, Row, Col, Typography } from 'antd';

// Internal
import { DayjsTransformer } from '@/helpers/dayjs-transformer';
import { stageOptions } from '@/constants/stage-options';
import { customerFormRules } from './customer-form.rules';
import type { CustomerFormProps } from './customer-form.types';

const { Option } = Select;
const { Title } = Typography;

export const CustomerForm: React.FC<CustomerFormProps> = (props) => {
  const { formProps } = props;

  return (
    <Form {...formProps} layout="vertical" scrollToFirstError>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            name="companyName"
            label="Company Name"
            rules={customerFormRules.companyName}
          >
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            name="registrationNumber"
            label="Business Registration Number"
            rules={customerFormRules.registrationNumber}
          >
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            name="legalId"
            label="Legal ID"
            rules={customerFormRules.legalId}
          >
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            name="legalStatus"
            label="Legal Status"
            rules={customerFormRules.legalStatus}
          >
            <Select placeholder="Select status">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="pending">Pending</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8} lg={8}>
          <Form.Item
            name="companyCode"
            label="Code"
            rules={customerFormRules.companyCode}
          >
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8} lg={8}>
          <Form.Item
            name="companyType"
            label="Type"
            rules={customerFormRules.companyType}
          >
            <Select placeholder="Select type">
              <Option value="corporation">Corporation</Option>
              <Option value="llc">LLC</Option>
              <Option value="partnership">Partnership</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={8} lg={8}>
          <Form.Item
            name="companyDescription"
            label="Description"
            rules={customerFormRules.companyDescription}
          >
            <Input.TextArea rows={1} placeholder="Type here" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            name="companyStatus"
            label="Status"
            rules={customerFormRules.companyStatus}
          >
            <Select placeholder="Select status">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            name="registrationDate"
            label="Founding Date"
            rules={customerFormRules.registrationDate}
            getValueProps={DayjsTransformer.toValueProps}
            normalize={DayjsTransformer.toNormalizedDate}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col xs={24}>
          <Title level={5} style={{ margin: '8px 0' }}>
            Address & Location
          </Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            name="registeredAddress"
            label="Registered Address"
            rules={customerFormRules.registeredAddress}
          >
            <Input.TextArea rows={1} placeholder="Type here" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            name="cityRegion"
            label="City / Region"
            rules={customerFormRules.cityRegion}
          >
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col xs={24}>
          <Title level={5} style={{ margin: '8px 0' }}>
            Business Profile
          </Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            name="authorizedRepresentative"
            label="Authorized Representative"
            rules={customerFormRules.authorizedRepresentative}
          >
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            name="companyRole"
            label="Role"
            rules={customerFormRules.companyRole}
          >
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            name="sectorPrimary"
            label="Sector Primary"
            rules={customerFormRules.sectorPrimary}
          >
            <Select placeholder="Select sector">
              <Option value="technology">Technology</Option>
              <Option value="finance">Finance</Option>
              <Option value="healthcare">Healthcare</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            name="sectorSecondary"
            label="Sector Secondary"
            rules={customerFormRules.sectorSecondary}
          >
            <Select placeholder="Select sector">
              <Option value="technology">Technology</Option>
              <Option value="finance">Finance</Option>
              <Option value="healthcare">Healthcare</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            name="clientStatus"
            label="Client Status"
            rules={customerFormRules.clientStatus}
          >
            <Select placeholder="Select status">
              {stageOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            name="preferredCommunicationLanguage"
            label="Preferred Communication Language"
            rules={customerFormRules.preferredCommunicationLanguage}
          >
            <Select placeholder="Select language">
              <Option value="en">English</Option>
              <Option value="es">Spanish</Option>
              <Option value="fr">French</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
