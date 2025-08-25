// External

// Internal

export interface CustomerFilterProps {
  customerId?: string;

  searchTerm?: string;

  onSearchTermChange: (value: string) => void;

  selectedStages: string[];

  onStageChange: (tag: string, checked: boolean) => void;
}
