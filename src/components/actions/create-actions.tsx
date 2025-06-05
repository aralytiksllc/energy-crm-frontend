import { BaseRecord } from '@refinedev/core';
import { Actions } from './actions';
import { ActionsConfig } from './types';

export const createActions = (config?: ActionsConfig) => {
  return (_: any, record: BaseRecord) => (
    <Actions record={record} config={config} />
  );
};
