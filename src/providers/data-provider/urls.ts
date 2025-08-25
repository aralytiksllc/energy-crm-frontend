import { generatePath } from 'react-router';

export const urls = {
  customers: {
    name: 'customers',
    list: 'customers',
    create: 'customers',
    show: 'customers/:id',
    edit: 'customers/:id',
    delete: 'customers/:id',
  },
  branches: {
    name: 'branches',
    list: 'customers/:customerId/branches',
    create: 'customers/:customerId/branches',
    show: 'customers/:customerId/branches/:id',
    edit: 'customers/:customerId/branches/:id',
    delete: 'customers/:customerId/branches/:id',
  },
};

type Dict = Record<string, string | number | undefined>;

export function resolveUrl(pattern: string, input: any & { meta?: Dict } = {}) {
  const merged: Dict = { ...(input.meta ?? {}), ...input };
  const needed = extractParams(pattern);

  for (const k of needed) {
    if (merged[k] == null) {
      throw new Error(`Missing param "${k}" for pattern "${pattern}"`);
    }
  }

  return needed.length ? generatePath(pattern, merged as any) : pattern;
}

function extractParams(pattern: string) {
  const out: string[] = [];
  const rx = /:([A-Za-z0-9_]+)/g;
  let m: RegExpExecArray | null;
  while ((m = rx.exec(pattern))) out.push(m[1]);
  return out;
}