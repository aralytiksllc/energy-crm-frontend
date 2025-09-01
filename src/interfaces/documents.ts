// External

// Internal
import { ICustomer } from './customers';

export interface IDocument {
  id: number;
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  description: string | null;
  documentType: string | null;

  customerId: number;
  customer?: ICustomer;
}
