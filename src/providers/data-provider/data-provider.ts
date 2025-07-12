import type {
  DataProvider,
  BaseRecord,
  CreateParams,
  CreateResponse,
  DeleteOneParams,
  DeleteOneResponse,
  GetListParams,
  GetListResponse,
  GetOneParams,
  GetOneResponse,
  UpdateParams,
  UpdateResponse,
  CustomParams,
  CustomResponse,
} from '@refinedev/core';

import { API_URL } from '@helpers/http-client/http-constants';
import { httpClient } from '@helpers/http-client/http-client';
import { dataHelper } from './data-helper';
import ky from 'ky';

export const dataProvider: DataProvider = {
  getApiUrl() {
    return API_URL;
  },

  async getList<TData extends BaseRecord>(
    params: GetListParams,
  ): Promise<GetListResponse<TData>> {
    const queryString = dataHelper.buildQueryString(params);
    const url = queryString
      ? `${params.resource}?${queryString}`
      : params.resource;

    try {
      const response = await httpClient.get(url).json<any>();

      if (!response) {
        return {
          data: [],
          total: 0,
        };
      }

      if (response.items && typeof response.total === 'number') {
        return {
          data: Array.isArray(response.items) ? response.items : [],
          total: response.total,
        };
      } else if (response.data && typeof response.total === 'number') {
        return {
          data: Array.isArray(response.data) ? response.data : [],
          total: response.total,
        };
      } else if (Array.isArray(response)) {
        return {
          data: response,
          total: response.length,
        };
      } else if (response.results && typeof response.count === 'number') {
        return {
          data: Array.isArray(response.results) ? response.results : [],
          total: response.count,
        };
      } else {
        return {
          data: [],
          total: 0,
        };
      }
    } catch (error) {
      console.error(`Error fetching ${params.resource}:`, error);
      return {
        data: [],
        total: 0,
      };
    }
  },

  async getOne<TData extends BaseRecord>(
    params: GetOneParams,
  ): Promise<GetOneResponse<TData>> {
    const url = `${params.resource}/${params.id}`;
    const response = await httpClient.get(url).json<TData>();

    return {
      data: response,
    };
  },

  async create<TData extends BaseRecord, TVariables>(
    params: CreateParams<TVariables>,
  ): Promise<CreateResponse<TData>> {
    const { resource, variables } = params;

    const response = await httpClient
      .post(resource, { json: variables })
      .json<TData>();

    return {
      data: response,
    };
  },

  async update<TData extends BaseRecord, TVariables>(
    params: UpdateParams<TVariables>,
  ): Promise<UpdateResponse<TData>> {
    const url = `${params.resource}/${params.id}`;
    const response = await httpClient
      .patch(url, { json: params.variables })
      .json<TData>();

    return {
      data: response,
    };
  },

  async deleteOne<TData extends BaseRecord, TVariables>(
    params: DeleteOneParams<TVariables>,
  ): Promise<DeleteOneResponse<TData>> {
    const url = `${params.resource}/${params.id}`;
    const response = await httpClient.delete(url).json<TData>();

    return {
      data: response,
    };
  },

  async custom<TData extends BaseRecord = BaseRecord>(
    params: CustomParams,
  ): Promise<CustomResponse<TData>> {
    const method = params.method.toLowerCase();

    switch (method) {
      case 'get': {
        const data = await httpClient.get(params.url).json<TData>();
        return { data };
      }

      case 'post':
      case 'put':
      case 'patch': {
        const data = await httpClient[method](params.url, {
          json: params.payload,
        }).json<TData>();
        return { data };
      }

      case 'delete': {
        const data = await httpClient
          .delete(params.url, {
            json: params.payload,
          })
          .json<TData>();
        return { data };
      }

      default:
        throw new Error(`Unsupported method: ${params.method}`);
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
};
