import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserProfile } from '../../actions/profile_actions';
import Index from './conditional_Index';
const ProfileShow = ({ type }) => {
  let { userId } = useParams();
  let dispatch = useDispatch();
  useEffect(() => {
    if (type === 'user') {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, type, userId]);
  let user = useSelector(state => state.entities.userProfiles);
  return type === 'user' ? (
    <>
      {user[userId] && user[userId].authoredRoots ? (
        <>
          <h1>{user[userId].username}'s trips</h1>
          <Index incomingPanels={user[userId].authoredRoots} />
        </>
      ) : null}
    </>
  ) : (
    <Index incomingPanels={user.followedRoots} />
  );
};
export default ProfileShow;
