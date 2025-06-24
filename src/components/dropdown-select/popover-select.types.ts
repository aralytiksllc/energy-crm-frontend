// External dependencies

// Internal dependencies

export interface PopoverSelectProps<T> {
  options: T[];
  selected: T[];
  onSelect: (option: T) => void;
  onToggleAll: () => void;
  optionKey: (option: T) => string;
  optionLabel: (option: T) => string;
  buttonLabel?: string;
}
