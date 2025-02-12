import jsonServerProvider from "ra-data-json-server";
import { fetchUtils } from "react-admin";

const apiUrl = "http://localhost:3000";

export const dataProvider = jsonServerProvider(
  apiUrl,
  (url: string, options: fetchUtils.Options = {}) => {
    options.headers = new Headers(
      options.headers || { Accept: "application/json" },
    );

    const token = localStorage.getItem("token");
    if (token) {
      options.headers.set("Authorization", `Bearer ${token}`);
    }

    return fetchUtils.fetchJson(url, options);
  },
);
