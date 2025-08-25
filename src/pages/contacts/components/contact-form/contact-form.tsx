// External
import * as React from 'react';
import type { FormProps } from 'antd'; // v5
import { Form, Row, Col, Input, InputNumber } from 'antd';

// Internal
import type { IContact } from '@/interfaces/contacts';
import { contactFormRules } from './contact-form.rules';
import { useStyles } from './contact-form.styles';

export type ContactFormProps = {
  formProps: FormProps<IContact>;
};

export const ContactForm: React.FC<ContactFormProps> = (props) => {
  const { formProps } = props;

  const { styles } = useStyles();

  return (
    <Form {...formProps} layout="vertical" scrollToFirstError>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            name="contactName"
            label="Contact Name"
            rules={contactFormRules.contactName}
          >
            <Input
              placeholder="Type here"
              className={styles.input}
              autoCorrect="off"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            name="peakLoadKw"
            label="Peak Load Kw"
            rules={contactFormRules.peakLoadKw}
          >
            <InputNumber
              placeholder="Type here"
              className={styles.inputNumber}
              controls={false}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            name="weatherDataLinkage"
            label="Weather Data Linkage"
            rules={contactFormRules.weatherDataLinkage}
          >
            <Input
              placeholder="Type here"
              className={styles.input}
              autoCorrect="off"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} lg={12}>
          {/* Placehold */}
        </Col>
      </Row>
    </Form>
  );
};
