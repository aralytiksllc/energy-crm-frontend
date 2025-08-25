// External
import * as React from 'react';
import type { FormProps } from 'antd'; // v5
import { Form, Row, Col, Input, InputNumber } from 'antd';

// Internal
import type { IBranch } from '@/interfaces/branches';
import { branchFormRules } from './branch-form.rules';
import { useStyles } from './branch-form.styles';

export type BranchFormProps = {
  formProps: FormProps<IBranch>;
};

export const BranchForm: React.FC<BranchFormProps> = (props) => {
  const { formProps } = props;

  const { styles } = useStyles();

  return (
    <Form {...formProps} layout="vertical" scrollToFirstError>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            name="branchName"
            label="Branch Name"
            rules={branchFormRules.branchName}
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
            rules={branchFormRules.peakLoadKw}
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
            rules={branchFormRules.weatherDataLinkage}
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
