// External
import * as React from 'react';
import { useNavigate } from 'react-router';
import { HttpError, useList } from '@refinedev/core';

// Internal
import type { ICustomer } from '@/interfaces/customers';
import { FlatList } from '@/components/flatlist';
import { useFilters } from './customer-listing.hooks';
import { CustomerCard } from './customer-card';

interface CustomerListingProps {
  searchTerm: string;
  selectedTags: string[];
  customerId?: string;
}

export const CustomerListing: React.FC<CustomerListingProps> = (props) => {
  const { searchTerm, selectedTags, customerId } = props;

  const navigate = useNavigate();

  const { data, isLoading } = useList<ICustomer, HttpError>({
    resource: 'customers',
    filters: useFilters(searchTerm, selectedTags),
    pagination: {
      pageSize: 100,
    },
  });

  const items = data?.data ?? [];

  const selectedId = React.useMemo(
    () => (customerId ? Number(customerId) : undefined),
    [customerId],
  );

  const handleEdit = React.useCallback(
    (id: number) => navigate(`/customers/${id}`),
    [navigate],
  );

  const renderItem = React.useCallback(
    (index: number, customer: ICustomer) => {
      const isActive = selectedId === customer.id;
      return (
        <CustomerCard
          onEdit={handleEdit}
          isActive={isActive}
          customer={customer}
          key={customer.id}
        />
      );
    },
    [handleEdit, selectedId],
  );

  return (
    <FlatList<ICustomer>
      itemContent={renderItem}
      emptyText="No customers"
      loading={isLoading}
      data={items}
    />
  );
};
