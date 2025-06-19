import { httpClient } from '@/providers/http-client';
import type { IUser } from '@/interfaces/users';

export interface UserSummary {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  isActive: boolean;
}

export interface UsersPagedResponse {
  items: UserSummary[];
  total: number;
  current: number;
  pageSize: number;
}

// Get all users (summary for dropdowns)
export const getUsers = async (): Promise<UserSummary[]> => {
  try {
    const response = await httpClient.get('users').json<any>();

    if (!response) {
      return [];
    }

    // Handle paginated response format: {items: [...], total: X, current: Y, pageSize: Z}
    if (response.items && Array.isArray(response.items)) {
      return response.items;
    }

    // Handle direct array response format: [...]
    if (Array.isArray(response)) {
      return response;
    }

    return [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return []; // Return empty array on error
  }
};

// Get all users (full data)
export const getAllUsers = async (): Promise<IUser[]> => {
  const response = await httpClient.get('users').json<IUser[]>();
  return response;
};

// Get single user by ID
export const getUser = async (id: number): Promise<IUser> => {
  const response = await httpClient.get(`users/${id}`).json<IUser>();
  return response;
};
