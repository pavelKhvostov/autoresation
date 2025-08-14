import { FC } from 'react';

import { PostView } from '../PostView';
import './PostListView.css';
import { TPostList } from '../../api/Post';

export interface IPostList {
  postList: TPostList;
}

export const PostListView: FC<IPostList> = ({ postList }) => {
  return (
    <ul className='post-list'>
      {postList.map((post) => (
        <li key={post.id} className='post-list__item'>
          <PostView post={post} />
        </li>
      ))}
    </ul>
  );
};
