import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TripTitle, TripImg, TripComments, Img } from '../../styles/theme';

const Panel = ({ panel }) => {
  let { panelId } = useParams();
  return panel ? (
    <>
      <TripTitle>
        <div className="handle">
          <Link to={`/users/${panel.authorId}`} className="name">{`${panel.authorUsername}`}</Link>
        </div>
        <div className="title">{panel.title}</div>
      </TripTitle>
      <TripImg>
        <Link to={panelId ? `/panels/${panelId}` : `/panels/${panel.id}`}>
          <Img src={panel.photoURL} className="panel-image" alt={panel.panelText} />
        </Link>
      </TripImg>
      <TripComments>
        <p>{panel.panelText}</p>
      </TripComments>
    </>
  ) : null;
};
export default Panel;
