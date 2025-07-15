import React from 'react';
import {
  Upload,
  Button,
  Space,
  Typography,
  Card,
  Image,
  List,
  Progress,
  Spin,
  Popconfirm,
} from 'antd';
import {
  UploadOutlined,
  DeleteOutlined,
  EyeOutlined,
  DownloadOutlined,
  LoadingOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { useFileUploadStyles, cx } from './file-upload.styles';

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

  const handleUpload: UploadProps['customRequest'] = ({
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

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    onChange?.(fileList);
  };

  const handleRemove = (file: UploadFile) => {
    const newFiles = files.filter((f) => f.uid !== file.uid);
    onChange?.(newFiles);
    return true;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploading':
        return '#1890ff';
      case 'done':
        return '#52c41a';
      case 'error':
        return '#ff4d4f';
      default:
        return '#d9d9d9';
    }
  };

  const isUploading = (file: UploadFile) => file.status === 'uploading';

  return (
    <div className={styles.container}>
      <Upload
        fileList={files}
        customRequest={handleUpload}
        onChange={handleChange}
        onRemove={handleRemove}
        beforeUpload={beforeUpload}
        disabled={disabled}
        maxCount={maxCount}
        accept={accept}
        showUploadList={false}
        className={styles.upload}
      >
        <Button
          icon={
            files.some((f) => f.status === 'uploading') ? (
              <LoadingOutlined />
            ) : (
              <UploadOutlined />
            )
          }
          disabled={disabled || files.length >= maxCount}
          className={styles.uploadButton}
          loading={files.some((f) => f.status === 'uploading')}
        >
          {files.some((f) => f.status === 'uploading')
            ? 'Uploading...'
            : 'Upload Files'}
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
                <Card
                  size="small"
                  className={`${styles.fileCard} ${isUploading(file) ? styles.uploadingCard : ''}`}
                >
                  <Space
                    align="start"
                    className={cx(styles.fileContent, styles.fullWidth)}
                    direction="vertical"
                  >
                    <Space align="start" className={styles.fullWidth}>
                      {isUploading(file) ? (
                        <div className={styles.fileIcon}>
                          <Spin size="small" />
                        </div>
                      ) : isImage(file) && file.thumbUrl ? (
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
                        <div className={styles.fileIcon}>
                          {getFileIcon(file)}
                        </div>
                      )}

                      <div className={styles.fileInfo}>
                        <Text className={styles.fileName}>{file.name}</Text>
                        <Text type="secondary" className={styles.fileSize}>
                          {file.size
                            ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                            : 'Unknown size'}
                          {file.status === 'uploading' && ' - Uploading...'}
                          {file.status === 'error' && ' - Upload Failed'}
                          {file.status === 'done' && ' - Upload Complete'}
                        </Text>
                      </div>

                      <Space>
                        <Button
                          type="text"
                          size="small"
                          icon={<DownloadOutlined />}
                          disabled={disabled || isUploading(file)}
                          className={styles.actionButton}
                          title="Download"
                        />
                        <Popconfirm
                          title="Delete file"
                          description={`Are you sure you want to delete "${file.name}"?`}
                          icon={
                            <QuestionCircleOutlined
                              className={styles.popconfirmIcon}
                            />
                          }
                          onConfirm={() => handleRemove(file)}
                          okText="Yes, Delete"
                          cancelText="Cancel"
                          okType="danger"
                          disabled={disabled || isUploading(file)}
                        >
                          <Button
                            type="text"
                            size="small"
                            icon={<DeleteOutlined />}
                            disabled={disabled || isUploading(file)}
                            danger
                            className={styles.actionButton}
                            title="Remove"
                          />
                        </Popconfirm>
                      </Space>
                    </Space>
                    {isUploading(file) && (
                      <Progress
                        percent={file.percent || 0}
                        size="small"
                        status="active"
                        strokeColor={getStatusColor(file.status || '')}
                        showInfo={false}
                        className={styles.fullWidth}
                      />
                    )}
                    {file.status === 'error' && (
                      <Text type="danger" className={styles.errorMessage}>
                        Upload failed. Please try again.
                      </Text>
                    )}
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
