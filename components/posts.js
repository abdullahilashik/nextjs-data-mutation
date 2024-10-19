"use client";

import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { toggleUserLikeStatus } from '@/lib/actions';
import {useOptimistic} from 'react';

function Post({ post, action }) {

  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form action={action.bind(null, post.id)} className={post.isLiked ? 'liked': undefined}>
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {

  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(posts, (prevPosts, updateOptimisticPostId) => {
    const updatePostId = posts.findIndex(post=> post.id == updateOptimisticPostId);
    if(updatePostId === -1){
      return prevPosts;
    }
    const updatedPost = {...prevPosts[updatePostId]};
    updatedPost.likes = updatedPost.likes +  (updatedPost.isLiked ? -1 : 1);
    updatedPost.isLiked = !updatedPost.isLiked;
    const newPosts = [...prevPosts];
    newPosts[updatePostId] = updatedPost;
    return newPosts;
  });

  async function updatePostAction(postId){
    updateOptimisticPosts(postId);
    await toggleUserLikeStatus(postId);
  }

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePostAction}/>
        </li>
      ))}
    </ul>
  );
}
