import * as React from 'react';
import { Form } from 'antd';
import { ProductList } from './product-list';
import type { FormInstance } from 'antd/es/form';
import type { Product } from './types';

export interface ProductFormProps {
  // form: FormInstance;
  // products?: Product[];
}

export const ProductForm: React.FC<ProductFormProps> = (props) => {
  // const { form, products = [] } = props;

  const form = Form.useFormInstance();

  return (
    <Form.List name="products">
      {(fields, operations) => (
        <ProductList
          form={form}
          fields={fields}
          operations={operations}
          products={[]}
        />
      )}
    </Form.List>
  );
};
