// External imports
import type { AuthProvider } from '@refinedev/core';

// Internal imports
import type { IAuthResponse } from '@/interfaces/authentication';
import type { IUser } from '@/interfaces/users';
import { httpClient } from './http-client';
import { authStorage } from './auth-storage';

export const LOGOUT_STATUSES = new Set([401, 403]);

export const authProvider: AuthProvider = {
  async login(params) {
    try {
      const { email, password } = params;

      const response = await httpClient.post('login', {
        json: { email, password },
      });

      const data = await response.json<IAuthResponse>();

      if (!data?.accessToken) {
        return {
          success: false,
          error: {
            name: 'LoginError',
            message: 'Missing access token.',
          },
        };
      }

      authStorage.set(data.accessToken);

      return {
        success: true,
        redirectTo: '/',
      };
    } catch (error: any) {
      console.log(error);

      return {
        success: false,
        error: {
          name: 'LoginError',
          message: error?.message || 'Login failed.',
        },
      };
    }
  },

  async logout() {
    authStorage.clear();
    return {
      success: true,
      redirectTo: '/login',
    };
  },

  async check() {
    const token = authStorage.get();

    if (!token) {
      return {
        authenticated: false,
        logout: true,
        redirectTo: '/login',
      };
    }

    return { authenticated: true };
  },

  async getIdentity() {
    const token = authStorage.get();

    if (!token) {
      return null;
    }

    try {
      return await httpClient.get('me').json<IUser>();
    } catch {
      return null;
    }
  },

  async onError(error) {
    const status = error?.response?.status;

    if (LOGOUT_STATUSES.has(status)) {
      authStorage.clear();
      return { logout: true };
    }

    return { error };
  },
};
