// data-helper.ts
import type { CrudFilters, CrudSort, GetListParams, LogicalFilter } from "@refinedev/core";
import qs from "qs";

/** Mapim i operatorëve të Refine -> API-së tënde */
const OP_MAP: Record<string, string> = {
  eq: "==",
  ne: "!=",
  lt: "<",
  lte: "<=",
  gt: ">",
  gte: ">=",
  in: "in",
  nin: "notIn",
  contains: "like",
  containss: "ilike",
  ncontains: "notLike",
  ncontainss: "notILike",
  startswith: "startsWith",
  startswiths: "iStartsWith",
  endswith: "endsWith",
  endswiths: "iEndsWith",
  between: "between",
  nbetween: "notBetween",
  null: "isNull",
  nnull: "isNotNull",
};

const mapOperator = (op?: string) => (op ? OP_MAP[op] ?? op : "==");

function transformFilters(filters?: CrudFilters) {
  if (!filters?.length) return;

  const out: Record<string, any> = {};
  let i = 0;

  for (const f of filters) {
    // Për thjeshtësi trajtojmë vetëm LogicalFilter (jo grupe or/and)
    if ("field" in f) {
      const { field, operator, value } = f as LogicalFilter;

      out[`filter[${i}][field]`] = field;
      out[`filter[${i}][type]`] = mapOperator(operator);

      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          // p.sh. in/notIn: value[]=a&value[]=b
          value.forEach((v, idx) => {
            out[`filter[${i}][value][${idx}]`] = v;
          });
        } else {
          out[`filter[${i}][value]`] = value;
        }
      }
      i++;
    }
    // Nëse ke nevojë për grupe OR/AND, mund të zgjerojmë këtë më pas sipas
    // mënyrës si i pret API-ja (p.sh. group=or, subgroup index, etj.).
  }

  return out;
}

function transformSorters(sorters?: CrudSort[]) {
  if (!sorters?.length) return;

  const out: Record<string, any> = {};
  sorters.forEach((s, i) => {
    out[`order[${i}][field]`] = s.field;
    out[`order[${i}][dir]`] = (s.order ?? "asc").toLowerCase(); // API pret 'asc'/'desc'
  });
  return out;
}

export const dataHelper = {
  buildQueryString(params: GetListParams): string {
    const query: Record<string, any> = {};
    const { pagination, sorters, filters } = params;

    // Pagination -> offset/limit
    if (pagination?.pageSize) {
      const current = pagination.current ?? 1;
      const pageSize = pagination.pageSize;
      query.limit = pageSize;
      query.offset = Math.max(0, (current - 1) * pageSize);
    }

    // Sorters -> order[...][field|dir]
    Object.assign(query, transformSorters(sorters));

    // Filters -> filter[...][field|type|value]
    Object.assign(query, transformFilters(filters));

    return qs.stringify(query, {
      encode: false, // p.sh. lejon %Must% të mbetet ashtu siç është
      arrayFormat: "indices",
    });
  },
};
