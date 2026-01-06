import { User } from "./api/model/table/User";

export const base_url = import.meta.env.VITE_API_URL ?? "http://localhost:7000";

export interface LoaderData {
  user: User;
}

export const UserUtility = {
  getToken(): string {
    return localStorage.getItem("webtoken") ?? "";
  },

  getAuthHeader(): string {
    const token = this.getToken();
    return token ? `Bearer ${token}` : "";
  },

  setToken(webtoken: string) {
    localStorage.setItem("webtoken", webtoken);
  },

  removeToken() {
    localStorage.removeItem("webtoken");
  },

  getUserType() {
    // TODO: implement if needed
  },

  redirectIfHasLogin(to: string = "/") {
    if (this.getToken()) {
      window.location.href = to;
    }
  },

  redirectIfNotLogin(to: string = "/login") {
    if (!this.getToken()) {
      window.location.href = to;
    }
  },
};

export function formatRp(num: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);
}
