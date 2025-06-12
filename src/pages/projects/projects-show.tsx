// External imports
import * as React from 'react';
import { Descriptions } from 'antd';
import { Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';

// Internal imports
import { IProject } from './types/types';
import { projectStages } from './constants/projects';

export const ProjectsShow: React.FC = () => {
  const { query } = useShow<IProject>();
  const { data, isLoading } = query;
  const record = data?.data;

  let stagesDisplay = '';
  if (record?.id && projectStages[record.id]) {
    stagesDisplay = projectStages[record.id]
      .map((s: { title: string }) => s.title)
      .join(', ');
  } else if (record?.stage) {
    stagesDisplay = record.stage;
  }

  return (
    <Show isLoading={isLoading}>
      <Descriptions bordered column={2}>
        <Descriptions.Item label="ID" span={2}>
          <TextField value={record?.id} />
        </Descriptions.Item>
        <Descriptions.Item label="Name">
          <TextField value={record?.name} />
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={2}>
          <TextField value={record?.description} />
        </Descriptions.Item>
        <Descriptions.Item label="Stages" span={2}>
          <TextField value={stagesDisplay} />
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
};
