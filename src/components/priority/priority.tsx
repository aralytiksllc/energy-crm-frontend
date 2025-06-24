// External imports
import * as React from 'react';
import { Tag, Tooltip } from 'antd';

// Internal imports
import type { PriorityProps } from './priority.types';
import { useStyles } from './priority.styles';

export const Priority: React.FC<PriorityProps> = (props) => {
  const { text, ...restProps } = props;

  const { styles } = useStyles();

  return (
    <Tooltip title={text}>
      <Tag color="blue" className={styles.tag} {...restProps}>
        {text}
      </Tag>
    </Tooltip>
  );
};
