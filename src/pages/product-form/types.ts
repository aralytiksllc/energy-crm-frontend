import type {
  FormInstance,
  FormListFieldData,
  FormListOperation,
} from 'antd/es/form';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ProductItemProps {
  form: FormInstance;
  field: FormListFieldData;
  options: Product[];
  index: number;
  operations: FormListOperation;
}
