import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useRouteMatch} from 'react-router-dom'
import { fetchPanels, clearPanelState } from '../../actions/panel_actions';
import Panel from '../panel_show/panel'

const ConditionalIndex = (props) => {
  let {path} = useRouteMatch();
  let dispatch = useDispatch()
  const panels = useSelector(state => state.entities.panels)
  const userIds = useSelector(state => state.session.user.followedRoots);
  const { ProfilePanels } = props
  const renderPanels = () => (
    Object.keys(panels).reverse()
      .map((id) => <Panel panel={panels[id]} key={id} />)
      .slice(0, 7)
  )
  useEffect(() => {
    if(ProfilePanels){
      dispatch(fetchPanels(ProfilePanels))
    }else if(path.includes('users') || path.includes('liked')){
      dispatch(fetchPanels(userIds))
    } else {
      dispatch(fetchPanels())
    }
    return function(){
      dispatch(clearPanelState())
    }
  },[ProfilePanels, dispatch, path, userIds])
  return(
    <>
      {renderPanels()}
    </>  
 
  );
}

export default ConditionalIndex;

