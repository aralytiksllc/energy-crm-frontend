// External

// Internal

export interface CheckableTagGroupProps {
  options: { label: string; value: string }[];

  value: string[];

  onChange: (tag: string, checked: boolean) => void;

  prefix?: React.ReactNode;

  suffix?: React.ReactNode;
};
