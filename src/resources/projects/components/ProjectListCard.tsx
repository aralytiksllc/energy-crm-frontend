import React from 'react';
import { Link } from 'react-router';
import styles from '../styles/projectListCard.module.css';

interface ProjectListCardProps {
  name: string;
  description: string;
  to: string;
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ProjectListCard: React.FC<ProjectListCardProps> = ({
  name,
  description,
  to,
  hovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <Link
      to={to}
      className={hovered ? `${styles.card} ${styles.cardHover}` : styles.card}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className={styles.title}>{name}</span>
      <span className={styles.desc}>{description}</span>
    </Link>
  );
};

export default ProjectListCard;
