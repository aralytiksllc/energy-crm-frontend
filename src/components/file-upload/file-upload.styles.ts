import { createStyles } from 'antd-style';

export const useFileUploadStyles = createStyles(({ token, css }) => ({
  container: css`
    width: 100%;
  `,

  upload: css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  uploadButton: css`
    width: 100%;
    height: 100px;
    border-style: dashed;
    border-color: ${token.colorBorder};
    background: ${token.colorFillAlter};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &:hover {
      border-color: ${token.colorPrimary};
      color: ${token.colorPrimary};
    }
  `,

  fileList: css`
    margin-top: 16px;
  `,

  fileListTitle: css`
    font-size: 14px;
    margin-bottom: 12px;
    display: block;
  `,

  fileItem: css`
    padding: 0;
    margin-bottom: 8px;
    border: none;
  `,

  fileCard: css`
    width: 100%;

    .ant-card-body {
      padding: 12px;
    }
  `,

  uploadingCard: css`
    border: 1px solid ${token.colorPrimary};
    background: ${token.colorPrimaryBg};

    .ant-card-body {
      padding: 12px;
    }
  `,

  fileContent: css`
    width: 100%;
    justify-content: space-between;
  `,

  filePreview: css`
    border-radius: 4px;
    object-fit: cover;
  `,

  fileIcon: css`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${token.colorFillSecondary};
    border-radius: 4px;
    font-size: 20px;
  `,

  fileInfo: css`
    flex: 1;
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,

  fileName: css`
    font-size: 14px;
    font-weight: 500;
    line-height: 1.2;
  `,

  fileSize: css`
    font-size: 12px;
  `,

  actionButton: css`
    padding: 4px;

    &:hover {
      background: ${token.colorFillSecondary};
    }
  `,
}));
