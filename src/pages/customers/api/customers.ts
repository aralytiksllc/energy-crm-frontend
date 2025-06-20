import { httpClient } from '@/providers/http-client';
import type {
  Customer,
  CreateCustomerDto,
  UpdateCustomerDto,
  CustomerQueryParams,
  CustomerPagedResponse,
} from '../types/customer.types';

// Get all customers with pagination and filtering
export const getCustomers = async (
  params?: CustomerQueryParams,
): Promise<CustomerPagedResponse> => {
  try {
    const searchParams = new URLSearchParams();

    if (params?.current) {
      searchParams.append('current', params.current.toString());
    }
    if (params?.pageSize) {
      searchParams.append('pageSize', params.pageSize.toString());
    }
    if (params?.filters) {
      searchParams.append('filters', JSON.stringify(params.filters));
    }
    if (params?.sorters) {
      searchParams.append('sorters', JSON.stringify(params.sorters));
    }

    const url = searchParams.toString()
      ? `customers?${searchParams.toString()}`
      : 'customers';
    const response = await httpClient.get(url).json<CustomerPagedResponse>();

    return response;
  } catch (error) {
    console.error('Error fetching customers:', error);
    return {
      items: [],
      total: 0,
      current: 1,
      pageSize: 10,
    };
  }
};

// Get all customers (simple list for dropdowns)
export const getAllCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await getCustomers({ pageSize: 1000 }); // Get a large number for dropdown
    return response.items;
  } catch (error) {
    console.error('Error fetching all customers:', error);
    return [];
  }
};

// Get single customer by ID
export const getCustomer = async (id: number): Promise<Customer> => {
  const response = await httpClient.get(`customers/${id}`).json<Customer>();
  return response;
};

// Create new customer
export const createCustomer = async (
  data: CreateCustomerDto,
): Promise<Customer> => {
  const response = await httpClient
    .post('customers', { json: data })
    .json<Customer>();
  return response;
};

// Update customer
export const updateCustomer = async (
  id: number,
  data: UpdateCustomerDto,
): Promise<Customer> => {
  const response = await httpClient
    .patch(`customers/${id}`, { json: data })
    .json<Customer>();
  return response;
};

// Delete customer
export const deleteCustomer = async (id: number): Promise<void> => {
  await httpClient.delete(`customers/${id}`);
};
