import React from 'react';
import { Link } from 'react-router-dom';
import { Trip, TripTitle, TripImg, TripComments, Img } from '../../styles/theme';

const Panel = ({ panel }) => {
  return (
    <Trip id={panel.id}>
      <TripTitle>
        <div className="handle">
          <Link to={`/users/${panel.authorId}`} className="name">{`${panel.authorUsername}`}</Link>
        </div>
        <div className="title">{panel.title}</div>
      </TripTitle>
      <TripImg>
        <Link to={`/panels/${panel.id}`}>
          <Img src={panel.photoURL} className="panel-image" alt={panel.panelText} />
        </Link>
      </TripImg>
      <TripComments>
        <p>{panel.panelText}</p>
      </TripComments>
    </Trip>
  );
};
export default Panel;
