import ky from 'ky';
import { API_URL } from './http-constants';
import { authStorage } from './auth-storage';

export const httpClient = ky.create({
  prefixUrl: API_URL,

  headers: { 'Content-Type': 'application/json' },

  hooks: {
    beforeRequest: [
      (request) => {
        const token = authStorage.get();

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],

    beforeError: [
      async (error) => {
        const { response } = error;

        if (response) {
          try {
            const body = (await response.json()) as { message?: string };

            if (typeof body.message === 'string') {
              error.message = body.message;
            }

            if (response.status === 401 || response.status === 403) {
              authStorage.clear();
            }
          } catch {
            // fallback
          }
        }

        return error;
      },
    ],
  },
});
