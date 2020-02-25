import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPanels, clearPanelState } from '../../actions/panel_actions';
import Panel from '../panel_show/panel';
import { Trip } from '../../styles/theme';
import { useLocation } from 'react-router-dom';

const ConditionalIndex = props => {
  let { pathname } = useLocation();
  let dispatch = useDispatch();
  const panels = useSelector(state => state.entities.panels);
  let { incomingPanels } = props;
  useEffect(() => {
    if (incomingPanels === null) {
      dispatch(clearPanelState());
    } else if (incomingPanels) {
      if (incomingPanels.length >= 1) {
        dispatch(clearPanelState());
        dispatch(fetchPanels(incomingPanels));
      }
    }
    if (pathname === '/') {
      dispatch(fetchPanels());
    }
  }, [dispatch, incomingPanels, pathname]);
  return panels.map(panel => (
    <Trip key={panel.id}>
      <Panel panel={panel} />
    </Trip>
  ));
};

export default ConditionalIndex;
