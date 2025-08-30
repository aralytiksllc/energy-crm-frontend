// External
import type { AuthProvider } from '@refinedev/core';

// Internal
import type { IAuthResponse } from '@/interfaces/authentication';
import type { IUser } from '@/interfaces/users';
import { httpClient } from '@/helpers/http-client';
import { authStorage } from '@/helpers/auth-storage';

export const authProvider: AuthProvider = {
  async login(params) {
    const { email, password } = params;

    const response = await httpClient.post('login', {
      json: { email, password },
    });

    const data = await response.json<IAuthResponse>();

    if (data.accessToken) {
      localStorage.setItem('my_access_token', data.accessToken);
      return { success: true };
    }

    return { success: false };
  },

  async logout() {
    localStorage.removeItem('my_access_token');
    return {
      success: true,
      redirectTo: '/login',
    };
  },

  async check() {
    const token = localStorage.getItem('my_access_token');

    return { authenticated: Boolean(token) };
  },

  async getPermissions() {},

  async getIdentity() {
    const token = authStorage.get();
    if (!token) {
      return null;
    }

    try {
      const response = await httpClient.get('me');
      const data = await response.json<IUser>();
      return data;
    } catch (error) {
      return null;
    }
  },

  async onError(error) {
    if (error.statusCode === 401 || error.statusCode === 403) {
      return {
        logout: true,
        redirectTo: '/login',
        error,
      };
    }

    return {};
  },
};
