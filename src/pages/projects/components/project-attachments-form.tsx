import React, { useState, useEffect } from 'react';
import { FormProps, Form, Typography, Alert } from 'antd';
import type { UploadFile } from 'antd';
import { FileUpload } from '@components/file-upload';

const { Title, Text } = Typography;

export interface ProjectAttachmentsFormProps {
  formProps: FormProps;
}

export const ProjectAttachmentsForm: React.FC<ProjectAttachmentsFormProps> = ({
  formProps,
}) => {
  const [uploadingCount, setUploadingCount] = useState(0);
  const [files, setFiles] = useState<UploadFile[]>([]);

  const handleFilesChange = (newFiles: UploadFile[]) => {
    setFiles(newFiles);
    formProps.form?.setFieldValue('attachments', newFiles);

    const uploading = newFiles.filter(
      (file) => file.status === 'uploading',
    ).length;
    setUploadingCount(uploading);
  };

  useEffect(() => {
    const formFiles = formProps.form?.getFieldValue('attachments');
    if (formFiles && formFiles.length > 0 && files.length === 0) {
      setFiles(formFiles);
    }
  }, [formProps.form, files.length]);

  return (
    <div style={{ padding: '16px 0' }}>
      <Title level={4} style={{ marginBottom: '16px' }}>
        Project Attachments
      </Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: '16px' }}>
        Upload files related to this project such as documents, images, or other
        resources.
      </Text>
      {uploadingCount > 0 && (
        <Alert
          message={`Uploading ${uploadingCount} file${uploadingCount > 1 ? 's' : ''}...`}
          description="Please wait while your files are being uploaded. Do not close this window."
          type="info"
          showIcon
          style={{ marginBottom: '16px' }}
        />
      )}

      <Form.Item
        name="attachments"
        label="Files"
        rules={[
          {
            validator: (_, value) => {
              if (!value || value.length === 0) {
                return Promise.resolve();
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <FileUpload
          files={files}
          onChange={handleFilesChange}
          maxCount={20}
          maxSize={50}
          accept="*"
        />
      </Form.Item>
    </div>
  );
};
