import { useEffect, useState } from 'react';
import { z } from 'zod';
import { validateResponse } from './validateResponse';

export const PostShema = z.object({
  id: z.string(),
  text: z.string(),
  authorId: z.string(),
  createdAt: z.number(),
});

export type TPost = z.infer<typeof PostShema>;

export const PostList = z.array(PostShema);

export type TPostList = z.infer<typeof PostList>;

export const FetchPostListShema = z.object({
  list: PostList,
});

export type TFetchPostList = z.infer<typeof FetchPostListShema>;

export function fetchPostList(): Promise<TFetchPostList> {
  return fetch('/api/posts')
    .then((resp) => resp.json())
    .then((data) => FetchPostListShema.parse(data));
}

interface IIdleState {
  status: 'idle';
}
interface ILoadingState {
  status: 'loading';
}
interface ISuccessState {
  status: 'success';
  data: TPostList;
}
interface IErrorState {
  status: 'error';
  error: unknown;
}

type TRequestState = IIdleState | ILoadingState | ISuccessState | IErrorState;

export function usePostList() {
  const [state, setState] = useState<TRequestState>({ status: 'idle' });

  useEffect(() => {
    if (state.status === 'loading') {
      fetchPostList()
        .then((data) => {
          setState({ status: 'success', data: data.list });
        })
        .catch((error) => {
          setState({ status: 'error', error });
        });
    }
  }, [state]);

  useEffect(() => {
    setState({ status: 'loading' });
  }, []);

  const refetch = () => {
    setState({ status: 'loading' });
  };

  return {
    state,
    refetch,
  };
}

export function createPost(text: string): Promise<void> {
  return fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })
    .then(validateResponse)
    .then(() => undefined);
}
