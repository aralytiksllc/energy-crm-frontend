// ./document-form.rules.ts
import type { Rule } from 'antd/es/form';
import type { UploadFile } from 'antd/es/upload';

const MAX_FILE_MB = 20;
const ALLOWED_TAGS = ['INVOICE', 'CONTRACT', 'REPORT', 'OTHER'] as const;

const getSingle = (fileList?: UploadFile[]): UploadFile | undefined =>
  Array.isArray(fileList) && fileList.length > 0 ? fileList[0] : undefined;

export const rules: {
  name: Rule[];
  documentType: Rule[];
  description: Rule[];
  file: Rule[];
} = {
  name: [
    { required: true, message: 'Please enter the file name.' },
    { whitespace: true, message: 'File name cannot be empty.' },
    { max: 255, message: 'Max 255 characters.' },
  ],

  documentType: [
    {
      validator: async (_rule, value: string | undefined) => {
        if (value == null || value === '') return; // optional
        if (!ALLOWED_TAGS.includes(value as any)) {
          return Promise.reject(new Error('Invalid tag/type.'));
        }
      },
    },
  ],

  description: [{ max: 2000, message: 'Max 2000 characters.' }],

  file: [
    {
      required: true,
      message: 'Please select a file.',
    },
    {
      validator: async (_rule, fileList?: UploadFile[]) => {
        if (!Array.isArray(fileList) || fileList.length === 0) {
          return Promise.reject(new Error('Please select a file.'));
        }
        if (fileList.length > 1) {
          return Promise.reject(new Error('Only one file is allowed.'));
        }

        const file = getSingle(fileList);

        if (file?.size && file.size / (1024 * 1024) > MAX_FILE_MB) {
          return Promise.reject(
            new Error(`File must be smaller than ${MAX_FILE_MB}MB.`),
          );
        }

        return Promise.resolve();
      },
    },
  ],
};
