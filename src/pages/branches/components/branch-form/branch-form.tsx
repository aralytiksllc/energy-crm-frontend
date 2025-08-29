// External
import * as React from 'react';
import { Form, Row, Col, Input, InputNumber } from 'antd';
import { useParams } from 'react-router';

// Internal
import type { IBranch } from '@/interfaces/branches';
import { useLatest } from '@/hooks/use-latest';
import { rules } from './branch-form.rules';
import { useStyles } from './branch-form.styles';
import type { BranchFormProps } from './branch-form.types';

export const BranchForm: React.FC<BranchFormProps> = (props) => {
  const { formProps } = props;

  const { styles } = useStyles();

  const { customerId } = useParams();

  const onFinishRef = useLatest(formProps.onFinish);

  const customerIdRef = useLatest(customerId);

  const handleFinish = React.useCallback(
    (values: IBranch) => {
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
          <Form.Item
            name="branchName"
            label="Branch Name"
            rules={rules.branchName}
          >
            <Input
              placeholder="Type here"
              className={styles.input}
              autoCorrect="off"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="peakLoadKw"
            label="Peak Load Kw"
            rules={rules.peakLoadKw}
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
        <Col xs={24} sm={12}>
          <Form.Item
            name="weatherDataLinkage"
            label="Weather Data Linkage"
            rules={rules.weatherDataLinkage}
          >
            <Input
              placeholder="Type here"
              className={styles.input}
              autoCorrect="off"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          {/* Placehold */}
        </Col>
      </Row>
    </Form>
  );
};
