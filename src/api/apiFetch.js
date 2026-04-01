import router from "@/router";

export const apiFetch = async (endpoint, options = {}) => {
  const { method = 'GET', body, headers = {}, ...customConfig } = options;

  const isAuthRequest = endpoint.startsWith('/login');
  const baseUrl = isAuthRequest ? '/api-auth' : '/api';

  const config = {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...customConfig
  };

  if (body) config.body = JSON.stringify(body);

  const response = await fetch(`${baseUrl}${endpoint}`, config);

  if (response.status === 401 || response.status === 403) {
    router.push('/login');
    return;
  }

  if (!response.ok) {
    const error = new Error('Ошибка сети');
    error.status = response.status;
    throw error;
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return null;
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
};