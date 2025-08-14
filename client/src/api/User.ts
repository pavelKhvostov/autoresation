import { z } from 'zod';
import { validateResponse } from './validateResponse';

export const UserShema = z.object({
  id: z.string(),
  username: z.string(),
});

export type TUser = z.infer<typeof UserShema>;

export function fetchUser(id: string): Promise<TUser> {
  return fetch(`/api/users/${id}`)
    .then((res) => res.json())
    .then((data) => UserShema.parse(data));
}

export function registerUser(username: string, password: string): Promise<void> {
  return fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  }).then(() => undefined);
}

export function login(username: string, password: string): Promise<void> {
  return fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function fetchMe(): Promise<TUser> {
  return fetch('/api/users/me')
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => UserShema.parse(data));
}
