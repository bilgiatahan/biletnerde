import axios, { AxiosInstance } from 'axios';
import { setupProviderAxiosInterceptors } from '../../../common/interceptors/provider-axios.interceptor';

export abstract class BaseProviderService {
  protected readonly http: AxiosInstance;

  protected constructor(baseURL: string) {
    this.http = axios.create({ baseURL, timeout: 5000 });
    setupProviderAxiosInterceptors(this.http);
  }
}
