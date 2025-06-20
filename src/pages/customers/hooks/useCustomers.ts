import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import {
  getCustomers,
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../api/customers';
import type {
  Customer,
  CreateCustomerDto,
  UpdateCustomerDto,
  CustomerQueryParams,
  CustomerPagedResponse,
} from '../types/customer.types';

// Query keys
export const customerKeys = {
  all: ['customers'] as const,
  lists: () => [...customerKeys.all, 'list'] as const,
  list: (params?: CustomerQueryParams) =>
    [...customerKeys.lists(), params] as const,
  details: () => [...customerKeys.all, 'detail'] as const,
  detail: (id: number) => [...customerKeys.details(), id] as const,
};

// Get customers with pagination and filtering
export const useCustomers = (params?: CustomerQueryParams) => {
  return useQuery<CustomerPagedResponse, Error>({
    queryKey: customerKeys.list(params),
    queryFn: () => getCustomers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// Get all customers (for dropdowns)
export const useAllCustomers = () => {
  return useQuery<Customer[], Error>({
    queryKey: ['customers', 'all'],
    queryFn: getAllCustomers,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

// Get single customer
export const useCustomer = (id: number) => {
  return useQuery<Customer, Error>({
    queryKey: customerKeys.detail(id),
    queryFn: () => getCustomer(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

// Create customer mutation
export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation<Customer, Error, CreateCustomerDto>({
    mutationFn: createCustomer,
    onSuccess: (data) => {
      // Invalidate and refetch customers list
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['customers', 'all'] });
      message.success('Customer created successfully');
    },
    onError: (error) => {
      console.error('Error creating customer:', error);
      message.error('Failed to create customer');
    },
  });
};

// Update customer mutation
export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation<Customer, Error, { id: number; data: UpdateCustomerDto }>({
    mutationFn: ({ id, data }) => updateCustomer(id, data),
    onSuccess: (data, variables) => {
      // Update the specific customer in cache
      queryClient.setQueryData(customerKeys.detail(variables.id), data);
      // Invalidate lists to ensure consistency
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['customers', 'all'] });
      message.success('Customer updated successfully');
    },
    onError: (error) => {
      console.error('Error updating customer:', error);
      message.error('Failed to update customer');
    },
  });
};

// Delete customer mutation
export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteCustomer,
    onSuccess: (_, customerId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: customerKeys.detail(customerId) });
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['customers', 'all'] });
      message.success('Customer deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting customer:', error);
      message.error('Failed to delete customer');
    },
  });
};
