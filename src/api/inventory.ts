import axios, { AxiosError } from "axios";
import type { InventoryItem } from "../types/inventory";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log("API Request:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error: AxiosError) => {
    console.error("Response Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return Promise.reject(error);
  }
);

export const inventoryApi = {
  getAll: async () => {
    const response = await api.get<ApiResponse<InventoryItem[]>>("/inventory");
    return response.data;
  },

  create: async (item: Omit<InventoryItem, "_id">) => {
    const response = await api.post<ApiResponse<InventoryItem>>(
      "/inventory",
      item
    );
    return response.data;
  },

  update: async (id: string, updates: Partial<InventoryItem>) => {
    const response = await api.patch<ApiResponse<InventoryItem>>(
      `/inventory/${id}`,
      updates
    );
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/inventory/${id}`);
  },

  updateQuantity: async (id: string, quantity: number) => {
    const response = await api.patch<ApiResponse<InventoryItem>>(
      `/inventory/${id}/quantity`,
      { quantity }
    );
    return response.data;
  },
};
