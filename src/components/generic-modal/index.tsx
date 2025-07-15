import React, { ReactNode } from 'react';
import { Modal, Button, Spin, Form, Segmented, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useGenericModalStyles } from './generic-modal.styles';

export interface GenericModalTab {
  label: ReactNode;
  value: string;
  icon?: ReactNode;
}

interface GenericModalProps<T = Record<string, unknown>> {
  // Modal configuration
  title: string;
  width?: number;
  open: boolean;
  onCancel: () => void;
  destroyOnClose?: boolean;

  // Loading state
  loading?: boolean;

  // Button configuration
  buttonText?: string;
  buttonIcon?: ReactNode;
  buttonType?: 'primary' | 'default' | 'text';
  buttonSize?: 'small' | 'middle' | 'large';
  buttonStyle?: React.CSSProperties;
  buttonDisabled?: boolean;
  onButtonClick?: () => void;
  showButton?: boolean;

  // Tabs configuration
  tabs?: GenericModalTab[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  showTabs?: boolean;

  // Footer configuration
  showFooter?: boolean;
  footerButtons?: ReactNode[];

  // Content
  children: ReactNode;

  // Form integration
  form?: any;
  onFinish: (values: T) => void;
  formLayout?: 'horizontal' | 'vertical' | 'inline';

  // Additional classes/styles
  className?: string;
  bodyClassName?: string;
}

export const GenericModal: React.FC<GenericModalProps> = ({
  title,
  width = 600,
  open,
  onCancel,
  destroyOnClose = true,
  loading = false,
  buttonText = 'Create',
  buttonIcon = <PlusOutlined />,
  buttonType = 'primary',
  buttonSize = 'large',
  buttonStyle,
  buttonDisabled = false,
  onButtonClick,
  showButton = true,
  tabs,
  activeTab,
  onTabChange,
  showTabs = false,
  showFooter = true,
  footerButtons,
  children,
  form,
  onFinish,
  formLayout = 'vertical',
  className,
  bodyClassName,
}) => {
  const { styles } = useGenericModalStyles();

  const defaultFooter = showFooter
    ? [
        <Button key="cancel" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form?.submit?.()}
        >
          {buttonText}
        </Button>,
      ]
    : null;

  const renderContent = () => {
    const content =
      showTabs && tabs ? (
        <div className={styles.container}>
          <div className={styles.tabsContainer}>
            <Segmented
              options={tabs.map((tab) => ({
                label: tab.label,
                value: tab.value,
              }))}
              value={activeTab}
              onChange={onTabChange}
              className={styles.tabSegmented}
            />
          </div>
          <div className={styles.tabContent}>{children}</div>
        </div>
      ) : (
        <div className={bodyClassName}>{children}</div>
      );

    if (form) {
      return (
        <Form
          form={form}
          layout={formLayout}
          onFinish={onFinish}
          className={styles.form}
        >
          {content}
        </Form>
      );
    }

    return content;
  };

  return (
    <>
      {showButton && (
        <Button
          type={buttonType}
          icon={buttonIcon}
          onClick={onButtonClick}
          style={buttonStyle}
          disabled={buttonDisabled}
          size={buttonSize}
        >
          {buttonText}
        </Button>
      )}

      <Modal
        title={title}
        open={open}
        onCancel={onCancel}
        footer={footerButtons || defaultFooter}
        width={width}
        destroyOnHidden={destroyOnClose}
        className={className}
        classNames={{
          header: styles.modalHeader,
          body: styles.modalBody,
        }}
      >
        <Spin spinning={loading}>{renderContent()}</Spin>
      </Modal>
    </>
  );
};
