// External
import * as React from 'react';
import type { FormProps } from 'antd'; // v5
import { Form, Row, Col, Input, Select } from 'antd';

// Internal
import type { IContact } from '@/interfaces/contacts';
import { contactFormRules } from './contact-form.rules';
import { useStyles } from './contact-form.styles';
import { useParams } from 'react-router';

export type ContactFormProps = {
  formProps: FormProps<IContact>;
};

const { Option } = Select;

export const ContactForm: React.FC<ContactFormProps> = (props) => {
  const { formProps } = props;

  const { customerId } = useParams();

  const { styles } = useStyles();

  const initialValues = {
    ...formProps.initialValues,
    customerId: Number(customerId),
  };

  return (
    <Form
      {...formProps}
      initialValues={initialValues}
      layout="vertical"
      scrollToFirstError
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="contactName" label="Contact Name">
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="contactType" label="Contact type">
            <Select placeholder="Select">
              <Option value="primary">Primary</Option>
              <Option value="secondary">Secondary</Option>
              <Option value="emergency">Emergency</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="companyDepartment" label="Company / Department">
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="role" label="Role">
            <Select placeholder="Select">
              <Option value="manager">Manager</Option>
              <Option value="supervisor">Supervisor</Option>
              <Option value="operator">Operator</Option>
              <Option value="analyst">Analyst</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="phoneNumber" label="Phone Number">
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="emailAddress" label="Email Address">
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="languagePreference" label="Language Preference">
            <Select placeholder="Select language">
              <Option value="en">English</Option>
              <Option value="sq">Albanian</Option>
              <Option value="sr">Serbian</Option>
              <Option value="tr">Turkish</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item name="status" label="Status">
            <Select placeholder="Select status">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="pending">Pending</Option>
            </Select>
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
          {/* Placehold */}
        </Col>
      </Row>
    </Form>
  );
};
