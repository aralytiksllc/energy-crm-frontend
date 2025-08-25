// External
import * as React from 'react';
import { Space, Tag } from 'antd';

// Internal
import type { CheckableTagGroupProps } from './checkable-tag-group.types';

const { CheckableTag } = Tag;

export const CheckableTagGroup: React.FC<CheckableTagGroupProps> = (props) => {
  const { options, value, onChange, prefix, suffix } = props;

  return (
    <Space wrap={true}>
      {prefix}
      {options.map((tag) => (
        <CheckableTag
          onChange={(checked) => onChange(tag.value, checked)}
          checked={value.includes(tag.value)}
          key={tag.value}
        >
          {tag.label}
        </CheckableTag>
      ))}
      {suffix}
    </Space>
  );
};
