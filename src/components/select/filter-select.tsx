import { Select, SelectProps } from 'antd';
import { useSelect } from '@refinedev/antd';
import { UseSelectProps } from '@refinedev/core'; // Ky është importi i saktë

interface EntitySelectProps
  extends Omit<UseSelectProps<any, any, any>, 'optionValue' | 'optionLabel'> {
  optionValue: string;
  optionLabel: string;
}

export const EntitySelect: React.FC<EntitySelectProps> = (selectProps) => {
  const { selectProps: refinedSelectProps } = useSelect(selectProps as any);

  return <Select {...refinedSelectProps} {...(selectProps as any)} />;
};

export default EntitySelect;
