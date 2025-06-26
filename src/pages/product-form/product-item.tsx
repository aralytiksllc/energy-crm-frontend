import * as React from 'react';
import Form from 'antd/es/form';
import InputNumber from 'antd/es/input-number';
import Select from 'antd/es/select';
import Button from 'antd/es/button';
import { Row, Col } from 'antd/es/grid';
import { DeleteOutlined } from '@ant-design/icons';
import { useStyles } from './styles';
import { productRules } from './validation';
import type { Product, ProductItemProps } from './types';

const productFieldNames = { label: 'name', value: 'id' };

export const ProductItem: React.FC<ProductItemProps> = (props) => {
  const { form, field, operations, options, index } = props;

  const { styles } = useStyles();

  const product = Form.useWatch(['products', field.name], form);

  const quantity = product?.quantity || 0;

  const discount = product?.discount || 0;

  const price = product?.price || 0;

  const total = price * quantity - (price * quantity * discount) / 100;

  const handleSelect = React.useCallback(
    (_: number, option: Product) => {
      const priceKey = ['products', field.name, 'price'];
      const priceValue = option.price || 0;
      form.setFieldValue(priceKey, priceValue);
    },
    [field.name, form],
  );

  const handleRemove = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      operations.remove(field.name);
    },
    [field.name, operations],
  );

  return (
    <Row className={styles.row} align="middle" gutter={8}>
      <Col span={1}>
        <Form.Item className={styles.formItem}>
          <InputNumber
            className={styles.inputNumber}
            value={index + 1}
            readOnly={true}
          />
        </Form.Item>
      </Col>

      <Col span={10}>
        <Form.Item
          className={styles.formItem}
          name={[field.name, 'id']}
          rules={productRules.id}
        >
          <Select
            fieldNames={productFieldNames}
            placeholder="Select product"
            onSelect={handleSelect}
            options={options}
          />
        </Form.Item>
      </Col>

      <Col span={3}>
        <Form.Item
          className={styles.formItem}
          name={[field.name, 'price']}
          rules={productRules.price}
        >
          <InputNumber
            className={styles.inputNumber}
            readOnly={true}
            addonBefore="€"
          />
        </Form.Item>
      </Col>

      <Col span={3}>
        <Form.Item
          className={styles.formItem}
          name={[field.name, 'quantity']}
          rules={productRules.quantity}
        >
          <InputNumber
            className={styles.inputNumber}
            readOnly={false}
            min={1}
          />
        </Form.Item>
      </Col>

      <Col span={3}>
        <Form.Item
          className={styles.formItem}
          name={[field.name, 'discount']}
          rules={productRules.discount}
        >
          <InputNumber
            className={styles.inputNumber}
            readOnly={false}
            addonAfter="%"
            max={100}
            min={0}
          />
        </Form.Item>
      </Col>

      <Col span={3}>
        <Form.Item className={styles.formItem}>
          <InputNumber
            className={styles.inputNumber}
            value={isNaN(total) ? 0 : total}
            readOnly={true}
            addonBefore="€"
          />
        </Form.Item>
      </Col>

      <Col span={1}>
        <Button
          icon={<DeleteOutlined />}
          onClick={handleRemove}
          danger={true}
          size="small"
        />
      </Col>
    </Row>
  );
};
