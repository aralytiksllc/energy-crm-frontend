// External
import * as React from 'react';
import { Form, Row, Col, Input, InputNumber, DatePicker, Select } from 'antd';

// Internal
import { RemoteSelect } from '@/components/remote-select';
import { useStyles } from './metering-point-form.styles';
import type { MeteringPointFormProps } from './metering-point-form.types';
import { DayjsTransformer } from '@/helpers/dayjs-transformer';

export type SelectOption = { label: string; value: string | number };

// Konstanta të gatshme
export const statusOptions: SelectOption[] = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Inactive', value: 'INACTIVE' },
  { label: 'Maintenance', value: 'MAINTENANCE' },
  { label: 'Disconnected', value: 'DISCONNECTED' },
];

export const unitOptions: SelectOption[] = [
  { label: 'kW', value: 'kW' },
  { label: 'kVA', value: 'kVA' },
  { label: 'MW', value: 'MW' },
];

export const voltageOptions: SelectOption[] = [
  { label: 'Low Voltage (0.4 kV)', value: '0.4kV' },
  { label: 'Medium Voltage (10 kV)', value: '10kV' },
  { label: 'Medium Voltage (20 kV)', value: '20kV' },
  { label: 'High Voltage (35 kV)', value: '35kV' },
  { label: 'High Voltage (110 kV)', value: '110kV' },
];

export const meterTypeOptions: SelectOption[] = [
  { label: 'Smart Meter (AMI)', value: 'SMART' },
  { label: 'AMR (Auto Read)', value: 'AMR' },
  { label: 'Digital', value: 'DIGITAL' },
  { label: 'Analog', value: 'ANALOG' },
  { label: 'CT Connected', value: 'CT' },
  { label: 'Direct Connected', value: 'DIRECT' },
];

export const MeteringPointForm: React.FC<MeteringPointFormProps> = (props) => {
  const { formProps } = props;

  const { styles } = useStyles();

  return (
    <Form {...formProps} layout="vertical" scrollToFirstError>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item name="branchId" label="Branch">
            <RemoteSelect
              className={styles.input}
              placeholder="Select branch"
              optionLabel="branchName"
              optionValue="id"
              resource="branches"
              showSearch={true}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="meteringPointStatus" label="Metering Point Status">
            <Select
              allowClear
              placeholder="Select status"
              options={statusOptions}
              optionFilterProp="label"
              className={styles.input}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item name="locationAddress" label="Location Address">
            <Input
              placeholder="Type here"
              className={styles.input}
              autoCorrect="off"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="registeredAddress" label="Registered Address">
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
          <Form.Item name="cityOrLocality" label="City/Locality">
            <Input
              placeholder="Type here"
              className={styles.input}
              autoCorrect="off"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="country" label="Country">
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
          <Form.Item name="tariffGroup" label="Tariff Group">
            <Input
              placeholder="Type here"
              className={styles.input}
              autoCorrect="off"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="utilityProvider" label="Utility Provider">
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
            name="contractedCapacityValue"
            label="Contracted Capacity Value"
          >
            <InputNumber
              placeholder="0"
              className={styles.inputNumber}
              controls={false}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="contractedCapacityUnit"
            label="Contracted Capacity Unit"
          >
            <Select
              allowClear
              placeholder="Select unit"
              options={unitOptions}
              optionFilterProp="label"
              className={styles.input}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item name="voltageLevel" label="Voltage Level">
            <Select
              allowClear
              placeholder="Select voltage level"
              options={voltageOptions}
              optionFilterProp="label"
              className={styles.input}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="meterType" label="Meter Type">
            <Select
              allowClear
              placeholder="Select meter type"
              options={meterTypeOptions}
              optionFilterProp="label"
              className={styles.input}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item name="agreedMaxDemandKw" label="Agreed Max Demand (kW)">
            <InputNumber
              placeholder="0"
              className={styles.inputNumber}
              controls={false}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}></Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="installationDate"
            label="Installation Date"
            getValueProps={DayjsTransformer.toValueProps}
            normalize={DayjsTransformer.toNormalizedDate}
          >
            <DatePicker className={styles.input} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="contractEndDate"
            label="Contract End Date"
            getValueProps={DayjsTransformer.toValueProps}
            normalize={DayjsTransformer.toNormalizedDate}
          >
            <DatePicker className={styles.input} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 9: Technical Contacts */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item name="technicalContactName" label="Technical Contact Name">
            <Input
              placeholder="Type here"
              className={styles.input}
              autoCorrect="off"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="technicalContactTitle"
            label="Technical Contact Title"
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
            name="technicalContactPhone"
            label="Technical Contact Phone"
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
            name="technicalContactEmail"
            label="Technical Contact Email"
          >
            <Input
              type="email"
              placeholder="name@example.com"
              className={styles.input}
              autoCorrect="off"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item name="deliveryAddress" label="Delivery Address">
            <Input.TextArea
              placeholder="Type here"
              className={styles.input}
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="connectionSpecs" label="Connection Specs">
            <Input.TextArea
              placeholder="Type here"
              className={styles.input}
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item name="gpsCoordinates" label="GPS Coordinates">
            <Input.TextArea
              placeholder="Type here"
              className={styles.input}
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="operationalStatus" label="Operational Status">
            <Input.TextArea
              placeholder="Type here"
              className={styles.input}
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item name="notes" label="Notes">
            <Input.TextArea
              placeholder="Type here"
              className={styles.input}
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          {/* vend i lirë */}
        </Col>
      </Row>
    </Form>
  );
};
