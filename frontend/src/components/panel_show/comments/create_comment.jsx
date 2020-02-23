import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createComment } from '../../../actions/comment_actions';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

const Comment = styled.div`
  min-width: 100%;
  min-height: 100%;
  background-color: red;
  form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    textarea {
      width: 100%;
      resize: none;
      border: none;
    }
  }
  button {
    border: 0;
    height: 35px;
    text-decoration: none;
    font-family: sans-serif;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: ${props => props.theme.colors.font};
    color: #fff;
    border-radius: 3px;
    transition: background 250ms ease-in-out, transform 150ms ease;
    &:hover {
      background-color: ${props => props.theme.colors.primary};
    }
  }
`;

export default function CreateComment({ user }) {
  let { panelId } = useParams();
  let dispatch = useDispatch();
  let [panel, setPanel] = useState({
    content: '',
    authorId: user.id,
    username: user.username
  });
  function handleChange(e) {
    setPanel({
      ...panel,
      content: e.target.value
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createComment(panelId, panel));
    setPanel({
      ...panel,
      content: ''
    });
  }
  return (
    <Comment>
      <form onSubmit={handleSubmit}>
        <textarea placeholder="add a comment" value={panel.content} onChange={handleChange} />
        <button type="submit">Comment</button>
      </form>
    </Comment>
  );
}
