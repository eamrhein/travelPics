import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPanels, clearPanelState } from '../../actions/panel_actions';
import Panel from '../panel_show/panel';
import { Trip } from '../../styles/theme';

function arraysEqual(a1, a2) {
  /* WARNING: arrays must not contain {objects} or behavior may be undefined */
  // eslint-disable-next-line eqeqeq
  return JSON.stringify(a1) == JSON.stringify(a2);
}

const ConditionalIndex = props => {
  let dispatch = useDispatch();
  const panels = useSelector(state => state.entities.panels);
  let { incomingPanels } = props;
  let initPanels = useRef(incomingPanels);
  useEffect(() => {
    if (!initPanels.current) {
      dispatch(clearPanelState());
      dispatch(fetchPanels());
    } else if (!arraysEqual(initPanels.current, incomingPanels)) {
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
