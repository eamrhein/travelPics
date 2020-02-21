import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPanels, clearPanelState } from '../../actions/panel_actions';
import Panel from '../panel_show/panel';

const ConditionalIndex = props => {
  let dispatch = useDispatch();
  const panels = useSelector(state => state.entities.panels);
  const { incomingPanels } = props;
  useEffect(() => {
    dispatch(clearPanelState());
    if (incomingPanels) {
      dispatch(fetchPanels(incomingPanels));
    } else {
      dispatch(fetchPanels());
    }
  }, [dispatch, incomingPanels]);
  return panels.map(panel => <Panel panel={panel} key={panel.id} />);
};

export default ConditionalIndex;
