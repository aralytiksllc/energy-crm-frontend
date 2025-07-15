import * as React from 'react';
import { Divider, Row, Col } from 'antd';
import { ProductItem } from './product-item';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useStyles } from './styles';
import type {
  FormInstance,
  FormListFieldData,
  FormListOperation,
} from 'antd/es/form';
import type { Product } from './types';

export interface ProductListProps {
  form: FormInstance;
  fields: FormListFieldData[];
  operations: FormListOperation;
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = (props) => {
  const { form, fields, operations, products } = props;

  const { styles } = useStyles();

  const handleAdd = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      operations.add({
        productId: undefined,
        quantity: 1,
        discount: 0,
      });
    },
    [operations],
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Row gutter={8} align="middle">
          <Col span={1} className={styles.headerColumn}>
            #
          </Col>
          <Col span={10} className={styles.headerColumn}>
            Product
          </Col>
          <Col span={3} className={styles.headerColumn}>
            Unit Price
          </Col>
          <Col span={3} className={styles.headerColumn}>
            Quantity
          </Col>
          <Col span={3} className={styles.headerColumn}>
            Discount
          </Col>
          <Col span={3} className={styles.headerColumn}>
            Total
          </Col>
          <Col span={1} />
        </Row>
      </div>

      {fields.map((field, index) => (
        <ProductItem
          key={field.key}
          form={form}
          field={field}
          index={index}
          options={products}
          operations={operations}
        />
      ))}

      <Divider className={styles.divider} />

      <Button type="dashed" onClick={handleAdd} className={styles.addButton}>
        <PlusOutlined /> Add Product
      </Button>
    </div>
  );
};
