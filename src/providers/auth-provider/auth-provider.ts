// External
import type { AuthProvider } from '@refinedev/core';

// Internal
import type { IAuthResponse } from '@/interfaces/authentication';
import type { IUser } from '@/interfaces/users';
import { httpClient } from '@/helpers/http-client';
import { authStorage } from '@/helpers/auth-storage';
import { json } from 'stream/consumers';

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
    console.log(
      JSON.stringify({
        password: params.password,
        userId: params.userId,
        token: params.token,
      }),
    );

    await httpClient
      .post('change-password', {
        json: {
          password: params.password,
          userId: params.userId,
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
