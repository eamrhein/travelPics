import React from 'react';
import { useSelector } from 'react-redux';
import { timeSince } from './timeSince';
import CreateComment from './create_comment';
import { deleteComment } from '../../../actions/comment_actions';

export default function CommentsIndex() {
  let panel = useSelector(state => state.entities.panels[0]);
  let currentUser = useSelector(state => state.session.user);
  let comments = panel.comments;
  function createDelete(currentUserId, authorId, commentId) {
    if (currentUserId === authorId) {
      return <button onClick={() => deleteComment(panel.id, commentId)}>Delete</button>;
    }
  }

  comments = comments.map(comment => (
    <div className="comment" key={comment._id}>
      {createDelete(currentUser.id, comment.authorId, comment._id)}
      <div>
        <span className="username">{comment.username}</span>{' '}
        <span className="comment-body">{comment.content}</span>
      </div>
      <span className="timestamp">{timeSince(comment.timestamp)} ago</span>
    </div>
  ));
  return (
    <div className="comment-area">
      {comments}
      {!!currentUser.loggedIn ? <CreateComment authorId={currentUser.id} /> : ''}
    </div>
  );
}
