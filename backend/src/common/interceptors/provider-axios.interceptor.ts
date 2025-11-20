import { AxiosInstance } from 'axios';

export const setupProviderAxiosInterceptors = (
  axiosInstance: AxiosInstance,
) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const message =
        error?.response?.data?.message || error.message || 'Provider error';
      // eslint-disable-next-line no-console
      console.error('[ProviderAxiosInterceptor]', message);
      return Promise.reject(error);
    },
  );
};
