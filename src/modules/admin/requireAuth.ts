import { getSession } from './services/authApi';

export async function requireAuth(): Promise<void> {
  const session = await getSession();
  if (!session) {
    window.location.href = '/panel/login';
  }
}