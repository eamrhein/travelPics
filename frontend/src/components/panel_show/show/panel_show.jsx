import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CommentsIndex from '../comments/comments_index';
import { fetchPanel, clearPanelState } from '../../../actions/panel_actions';
import { fetchChildren, clearChildState } from '../../../actions/children_actions';
import { like, unlike } from '../../../actions/user_actions';
import { Container, Main, SideBar, Trip } from '../../../styles/theme';
import { Link, useParams, useLocation } from 'react-router-dom';
import BranchIndex from './branches/branch_index';
import styled from 'styled-components';
import Panel from '../panel';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';
const Segment = styled.div`
  border: 1px solid lightgrey;
  border-top: none;
  border-bottom: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-flow: row;
  background-color: #fff;
  @media (max-width: 900px) {
    margin-bottom: 5vh;
  }
`;
const PanelShow = () => {
  let { panelId } = useParams();
  let { pathname } = useLocation();
  let session = useSelector(state => state.session);
  let dispatch = useDispatch();
  let [liked, setLiked] = useState(false);
  useEffect(() => {
    dispatch(clearPanelState());
    dispatch(clearChildState());
    dispatch(fetchPanel(panelId)).then(action => {
      let p = action.panel.data;
      if (p && p.childIds) {
        if (p.childIds.length > 0) {
          dispatch(fetchChildren(p.childIds));
        }
      }
    });
  }, [dispatch, panelId]);

  let panel = useSelector(state => state.entities.panels[0]);
  let children = useSelector(state => state.entities.childPanels);
  useEffect(() => {
    if (session.isAuthenticated && panel) {
      setLiked(session.user.followedRoots.includes(panel.id));
    }
  }, [panel, session.isAuthenticated, session.user.followedRoots]);

  const handleLike = e => {
    e.preventDefault();
    if (liked) {
      dispatch(unlike({ userId: session.user.id, rootId: panel.id }));
    } else {
      dispatch(like({ userId: session.user.id, rootId: panel.id }));
    }
  };
  return panel ? (
    <Container>
      <Main>
        <Trip style={{ borderBottom: 'none' }}>
          <Panel panel={panel} type="show" />
        </Trip>
        <Segment style={{ height: '50px', marginTop: '-5vh' }}>
          {session.isAuthenticated ? (
            <>
              {liked ? (
                <IoIosHeart onClick={handleLike} />
              ) : (
                <IoIosHeartEmpty onClick={handleLike} />
              )}
              <Link to={`${pathname}/edit`}>
                <FiEdit />
              </Link>
            </>
          ) : null}
        </Segment>
        <Segment>
          <CommentsIndex />
        </Segment>
      </Main>
      {children ? (
        <SideBar>
          <BranchIndex auth={session.isAuthenticated} children={children} />
        </SideBar>
      ) : null}
    </Container>
  ) : null;
};
export default PanelShow;
