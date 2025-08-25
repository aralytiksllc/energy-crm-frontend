// External
import * as React from 'react';
import { useParams } from 'react-router';

// Internal
import { useStyles } from './components/customer-listing/customer-listing.styles';
import { CustomerFilter } from './components/customer-filter';
import { CustomerListing } from './components/customer-listing';

interface CompanyListProps {}

export const CustomerList: React.FC<CompanyListProps> = () => {
  const { styles } = useStyles();

  const { customerId, id } = useParams();

  const [selectedStages, setSelectedStages] = React.useState<string[]>([]);

  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const handleTagChange = React.useCallback(
    (stage: string, checked: boolean) =>
      setSelectedStages(checked ? [stage] : []),
    [setSelectedStages],
  );

  const handleSearch = React.useCallback(
    (searchTerm: string) => setSearchTerm(searchTerm),
    [setSearchTerm],
  );

  return (
    <div className={styles.root}>
      <CustomerFilter
        customerId={customerId ?? id}
        searchTerm={searchTerm}
        selectedStages={selectedStages}
        onStageChange={handleTagChange}
        onSearchTermChange={handleSearch}
      />
      <CustomerListing
        customerId={customerId ?? id}
        searchTerm={searchTerm}
        selectedTags={selectedStages}
      />
    </div>
  );
};
