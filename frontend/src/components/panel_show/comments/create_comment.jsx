import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createComment } from '../../../actions/comment_actions';
import styled from 'styled-components';

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
const mSTP = (state, ownProps) => ({
  username: state.session.user.username,
  panelId: ownProps.match.params.panelId,
  panel: state.entities.panels[0]
});
const mDTP = dispatch => ({
  createComment: (id, comment) => dispatch(createComment(id, comment))
});

class CreateComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {
        content: '',
        authorId: this.props.authorId,
        username: this.props.username
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      comment: {
        authorId: this.props.authorId,
        username: this.props.username,
        content: e.target.value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createComment, panelId } = this.props;
    createComment(panelId, this.state.comment);
    this.setState({
      comment: {
        content: '',
        authorId: this.props.authorId,
        username: this.props.username
      }
    });
  }

  render() {
    console.log(this.state);
    return (
      <Comment>
        <form onSubmit={e => this.handleSubmit(e)}>
          <textarea
            placeholder="add a comment"
            value={this.state.comment.content}
            onChange={this.handleChange}
          />
          <button type="submit">Comment</button>
        </form>
      </Comment>
    );
  }
}

export default withRouter(connect(mSTP, mDTP)(CreateComment));
