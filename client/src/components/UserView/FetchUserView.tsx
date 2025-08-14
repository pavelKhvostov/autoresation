import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { fetchUser } from '../../api/User';
import { queryClient } from '../../api/QuryClient';
import { Loader } from '../Loader';
import { UserView } from './UserView';

interface IFethUserId {
  userId: string;
}

export const FetchUserView: FC<IFethUserId> = ({ userId }) => {
  const userQuery = useQuery(
    {
      queryFn: () => fetchUser(userId),
      queryKey: ['users', userId],
    },
    queryClient,
  );

  switch (userQuery.status) {
    case 'pending':
      return <Loader />;

    case 'success':
      return <UserView user={userQuery.data} />;

    case 'error':
      return (
        <>
          <span>Произошла ошибка (</span>
          <button onClick={() => userQuery.refetch()}></button>
        </>
      );
  }
};
