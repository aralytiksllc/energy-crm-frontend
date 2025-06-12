// External imports
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

// Internal imports
import { API_URL } from './http-constants';
import { httpClient } from './http-client';
import { dataHelper } from './data-helper';

export const dataProvider: DataProvider = {
  getApiUrl() {
    return API_URL;
  },

  async getList<TData extends BaseRecord>(
    params: GetListParams,
  ): Promise<GetListResponse<TData>> {
    const qs = dataHelper.buildQueryString(params);
    const url = `${params.resource}?${qs}`;
    const response = await httpClient.get(url).json<{
      items: TData[];
      total: number;
    }>();

    return {
      data: response.items,
      total: response.total,
    };
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
    const url = `${params.resource}`;
    const response = await httpClient
      .post(url, { json: params.variables })
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
        const qs = dataHelper.buildQueryString(params);
        const url = `${params.url}?${qs}`;
        const data = await httpClient.get(url).json<TData>();
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
