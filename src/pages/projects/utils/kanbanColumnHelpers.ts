import styles from '../styles/kanbanColumn.module.css';

export function getColumnClass(isOver: boolean) {
  return styles.column;
}

export function getBodyClass(isOver: boolean, active: any) {
  let className = styles.body;
  if (active) className += ' ' + styles.bodyActive;
  if (isOver) className += ' ' + styles.isOver;
  return className;
}
