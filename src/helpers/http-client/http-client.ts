// External
import ky from 'ky';

// Internal
import { authStorage } from '@/helpers/auth-storage';
import { API_URL } from './http-constants';

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
            // Clone the response to preserve the body
            const clonedResponse = response.clone();
            
            const body = (await clonedResponse.json()) as { message?: string };

            if (typeof body.message === 'string') {
              error.message = body.message;
            }

            // Store the error body for later access
            (error as any).errorBody = body;

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
