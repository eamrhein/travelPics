import { RECEIVE_PANEL, RECEIVE_PANELS, REMOVE_PANELS } from '../actions/panel_actions';
import { LIKE_POST, UNLIKE_POST } from '../actions/user_actions';

const PanelsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PANEL:
      return [action.panel.data];
    case RECEIVE_PANELS:
      let newData = Object.values(action.panels.data);
      return [...newData];
    case REMOVE_PANELS:
      return [];
    case LIKE_POST:
    case UNLIKE_POST:
      let newState = [...state];
      newState[0] = action.payload.data.panel;
      return newState;
    default:
      return state;
  }
};

export default PanelsReducer;
