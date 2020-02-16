import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {fetchUserProfile} from '../../actions/profile_actions';
import Index from './conditional_Index';
const ProfileShow = () => {
  let {userId} = useParams()
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserProfile(userId))
  },[dispatch, userId])
  let user = useSelector(state => state.entities.userProfiles)[userId] || { authoredRoots: []}
  return(
  <>
     <h1>{user.username}'s trips</h1>
     {user.authoredRoots.length > 0 ?(<Index ProfilePanels={user.authoredRoots} />) : ''}
  </>
  )
}
export default ProfileShow;