import React, { useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { AiFillPlusSquare } from 'react-icons/ai';
import BranchIndexItem from './branch_index_item';
import styled from 'styled-components';
let AddPhoto = styled.p`
  display: flex;
  align-items: center;
  margin: 2px 3px 30px 0px;
  font-weight: bolder;
  transition: all 0.2s ease;
`;
const BranchIndex = ({ children, auth }) => {
  let { url } = useRouteMatch();
  let [iconColor, setIconColor] = useState('#545454');
  let [opacity, setOpacity] = useState('0.5');
  const hoverEffect = text => {
    if (text === 'hover') {
      setOpacity('1');
      setIconColor('#FF3B3F');
    } else {
      setOpacity('0.5');
      setIconColor('#545454');
    }
  };
  return (
    <>
      {children ? children.map(child => <BranchIndexItem child={child} key={child.id} />) : null}
      {auth ? (
        <Link to={url + `/branch`}>
          <AddPhoto
            style={{ opacity: opacity }}
            onMouseEnter={() => hoverEffect('hover')}
            onMouseLeave={() => hoverEffect()}
          >
            <AiFillPlusSquare style={{ color: iconColor, marginRight: '3px' }} /> Add Photo
          </AddPhoto>
        </Link>
      ) : null}
    </>
  );
};
export default BranchIndex;
