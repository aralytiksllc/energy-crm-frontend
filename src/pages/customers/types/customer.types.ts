// Base entity interface
export interface BaseEntity {
  id: number;
  createdById?: number;
  updatedById?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Customer Entity - matching backend exactly
export interface Customer extends BaseEntity {
  // Customer-specific fields
  name: string;
  settings?: Record<string, unknown> | null; // JSONB field
  notes?: string | null;
  isActive: boolean;
  contracts?: Contract[]; // One-to-many relationship
}

// Create Customer DTO
export interface CreateCustomerDto {
  name: string; // Required
  settings?: Record<string, unknown>; // Optional JSON object
  notes?: string; // Optional text
  isActive?: boolean; // Optional (defaults to true)
}

// Update Customer DTO
export interface UpdateCustomerDto {
  // All fields from CreateCustomerDto but optional
  name?: string;
  settings?: Record<string, unknown>;
  notes?: string;
  isActive?: boolean;
}

// Basic Contract interface for customer relations
export interface Contract {
  id: number;
  title: string;
  customerId: number;
}

// Query system interfaces
export enum Operator {
  EQ = 'eq',
  NE = 'ne',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  LIKE = 'like',
  ILIKE = 'ilike',
  IN = 'in',
  RANGE = 'range',
}

export interface QueryFilter<T> {
  field: keyof T;
  operator: Operator;
  value: any;
}

export interface QuerySort<T> {
  field: keyof T;
  order: 'ASC' | 'DESC';
}

export interface QueryParams<T> {
  filters?: QueryFilter<T>[];
  sorters?: QuerySort<T>[];
  current?: number;
  pageSize?: number;
}

export interface Paged<T> {
  items: T[];
  total: number;
  current: number;
  pageSize: number;
}

// Query types for customer filtering and pagination
export type CustomerQueryParams = QueryParams<Customer>;
export type CustomerPagedResponse = Paged<Customer>;
