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
  ResourceProps,
} from '@refinedev/core';

import { API_URL } from '@/helpers/http-client/http-constants';
import { httpClient } from '@/helpers/http-client/http-client';
import { dataHelper } from './data-helper';
import { urls, resolveUrl } from './urls';

export const createDataProvider = (
  resources: ResourceProps[],
): DataProvider => {
  const dataProvider: DataProvider = {
    getApiUrl() {
      return API_URL;
    },

    async getList<TData extends BaseRecord>(
      params: GetListParams,
    ): Promise<GetListResponse<TData>> {
      const queryString = dataHelper.buildQueryString(params);

      const url = `${params.resource}?${queryString}`;

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

      const data = await httpClient.get(url).json<TData>();

      return { data };
    },

    async create<TData extends BaseRecord, TVariables>(
      params: CreateParams<TVariables>,
    ): Promise<CreateResponse<TData>> {
      const url = `${params.resource}`;

      const response = await httpClient
        .post(url, {
          json: params.variables,
        })
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
        .put(url, { json: params.variables })
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

    async custom<TData extends BaseRecord = BaseRecord>(
      params: CustomParams,
    ): Promise<CustomResponse<TData>> {
      // Lejojmë VETËM GET + blob (download)
      const method = (params.method || 'get').toLowerCase();
      const wantsBlob = (params as any)?.meta?.responseType === 'blob';

      if (method !== 'get' || !wantsBlob) {
        throw new Error(
          "custom(): currently supports only GET downloads (meta.responseType === 'blob').",
        );
      }

      // Ndërto URL absolute: API_URL + params.url (pa // të dyfishtë)
      const joinUrl = (base: string, p: string) =>
        `${base.replace(/\/+$/, '')}/${String(p).replace(/^\/+/, '')}`;
      const absUrl = /^https?:\/\//i.test(params.url)
        ? params.url
        : joinUrl(API_URL, params.url);

      // Për filename nga Content-Disposition
      const parseFilename = (cd?: string | null) => {
        const m = /filename\*?=(?:UTF-8'')?"?([^"]+)"?/i.exec(cd ?? '');
        return m ? decodeURIComponent(m[1]) : undefined;
      };

      // Bëj kërkesën me fetch që të lexojmë headers + blob
      const res = await fetch(absUrl, {
        method: 'GET',
        headers: (params as any).headers, // p.sh. { Authorization: `Bearer ${token}` }
        // nëse përdor cookie-session, shto:
        // credentials: 'include',
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Download failed (${res.status}) ${text}`);
      }

      const filename =
        parseFilename(res.headers.get('Content-Disposition')) ||
        (params as any)?.meta?.filename ||
        'download.pdf';

      const blob = await res.blob();

      // kthe { blob, filename } që UI ta shkarkojë me <a download>
      return { data: { blob, filename } as any as TData };
    },
  };

  return dataProvider;
};
