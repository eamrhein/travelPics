import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CommentsIndex from '../comments/comments_index';
import { fetchPanel, clearPanelState } from '../../../actions/panel_actions';
import { fetchChildren } from '../../../actions/children_actions';
import { like, unlike } from '../../../actions/user_actions';
import { Container, Main, SideBar, Trip } from '../../../styles/theme';
import { Link, useParams } from 'react-router-dom';
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
    > div {
      display: none;
    }
  }
`;
const PanelTrip = styled(Trip)`
  border-bottom: none;
`;
const PanelShow = () => {
  let { panelId } = useParams();
  let session = useSelector(state => state.session);
  let dispatch = useDispatch();
  let [liked, setLiked] = useState(false);
  let [index, setIndex] = useState(0);
  useEffect(() => {
    dispatch(clearPanelState());
    dispatch(fetchPanel(panelId)).then(action => {
      let p = action.panel.data;
      if (p && p.childIds) {
        if (p.childIds.length > 0) {
          dispatch(fetchChildren(p.childIds));
        }
      }
    });
  }, [dispatch, panelId]);
  let panels = useSelector(state => state.entities.panels);
  let children = useSelector(state => state.entities.childPanels);

  useEffect(() => {
    if (session.isAuthenticated && panels && panels[0]) {
      setLiked(session.user.followedRoots.includes(panels[0].id));
    }
  }, [index, panels, session.isAuthenticated, session.user]);

  const handleLike = e => {
    e.preventDefault();
    if (liked) {
      dispatch(unlike({ userId: session.user.id, rootId: panels[index].id }));
    } else {
      dispatch(like({ userId: session.user.id, rootId: panels[index].id }));
    }
  };
  return panels[0] ? (
    <Container>
      <Main>
        <PanelTrip>
          <Panel panel={panels[index]} type="show" />
        </PanelTrip>
        <Segment style={{ height: '50px', marginTop: '-5vh' }}>
          {session.isAuthenticated ? (
            <>
              {liked ? (
                <IoIosHeart onClick={handleLike} />
              ) : (
                <IoIosHeartEmpty onClick={handleLike} />
              )}
              <Link to={`${panels[index].id}/edit`}>
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
          <BranchIndex
            auth={session.isAuthenticated}
            panels={panels}
            setIndex={setIndex}
            index={index}
          />
        </SideBar>
      ) : null}
    </Container>
  ) : null;
};
export default PanelShow;
