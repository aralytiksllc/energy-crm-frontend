import React from 'react';
import { Upload, Typography } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { COLORS, BORDER_RADIUS, FONT_SIZE } from '../../styles/theme';

const { Text } = Typography;
const { Dragger } = Upload;

export interface DragUploadProps extends UploadProps {
  uploadText?: string;
  uploadHint?: string;
  iconColor?: string;
  borderColor?: string;
  backgroundColor?: string;
}

export const DragUpload: React.FC<DragUploadProps> = ({
  uploadText = 'Click or drag file to this area to upload',
  uploadHint = 'Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files',
  iconColor = COLORS.primary,
  borderColor = COLORS.border.dashed,
  backgroundColor = COLORS.background.light,
  ...uploadProps
}) => {
  return (
    <Dragger 
      {...uploadProps} 
      style={{ 
        border: `2px dashed ${borderColor}`,
        borderRadius: BORDER_RADIUS.lg,
        backgroundColor: backgroundColor,
        padding: '40px 20px'
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined style={{ fontSize: 48, color: iconColor }} />
      </p>
      <p className="ant-upload-text" style={{ fontSize: FONT_SIZE.title, margin: '8px 0' }}>
        {uploadText}
      </p>
      <p className="ant-upload-hint" style={{ color: COLORS.text.secondary, fontSize: FONT_SIZE.xl }}>
        {uploadHint}
      </p>
    </Dragger>
  );
};
