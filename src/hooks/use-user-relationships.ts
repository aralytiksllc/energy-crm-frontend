import { useMemo } from 'react';
import { useList } from '@refinedev/core';

export interface UserRelationshipInfo {
  hasRelated: boolean;
  message: string;
}

export const useUserRelationships = () => {
  const { data: contractsData } = useList({
    resource: 'contracts',
    pagination: { mode: 'off' },
  });

  const { data: customersData } = useList({
    resource: 'customers',
    pagination: { mode: 'off' },
  });

  const userRelationships = useMemo(() => {
    const contracts = contractsData?.data || [];
    const customers = customersData?.data || [];
    const map: Record<number, UserRelationshipInfo> = {};

    // Check for contracts assigned to users
    contracts.forEach((contract: any) => {
      if (contract.assignedUserId) {
        if (!map[contract.assignedUserId]) {
          map[contract.assignedUserId] = { hasRelated: false, message: '' };
        }
        map[contract.assignedUserId].hasRelated = true;
      }
    });

    // Check for customers assigned to users
    customers.forEach((customer: any) => {
      if (customer.assignedUserId) {
        if (!map[customer.assignedUserId]) {
          map[customer.assignedUserId] = { hasRelated: false, message: '' };
        }
        map[customer.assignedUserId].hasRelated = true;
      }
    });

    Object.keys(map).forEach((userId) => {
      const relatedContracts = contracts.filter(
        (contract: any) => contract.assignedUserId === Number(userId),
      );
      const relatedCustomers = customers.filter(
        (customer: any) => customer.assignedUserId === Number(userId),
      );

      if (relatedContracts.length > 0 || relatedCustomers.length > 0) {
        const contractNames = relatedContracts
          .slice(0, 3)
          .map((c: any) => c.title)
          .join(', ');
        const customerNames = relatedCustomers
          .slice(0, 3)
          .map((c: any) => c.name)
          .join(', ');

        let message =
          'This user cannot be deleted because they have active assignments:';
        if (relatedContracts.length > 0) {
          message += `\n• Contracts: ${contractNames}`;
          if (relatedContracts.length > 3)
            message += ` (and ${relatedContracts.length - 3} more)`;
        }
        if (relatedCustomers.length > 0) {
          message += `\n• Customers: ${customerNames}`;
          if (relatedCustomers.length > 3)
            message += ` (and ${relatedCustomers.length - 3} more)`;
        }
        message +=
          '\n\nPlease reassign or delete these items first before deleting the user.';

        map[Number(userId)].message = message;
      }
    });

    return map;
  }, [contractsData, customersData]);

  return userRelationships;
};
