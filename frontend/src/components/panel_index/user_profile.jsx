import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserProfile } from '../../actions/profile_actions';
import Index from './conditional_Index';
const ProfileShow = ({ type }) => {
  let userSession = useSelector(state => state.session.user);
  let { userId } = useParams();
  let dispatch = useDispatch();
  let [auth, setAuth] = useState(null);
  let [follow, setFollow] = useState(null);
  let [name, setName] = useState(null);
  useEffect(() => {
    if (type === 'user') {
      dispatch(fetchUserProfile(userId)).then(user => {
        setAuth(user.userProfile.data.authoredRoots);
        setName(user.userProfile.data.username);
      });
    } else if (type === 'liked') {
      setFollow(userSession.followedRoots);
    }
  }, [dispatch, type, userId, userSession]);
  return (
    <>
      {type === 'user' && auth ? (
        <>
          <h1>{name}'s trips</h1>
          <Index incomingPanels={auth} />
        </>
      ) : (
        <Index incomingPanels={follow} />
      )}
    </>
  );
};
export default ProfileShow;
