import { FC } from 'react';
import { TPost } from '../../api/Post';
import './PostView.css';
import { FetchUserView } from '../UserView/FetchUserView';

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString(undefined, {
    timeStyle: 'medium',
  })}`;
}

interface IPostProps {
  post: TPost;
}

export const PostView: FC<IPostProps> = ({ post }) => {
  return (
    <div className='post-view'>
      <FetchUserView userId={post.authorId} />
      <p className='post-view__text'>{post.text}</p>
      <time className='post-view__time'>{formatDate(post.createdAt)}</time>
    </div>
  );
};
