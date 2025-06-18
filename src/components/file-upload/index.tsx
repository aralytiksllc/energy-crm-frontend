import React from 'react';
import { Upload, Button, Space, Typography, Card, Image, List } from 'antd';
import {
  UploadOutlined,
  DeleteOutlined,
  EyeOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { useFileUploadStyles } from './file-upload.styles';

const { Text } = Typography;

export interface FileUploadProps {
  files?: UploadFile[];
  onChange?: (files: UploadFile[]) => void;
  disabled?: boolean;
  maxCount?: number;
  accept?: string;
  maxSize?: number; // in MB
}

export const FileUpload: React.FC<FileUploadProps> = ({
  files = [],
  onChange,
  disabled = false,
  maxCount = 10,
  accept = 'image/*,.pdf,.doc,.docx,.xls,.xlsx',
  maxSize = 10,
}) => {
  const { styles } = useFileUploadStyles();

  const handleUpload: UploadProps['customRequest'] = ({ file, onSuccess }) => {
    // Mock upload - in real app, this would upload to server
    setTimeout(() => {
      onSuccess?.(file);
    }, 1000);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    onChange?.(fileList);
  };

  const handleRemove = (file: UploadFile) => {
    const newFiles = files.filter((f) => f.uid !== file.uid);
    onChange?.(newFiles);
  };

  const beforeUpload = (file: File) => {
    const isValidSize = file.size / 1024 / 1024 < maxSize;
    if (!isValidSize) {
      console.error(`File must be smaller than ${maxSize}MB!`);
    }
    return isValidSize;
  };

  const getFileIcon = (file: UploadFile) => {
    const fileName = file.name?.toLowerCase() || '';
    if (fileName.includes('.pdf')) return '📄';
    if (fileName.includes('.doc') || fileName.includes('.docx')) return '📝';
    if (fileName.includes('.xls') || fileName.includes('.xlsx')) return '📊';
    if (
      fileName.includes('.jpg') ||
      fileName.includes('.jpeg') ||
      fileName.includes('.png')
    )
      return '🖼️';
    return '📎';
  };

  const isImage = (file: UploadFile) => {
    const fileName = file.name?.toLowerCase() || '';
    return (
      fileName.includes('.jpg') ||
      fileName.includes('.jpeg') ||
      fileName.includes('.png') ||
      fileName.includes('.gif')
    );
  };

  return (
    <div className={styles.container}>
      <Upload
        fileList={files}
        customRequest={handleUpload}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        disabled={disabled}
        maxCount={maxCount}
        accept={accept}
        showUploadList={false}
        className={styles.upload}
      >
        <Button
          icon={<UploadOutlined />}
          disabled={disabled || files.length >= maxCount}
          className={styles.uploadButton}
        >
          Upload Files
        </Button>
      </Upload>

      {files.length > 0 && (
        <div className={styles.fileList}>
          <Text strong className={styles.fileListTitle}>
            Attachments ({files.length})
          </Text>
          <List
            dataSource={files}
            renderItem={(file) => (
              <List.Item className={styles.fileItem}>
                <Card size="small" className={styles.fileCard}>
                  <Space align="start" className={styles.fileContent}>
                    {isImage(file) && file.thumbUrl ? (
                      <Image
                        src={file.thumbUrl}
                        alt={file.name}
                        width={40}
                        height={40}
                        className={styles.filePreview}
                        preview={{
                          mask: <EyeOutlined />,
                        }}
                      />
                    ) : (
                      <div className={styles.fileIcon}>{getFileIcon(file)}</div>
                    )}

                    <div className={styles.fileInfo}>
                      <Text className={styles.fileName}>{file.name}</Text>
                      <Text type="secondary" className={styles.fileSize}>
                        {file.size
                          ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                          : 'Unknown size'}
                      </Text>
                    </div>

                    <Space>
                      <Button
                        type="text"
                        size="small"
                        icon={<DownloadOutlined />}
                        disabled={disabled}
                        className={styles.actionButton}
                        title="Download"
                      />
                      <Button
                        type="text"
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemove(file)}
                        disabled={disabled}
                        danger
                        className={styles.actionButton}
                        title="Remove"
                      />
                    </Space>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};
