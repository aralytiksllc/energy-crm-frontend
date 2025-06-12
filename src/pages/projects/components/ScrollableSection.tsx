import React from 'react';
import styles from '../styles/ProjectsForm.module.css';

interface ScrollableSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const ScrollableSection: React.FC<ScrollableSectionProps> = ({
  children,
  className = '',
  ...rest
}) => (
  <div
    className={styles.scrollableFields + (className ? ' ' + className : '')}
    {...rest}
  >
    {children}
  </div>
);
