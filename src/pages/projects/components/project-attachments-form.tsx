import React, { useState } from 'react';
import { FormProps, Form, Typography, Alert } from 'antd';
import type { UploadFile } from 'antd';
import { FileUpload } from '@components/file-upload';
import { useProjectAttachmentsFormStyles } from './project-attachments-form.styles';

const { Title, Text } = Typography;

export interface ProjectAttachmentsFormProps {
  formProps: FormProps;
}

export const ProjectAttachmentsForm: React.FC<ProjectAttachmentsFormProps> = ({
  formProps,
}) => {
  const [uploadingCount, setUploadingCount] = useState(0);
  const { styles } = useProjectAttachmentsFormStyles();

  const handleFilesChange = (newFiles: UploadFile[]) => {
    formProps.form?.setFieldValue('attachments', newFiles);

    const uploading = newFiles.filter(
      (file) => file.status === 'uploading',
    ).length;
    setUploadingCount(uploading);
  };

  const files = formProps.form?.getFieldValue('attachments') || [];

  return (
    <div className={styles.container}>
      <Title level={4} className={styles.title}>
        Project Attachments
      </Title>
      <Text type="secondary" className={styles.secondaryText}>
        Upload files related to this project such as documents, images, or other
        resources.
      </Text>
      {uploadingCount > 0 && (
        <Alert
          message={`Uploading ${uploadingCount} file${
            uploadingCount > 1 ? 's' : ''
          }...`}
          description="Please wait while your files are being uploaded. Do not close this window."
          type="info"
          showIcon
          className={styles.alert}
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
