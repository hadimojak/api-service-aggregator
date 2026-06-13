export interface CreateRequestLogDto {
  tenantId: string;
  providerName: string;
  endpoint: string;
  method?: string;
  request?: unknown;
  response?: unknown;
  status?: number;
  latency: number;
  errorMessage?: string;
}
