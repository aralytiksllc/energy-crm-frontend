// External
import * as React from 'react';
import { Form, Row, Col, Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useParams } from 'react-router';

// Internal
import { IMeteringPoint } from '@/interfaces/metering-points';
import type { IConsumptionFile } from '@/interfaces/consumptions';
import { useLatest } from '@/hooks/use-latest';
import { rules } from './consumption-form.rules';
import type { ConsumptionFormProps } from './consumption-form.types';
import { RemoteSelect } from '@/components/remote-select';
import { useStyles } from './document-form.styles';

export const ConsumptionForm: React.FC<ConsumptionFormProps> = (props) => {
  const { formProps } = props;

  const { styles } = useStyles();

  const { customerId } = useParams();
  const onFinishRef = useLatest(formProps.onFinish);
  const customerIdRef = useLatest(customerId);

  const handleFinish = React.useCallback(
    (values: IConsumptionFile & { file?: any }) => {
      return onFinishRef.current?.({ ...values });
    },
    [onFinishRef, customerIdRef],
  );

  return (
    <Form
      {...formProps}
      onFinish={handleFinish}
      scrollToFirstError
      layout="vertical"
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="meteringPointId"
            label="Metering point"
            rules={rules.meteringPointId}
          >
            <RemoteSelect
              className={styles.input}
              placeholder="Select metering point"
              optionLabel={(data: IMeteringPoint) =>
                `${data.id} - ${data.locationAddress}`
              }
              optionValue={(data: IMeteringPoint) => `${data.id}`}
              resource="metering-points"
              showSearch={true}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="contractId"
            label="Contract"
            rules={rules.contractId}
          >
            <RemoteSelect
              className={styles.input}
              placeholder="Select contract"
              optionLabel="contractNumber"
              optionValue="id"
              resource="contracts"
              showSearch={true}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Form.Item
            name="description"
            label="Description"
            rules={rules.description}
          >
            <Input.TextArea placeholder="Add a short description..." rows={4} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Form.Item
            name="file"
            label="Upload File"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={rules.file}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
