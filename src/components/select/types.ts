import { BaseRecord } from '@refinedev/core';

import { useSelect } from '@refinedev/antd';

type UseSelectParams<T extends BaseRecord> = Parameters<typeof useSelect<T>>[0];

export type AutoSelectProps<T extends BaseRecord> = UseSelectParams<T>;
