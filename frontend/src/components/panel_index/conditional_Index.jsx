import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPanels, clearPanelState } from '../../actions/panel_actions';
import Panel from '../panel_show/panel';
import { Trip } from '../../styles/theme';
const ConditionalIndex = props => {
  let dispatch = useDispatch();
  const panels = useSelector(state => state.entities.panels);
  let { incomingPanels } = props;
  useEffect(() => {
    if (!incomingPanels) {
      dispatch(clearPanelState());
      dispatch(fetchPanels());
    } else if (incomingPanels) {
      dispatch(fetchPanels(incomingPanels));
    }
  }, [dispatch, incomingPanels]);
  return panels.map(panel => (
    <Trip key={panel.id}>
      <Panel panel={panel} />
    </Trip>
  ));
};

export default ConditionalIndex;
