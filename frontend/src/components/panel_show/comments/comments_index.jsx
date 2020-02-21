import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreateComment from './create_comment';
import { deleteComment } from '../../../actions/comment_actions';
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai';
import styled from 'styled-components';
let Comment = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 5px;
  div {
    p {
      text-indent: 10px;
      margin: 0;
    }
  }
  button {
    color: red;
    cursor: pointer;
    transition: all 0.4s ease-out;
    position: relative;
    .hover-show {
      opacity: 0;
    }
    .hover-hidden {
      position: absolute;
      top: 3px;
      left: 3px;
    }
    :hover {
      .hover-hidden {
        opacity: 0;
        transition: 0.4s ease-in;
      }
      .hover-show {
        position: relative;
        opacity: 1;
        transition: 0.4s ease-in;
        top: 3px;
        left: 3px;
      }
    }
  }
`;
export default function CommentsIndex() {
  let dispatch = useDispatch();
  let panel = useSelector(state => state.entities.panels[0]);
  let user = useSelector(state => state.session.user);
  let comments = panel.comments;
  comments = comments.map(comment => (
    <Comment key={comment._id}>
      <div style={{ fontWeight: 'bolder', marginRight: '5px' }}>{comment.username}</div>
      <div className="comment-body">
        <p>
          {comment.content}
          <button onClick={() => dispatch(deleteComment(panel.id, comment._id))}>
            <AiOutlineDelete className="hover-hidden" />
            <AiFillDelete className="hover-show" />
          </button>
        </p>
      </div>
    </Comment>
  ));
  return (
    <div style={{ minWidth: '100%' }}>
      <div>{comments}</div>
      <div>{user && user.id ? <CreateComment authorId={user.id} /> : null}</div>
    </div>
  );
}
