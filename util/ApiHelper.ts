export type ApiResponse<T> = {
    data?: T;
    error?: ErrorResponse;
    status?: number;
  };
  
  interface ErrorResponse extends Error {
    status: number;
  }
  
  export default async function fetchData<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const controller = (typeof window && new AbortController()) || undefined;
    const { signal } = controller;
    const { headers: headerOptions, ...restOptions } = options || {};
    // const fullURL = `${baseUrl || process.env.}/${url}`;
  
    try {
      const response = await fetch(`${'http://localhost:3000/'}${url}`, {
        headers: { ...headerOptions, 'Content-Type': 'application/json' },
        cache: 'no-store',
        ...restOptions,
        signal,
      });
  
      if (response.status === 204) return { status: 204 };
  
      let resJson;
      try {
        resJson = (await response.json()) as ApiResponse<T>;
      } catch {
        resJson = { error: 'Something went wrong!' };
      }
  
      if (!response.ok) {
        throw new Error(JSON.stringify({ ...resJson, status: response.status, url }));
      }
  
      const data = resJson?.data;
  
      return { data, status: response.status };
    } catch (_error) {
      const error = _error as ErrorResponse;
  
      if (error.name === 'AbortError') {
        console.warn('API request cancelled');
      } else {
        console.error('API request error:', error);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { message, status }: { message: ErrorResponse; status: number } = JSON.parse(error.message);
  
      return { error: message, status };
    }
  }
  