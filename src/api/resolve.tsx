import { AxiosError } from 'axios';

export async function resolve(promise) {
  interface IResolved {
    data: { token: string } | null;
    error: AxiosError | null;
  }

  const resolved: IResolved = {
    data: null,
    error: null,
  };

  try {
    resolved.data = await promise;
  } catch (e) {
    const errow = e as AxiosError;
    resolved.error = errow;
  }

  return resolved;
}
