import React from 'react';
import { Img, SmallImg } from '../../../../styles/theme';
import styled from 'styled-components';
let BranchDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background-color: white;
  border: 1px solid lightgray;
  margin-bottom: 1rem;
`;
const BranchIndexItem = ({ child }) => {
  return (
    <>
      {child ? (
        <BranchDiv>
          <h3
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '3px',
              marginBottom: '3px',
              marginRight: '0'
            }}
          >
            {child.title}
          </h3>
          <SmallImg className="thumb-holder">
            <Img className="panel-thumb" src={child.photoURL} alt={child.title} />
          </SmallImg>
        </BranchDiv>
      ) : (
        ''
      )}
    </>
  );
};

export default BranchIndexItem;
