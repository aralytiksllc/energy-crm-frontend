import { DataProvider } from '@refinedev/core';
import { AxiosInstance } from 'axios';
import { dataProviderHelper } from './helper';

export const createDataProvider = (
  httpClient: AxiosInstance,
): Required<DataProvider> => ({
  getApiUrl() {
    return httpClient.defaults.baseURL || '';
  },

  async getList(params) {
    const qs = dataProviderHelper.buildQueryString(params);
    const url = `${params.resource}?${qs}`;

    const response = await httpClient.get(url, {
      headers: params.meta?.headers,
    });

    return {
      data: response.data.items,
      total: response.data.total,
    };
  },

  async getOne(params) {
    const url = `${params.resource}/${params.id}`;

    const response = await httpClient.get(url, {
      headers: params.meta?.headers,
    });

    return { data: response.data };
  },

  async create(params) {
    const url = `${params.resource}`;

    const response = await httpClient.post(url, params.variables, {
      headers: params.meta?.headers,
    });

    return { data: response.data };
  },

  async update(params) {
    const url = `${params.resource}/${params.id}`;

    const response = await httpClient.patch(url, params.variables, {
      headers: params.meta?.headers,
    });

    return { data: response.data };
  },

  async deleteOne(params) {
    const url = `${params.resource}/${params.id}`;

    const response = await httpClient.delete(url, {
      headers: params.meta?.headers,
    });

    return { data: response.data };
  },

  async custom(params) {
    const method = params.method.toLowerCase();

    switch (method) {
      case 'get': {
        const qs = dataProviderHelper.buildQueryString(params);
        const url = `${params.url}?${qs}`;

        const response = await httpClient.get(url, {
          headers: params.headers,
        });

        return { data: response.data };
      }

      case 'post':
      case 'put':
      case 'patch': {
        const response = await httpClient[method](params.url, params.payload, {
          headers: params.headers,
        });

        return { data: response.data };
      }

      case 'delete': {
        const response = await httpClient.delete(params.url, {
          data: params.payload,
          headers: params.headers,
        });

        return { data: response.data };
      }

      default: {
        throw new Error(`Unsupported method: ${params.method}`);
      }
    }
  },

  getMany() {
    throw new Error('Function not implemented.');
  },

  createMany() {
    throw new Error('Function not implemented.');
  },

  updateMany() {
    throw new Error('Function not implemented.');
  },

  deleteMany() {
    throw new Error('Function not implemented.');
  },
});
