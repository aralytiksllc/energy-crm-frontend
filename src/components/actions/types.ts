import { BaseRecord } from '@refinedev/core';
import {
  EditButtonProps,
  ShowButtonProps,
  DeleteButtonProps,
} from '@refinedev/antd';

export type ActionsConfig = {
  editButton?: EditButtonProps | null;
  showButton?: ShowButtonProps | null;
  deleteButton?: DeleteButtonProps | null;
};

export type ActionsProps = {
  record: BaseRecord;
  config?: ActionsConfig;
};
