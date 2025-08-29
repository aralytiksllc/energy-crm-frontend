import * as React from 'react';
import { Form, Row, Col, Input, InputNumber, DatePicker, Checkbox } from 'antd';

// Internal
import type { ContractFormProps } from './contract-form.types';
import { rules } from './contract-form.rules';
import { useStyles } from './contract-form.styles';
import { DayjsTransformer } from '@/helpers/dayjs-transformer';
import { RemoteSelect } from '@/components/remote-select';

export const ContractForm: React.FC<ContractFormProps> = (props) => {
  const { formProps } = props;
  const { styles } = useStyles();

  return (
    <Form {...formProps} scrollToFirstError layout="vertical">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="customerId"
            label="Customer"
            rules={rules.customerId}
          >
            <RemoteSelect
              className={styles.input}
              placeholder="Select Customer"
              optionLabel="companyName"
              optionValue="id"
              resource="customers"
              showSearch={true}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="contractNumber"
            label="Contract Number"
            rules={rules.contractNumber}
          >
            <Input
              placeholder="Type here"
              className={styles.input}
              autoCorrect="off"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="contractQuantity"
            label="Contract Quantity"
            rules={rules.contractQuantity}
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
            name="pricePerMwh"
            label="Price per MWh"
            rules={rules.pricePerMwh}
          >
            <InputNumber
              placeholder="0"
              className={styles.inputNumber}
              controls={false}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="effectiveDate"
            label="Effective Date"
            rules={rules.effectiveDate}
            getValueProps={DayjsTransformer.toValueProps}
            normalize={DayjsTransformer.toNormalizedDate}
          >
            <DatePicker className={styles.datePicker} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="supplyStartDate"
            label="Supply Start Date"
            rules={rules.supplyStartDate}
            getValueProps={DayjsTransformer.toValueProps}
            normalize={DayjsTransformer.toNormalizedDate}
          >
            <DatePicker className={styles.datePicker} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="maturityDate"
            label="Maturity Date"
            rules={rules.maturityDate}
            getValueProps={DayjsTransformer.toValueProps}
            normalize={DayjsTransformer.toNormalizedDate}
          >
            <DatePicker className={styles.datePicker} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="initialTermYears"
            label="Initial Term (Years)"
            rules={rules.initialTermYears}
          >
            <InputNumber
              placeholder="0"
              className={styles.inputNumber}
              controls={false}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="renewalTermYears"
            label="Renewal Term (Years)"
            rules={rules.renewalTermYears}
          >
            <InputNumber
              placeholder="0"
              className={styles.inputNumber}
              controls={false}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="forecastDeadlineDaysBeforeMonth"
            label="Forecast Deadline (Days before month)"
            rules={rules.forecastDeadlineDaysBeforeMonth}
          >
            <InputNumber
              placeholder="0"
              className={styles.inputNumber}
              controls={false}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="paymentTermsDays"
            label="Payment Terms (Days)"
            rules={rules.paymentTermsDays}
          >
            <InputNumber
              placeholder="0"
              className={styles.inputNumber}
              controls={false}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="securityDepositAmount"
            label="Security Deposit Amount"
            rules={rules.securityDepositAmount}
          >
            <InputNumber
              placeholder="0"
              className={styles.inputNumber}
              controls={false}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="terminationNoticeDays"
            label="Termination Notice (Days)"
            rules={rules.terminationNoticeDays}
          >
            <InputNumber
              placeholder="0"
              className={styles.inputNumber}
              controls={false}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="earlyTerminationFee"
            label="Early Termination Fee"
            rules={rules.earlyTerminationFee}
          >
            <Input
              placeholder="Type here"
              className={styles.input}
              autoCorrect="off"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="disputeResolutionMethod"
            label="Dispute Resolution Method"
          >
            <Input.TextArea
              placeholder="Type here"
              className={styles.textArea}
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}></Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="includesNetworkTariffs"
            valuePropName="checked"
            noStyle
          >
            <Checkbox>Network Tariffs</Checkbox>
          </Form.Item>
          <Form.Item name="includesVat" valuePropName="checked" noStyle>
            <Checkbox>VAT</Checkbox>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}></Col>
      </Row>
    </Form>
  );
};
