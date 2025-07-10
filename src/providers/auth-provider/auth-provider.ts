// External imports
import type { AuthProvider } from '@refinedev/core';

// Internal imports
import type { IAuthResponse } from '@interfaces/authentication';
import type { IUser } from '@interfaces/users';
import type { IRolePermission } from '@interfaces/role';
import { httpClient } from '@helpers/http-client';
import { authStorage } from '@helpers/auth-storage';

export const authProvider: AuthProvider = {
  async login(params) {
    try {
      const { email, password } = params;
      const response = await httpClient.post('login', {
        json: { email, password },
      });
      const data = await response.json<IAuthResponse>();

      authStorage.set(data.accessToken);

      return {
        success: true,
        redirectTo: '/',
      };
    } catch (error) {
      console.error('Login failed:', error);
      return {
        success: false,
        error: {
          name: 'LoginError',
          message: 'Invalid credentials',
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
    if (token) {
      try {
        await httpClient.get('me');
        return {
          authenticated: true,
        };
      } catch (error) {
        return {
          authenticated: false,
          redirectTo: '/login',
        };
      }
    }

    return {
      authenticated: false,
      redirectTo: '/login',
    };
  },

  async getPermissions() {
    const identity = (await this.getIdentity?.()) as IUser | null;
    if (identity?.role?.rolePermissions) {
      return identity.role.rolePermissions.map(
        (rp: IRolePermission) => rp.permission.name,
      );
    }
    return [];
  },

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
