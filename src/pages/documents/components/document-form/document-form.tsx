// External
import * as React from "react";
import { Form, Row, Col, Input, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams } from "react-router";

// Internal
import type { IDocument } from "@/interfaces/documents";
import { useLatest } from "@/hooks/use-latest";
import { rules } from "./document-form.rules";
import type { DocumentFormProps } from "./document-form.types";

const { Option } = Select;

export const DocumentForm: React.FC<DocumentFormProps> = (props) => {
  const { formProps } = props;

  const { customerId } = useParams();
  const onFinishRef = useLatest(formProps.onFinish);
  const customerIdRef = useLatest(customerId);

  const handleFinish = React.useCallback(
    (values: IDocument & { file?: any }) => {
      const customerId = Number(customerIdRef.current);
      return onFinishRef.current?.({ ...values, customerId });
    },
    [onFinishRef, customerIdRef]
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
          <Form.Item name="name" label="File Name" rules={rules.name}>
            <Input placeholder="Type document name" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="documentType"
            label="Tag / Type"
            rules={rules.documentType}
          >
            <Select placeholder="Select document type">
              <Option value="INVOICE">Invoice</Option>
              <Option value="CONTRACT">Contract</Option>
              <Option value="REPORT">Report</Option>
              <Option value="OTHER">Other</Option>
            </Select>
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
            <Input.TextArea
              placeholder="Add a short description..."
              rows={4}
            />
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
