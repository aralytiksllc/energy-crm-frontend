// External imports
import type { AuthProvider } from '@refinedev/core';

// Internal imports
import type { IAuthResponse } from '@/interfaces/authentication';
import type { IUser } from '@/interfaces/users';
import { httpClient } from './http-client';
import { authStorage } from './auth-storage';

export const authProvider: AuthProvider = {
  async login(params) {
    const response = await httpClient.post('login', {
      json: {
        email: params.email,
        password: params.password,
      },
    });

    const data = await response.json<IAuthResponse>();

    if (!data.accessToken) {
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
  },

  async logout() {
    authStorage.clear();
    return {
      success: true,
      redirectTo: '/login',
    };
  },

  async check() {
    return authStorage.get()
      ? { authenticated: true }
      : { authenticated: false, logout: true, redirectTo: '/login' };
  },

  async getIdentity() {
    try {
      return await httpClient.get('me').json<IUser>();
    } catch {
      return null;
    }
  },

  async forgotPassword(params) {
    await httpClient
      .post('forgot-password', {
        json: {
          email: params.email,
        },
      })
      .json();

    return {
      success: true,
      redirectTo: 'login',
      successNotification: {
        message: 'Forgot Password',
        description:
          "We've sent you an email with instructions to reset your password.",
      },
    };
  },

  async updatePassword(params) {
    await httpClient
      .post('update-password', {
        json: {
          password: params.password,
          token: params.token,
        },
      })
      .json();

    return {
      success: true,
      redirectTo: '/login',
      successNotification: {
        message: 'Password Updated',
        description:
          'Your password has been successfully updated. You can now log in with your new credentials.',
      },
    };
  },

  async onError(error) {
    return {
      success: false,
      error: {
        name: 'Error',
        message: error.message,
      },
    };
  },
};
