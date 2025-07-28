// External dependencies
import type { UploadFile, UploadProps } from 'antd';

export interface FileUploadProps
  extends Omit<UploadProps, 'fileList' | 'onChange'> {
  files?: UploadFile[];
  onChange?: (files: UploadFile[]) => void;
  disabled?: boolean;
  maxCount?: number;
  accept?: string;
  maxSize?: number;
  uploadText?: string;
  customRequest?: UploadProps['customRequest'];
}
