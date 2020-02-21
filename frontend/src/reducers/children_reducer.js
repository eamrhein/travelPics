import { RECEIVE_CHILDREN, CLEAR_CHILDREN } from '../actions/children_actions';

const ChildrenReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CHILDREN:
      return Object.values(action.panels.data.children);
    case CLEAR_CHILDREN:
      return [];
    default:
      return state;
  }
};
export default ChildrenReducer;
