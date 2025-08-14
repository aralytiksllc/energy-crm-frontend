import React from 'react';
import { Space } from 'antd';
import { DragUpload } from '../../../../components/drag-upload';
import { DocumentsList } from './documents-list';
import type { UploadProps } from 'antd';

export const DocumentsTab: React.FC = () => {
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        console.log(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <DragUpload {...uploadProps} />
      <DocumentsList />
    </Space>
  );
};
