// External imports
import ky from 'ky';

// Internal imports
import { API_URL } from './http-constants';
import { authStorage } from './auth-storage';

export const httpClient = ky.create({
  prefixUrl: 'http://localhost:3000',
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
  },
});
