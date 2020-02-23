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
  .active {
    opacity: 0.4;
    filter: alpha(opacity=40);
  }
  .thumb-holder {
    cursor: pointer;
  }
  h3 {
    display: flex;
    justify-content: center;
    margin-top: 3px;
    margin-bottom: 3px;
    margin-right: 0;
  }
  @media (max-width: 900px) {
    display: inline-block;
    border: none;
    background-color: transparent;
    .thumb-holder {
      margin: 5px;
      max-width: 100px;
      height: 100px;
    }
    h3 {
      display: none;
    }
  }
`;
const BranchIndexItem = ({ child, i, index, setIndex }) => {
  return (
    <>
      {child ? (
        <BranchDiv>
          <SmallImg
            onClick={() => setIndex(i)}
            className={i === index ? 'active  thumb-holder' : 'thumb-holder'}
          >
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
