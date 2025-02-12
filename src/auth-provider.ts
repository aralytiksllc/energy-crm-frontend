import { AuthProvider } from "react-admin";

const apiUrl = "http://localhost:3000";

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const request = new Request(`${apiUrl}/login`, {
      method: "POST",
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();

    localStorage.setItem("token", data.accessToken);

    return Promise.resolve();
  },

  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },

  checkError: (error: any) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve(),
};
