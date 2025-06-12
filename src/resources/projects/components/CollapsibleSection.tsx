import React from 'react';
import { Typography } from 'antd';
import styles from '../styles/ProjectsForm.module.css';

interface CollapsibleSectionProps {
  title: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  isOpen,
  onClick,
  children,
  className = '',
}) => {
  return (
    <div className={styles.section}>
      <Typography.Title
        level={5}
        className={styles.sectionTitle}
        style={{ cursor: 'pointer', userSelect: 'none' }}
        onClick={onClick}
      >
        {title}
      </Typography.Title>
      <div
        className={
          styles.collapsibleContent +
          ' ' +
          (isOpen ? '' : styles.collapsed) +
          (className ? ' ' + className : '')
        }
      >
        {children}
      </div>
    </div>
  );
};
