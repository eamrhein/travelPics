import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { like, unlike } from '../../actions/user_actions'

const LikeButton = (props) => {
    let currentUser = useSelector(state => state.session.user)
    let panels = useSelector(state => state.entities.panels)
    let {panelId} = props;
    let session = useSelector(state => state.session)
    let dispatch = useDispatch()
    let [liked, setLiked] = useState(
        currentUser.followedRoots.includes(panelId)
    )
    const handleLike = (e) => {
        e.preventDefault();
        if(session.isAuthenticated) {
            let element = e.target
            if(!element.classList.contains('liked')) {
                dispatch(like({ userId: currentUser.id, rootId: panelId}))
                .then(() => setLiked(true));
            }else {
                dispatch(unlike({ userId: currentUser.id, rootId: panelId}))
                .then(() => setLiked(false));
            } 
        }
    }
    return(
        <div className="like-button-container">
        <i
          className={liked ? 'liked' : ''}
          onMouseUp={handleLike}
          >
          favorite
        </i>
        <span>{panels[panelId].likes || "0"}</span>
      </div>
    )
}

export default LikeButton;
