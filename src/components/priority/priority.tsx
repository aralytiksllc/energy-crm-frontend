// External imports
import * as React from 'react';
import { Tag, Tooltip } from 'antd';

// Internal imports
import { useStyles } from './priority.styles';

interface PriorityProps {
  text: string;
}

export const Priority: React.FC<PriorityProps> = (props) => {
  const { text } = props;

  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <Tooltip title={text}>
        <Tag color="blue" className={styles.tag}>
          {text}
        </Tag>
      </Tooltip>
    </div>
  );
};
