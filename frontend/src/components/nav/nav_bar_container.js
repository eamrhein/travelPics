import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../actions/session_actions';
import NavBar from './nav_bar';

const mapStateToProps = state => ({
  currentUser: state.session.user || { isSignedIn: null },
  authStatus: state.session.isAuthenticated || false
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
