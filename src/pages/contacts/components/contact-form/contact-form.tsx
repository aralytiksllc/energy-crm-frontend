// External
import * as React from 'react';
import { Form, Row, Col, Input, Select } from 'antd';
import { useParams } from 'react-router';

// Internal
import type { IContact } from '@/interfaces/contacts';
import { useLatest } from '@/hooks/use-latest';
import { rules } from './contact-form.rules';
import type { ContactFormProps } from './contact-form.types';

const { Option } = Select;

export const ContactForm: React.FC<ContactFormProps> = (props) => {
  const { formProps } = props;

  const { customerId } = useParams();

  const onFinishRef = useLatest(formProps.onFinish);

  const customerIdRef = useLatest(customerId);

  const handleFinish = React.useCallback(
    (values: IContact) => {
      const customerId = Number(customerIdRef.current);
      return onFinishRef.current?.({ ...values, customerId });
    },
    [onFinishRef, customerIdRef],
  );

  return (
    <Form
      {...formProps}
      onFinish={handleFinish}
      scrollToFirstError={true}
      layout="vertical"
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item name="name" label="Full Name" rules={rules.name}>
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="email" label="Email" rules={rules.email}>
            <Input placeholder="Type here" type="email" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item name="phone" label="Phone" rules={rules.phone}>
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="type" label="Type" rules={rules.type}>
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item name="role" label="Role" rules={rules.role}>
            <Input placeholder="Type here" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="status" label="Status" rules={rules.status}>
            <Select placeholder="Select status">
              <Option value="ACTIVE">Active</Option>
              <Option value="INACTIVE">Inactive</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
