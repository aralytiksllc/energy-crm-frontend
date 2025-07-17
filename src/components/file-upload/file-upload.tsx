// External dependencies
import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

// Internal dependencies
import type { FileUploadProps } from './file-upload.types';

export const FileUpload: React.FC<FileUploadProps> = ({
  files = [],
  onChange,
  disabled = false,
  maxCount = 10,
  accept = 'image/*,.pdf,.doc,.docx,.xls,.xlsx',
  maxSize = 10,
  uploadText = 'Upload Files',
  customRequest,
  ...restProps
}) => {
  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    onChange?.(fileList);
  };

  const beforeUpload = (file: File) => {
    const isValidSize = file.size / 1024 / 1024 < maxSize;
    if (!isValidSize) {
      console.error(`File must be smaller than ${maxSize}MB!`);
    }
    return isValidSize;
  };

  const defaultCustomRequest: UploadProps['customRequest'] = ({
    file,
    onSuccess,
    onProgress,
  }) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      onProgress?.({ percent: progress });

      if (progress >= 100) {
        clearInterval(interval);
        onSuccess?.(file);
      }
    }, 200);
  };

  return (
    <Upload
      fileList={files}
      customRequest={customRequest || defaultCustomRequest}
      onChange={handleChange}
      beforeUpload={beforeUpload}
      disabled={disabled}
      maxCount={maxCount}
      accept={accept}
      {...restProps}
    >
      <Button icon={<UploadOutlined />} disabled={disabled}>
        {uploadText}
      </Button>
    </Upload>
  );
};
