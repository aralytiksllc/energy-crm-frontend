import type { Rule } from 'antd/es/form';
import type { UploadFile } from 'antd/es/upload';

const MAX_FILE_MB = 20;
const ALLOWED_EXTENSIONS = ['.csv', '.xlsx', '.xls'] as const;

const getSingle = (fileList?: UploadFile[]): UploadFile | undefined =>
  Array.isArray(fileList) && fileList.length > 0 ? fileList[0] : undefined;

const hasAllowedExtension = (name?: string) => {
  if (!name) return false;
  const dot = name.lastIndexOf('.');
  const ext = dot >= 0 ? name.slice(dot).toLowerCase() : '';
  return ALLOWED_EXTENSIONS.includes(ext as any);
};

export const rules: {
  meteringPointId: Rule[];
  contractId: Rule[];
  description: Rule[];
  file: Rule[];
} = {
  meteringPointId: [
    { required: true, message: 'Please select a metering point.' },
  ],

  // optional; nëse vjen vlerë, lejo vetëm numra (id)
  contractId: [{ required: true, message: 'Please select a contract.' }],

  description: [{ max: 2000, message: 'Max 2000 characters.' }],

  file: [
    { required: true, message: 'Please select a file.' },
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

        const name =
          (file?.name as string | undefined) ??
          (file?.originFileObj as any)?.name;

        if (!hasAllowedExtension(name)) {
          return Promise.reject(
            new Error(
              `Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`,
            ),
          );
        }

        return Promise.resolve();
      },
    },
  ],
};
