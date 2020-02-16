import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {Img, SmallImg} from '../../../../styles/theme'
import styled from 'styled-components'
let BranchDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    background-color: white;
    border: 1px solid lightgray;
    margin-bottom: 1rem;
` ;
const BranchIndexItem = (props) => {
    let panel = useSelector(state => state.entities.panels[props.panelId])
    return (
        <>
        {panel ?
        <BranchDiv>
        <h3 style={{display: 'flex', justifyContent: 'center', marginTop: '3px', marginBottom: '3px', marginRight: '0'}}>
            {panel.title}
        </h3>
        <Link to={`/panels/${props.panelId}`}>
            <SmallImg className="thumb-holder">
                <Img
                 className="panel-thumb"
                 src={panel.photoURL}
                 alt={panel.title}
            />
            </SmallImg>
        </Link>
        </BranchDiv>
        :
        "" }
    </>
    )
}

export default BranchIndexItem
