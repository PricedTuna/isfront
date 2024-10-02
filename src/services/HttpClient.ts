import axios, { AxiosInstance } from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const getHttpClient = (baseUrl: string): AxiosInstance => {
  console.log(API_BASE_URL)
  return axios.create({
    baseURL: `${API_BASE_URL}${baseUrl}`,
    timeout: 10000, // 10 segundos
    headers: {
      'Content-Type': 'application/json',
    },
  });
}