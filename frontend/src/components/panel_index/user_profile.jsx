import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserProfile } from '../../actions/profile_actions';
import Index from './conditional_Index';
const ProfileShow = ({ type }) => {
  let { userId } = useParams();
  let dispatch = useDispatch();
  let [auth, setAuth] = useState(null);
  let [follow, setFollow] = useState(null);
  let [name, setName] = useState(null);
  useEffect(() => {
    if (type === 'user') {
      dispatch(fetchUserProfile(userId)).then(user => {
        setAuth(user.userProfile.data.authoredRoots);
        setFollow(user.userProfile.data.authoredRoots);
        setName(user.userProfile.data.username);
      });
    }
  }, [dispatch, type, userId]);
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
