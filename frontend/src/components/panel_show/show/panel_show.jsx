import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import CommentsIndex from '../comments/comments_index';
import { fetchPanel, clearPanelState } from '../../../actions/panel_actions';
import { Container, Main, SideBar } from '../../../styles/theme';
import { Link, useParams, useLocation } from 'react-router-dom';
import BranchIndex from './branches/branch_index';
import styled from 'styled-components'
import Panel from '../panel';
import LikeButton from '../like_button';
const Segment = styled.div`
    border: 1px solid lightgrey;
    border-top: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-flow: row;
    background-color: #fff;
    @media(max-width: 900px) {
        margin-bottom: 5vh;
    }
`
const PanelShow = (props) => {
    let { panelId } = useParams();
    let {pathname} = useLocation();
    let dispatch = useDispatch();
    let [trip, setTrip] = useState(true);
    useEffect(() => {
        if(trip) {
            dispatch(fetchPanel(panelId))
            setTrip(false)
        }
    },[dispatch, panelId, trip]);
    let user = useSelector(state => state.session.user)
    let panel = useSelector(state => state.entities.panels[panelId])
    return(
        <Container>
            {panel ?
            <>
             <Main>
                <Panel panelId={panelId} type="show" />
                <Segment style={{height: '50px', marginTop: '-5vh'}}>
                    {
                        panel.rootId ?
                            <i className="material-icons root-button"><Link to={`/panels/${panel.rootId}`}>fast_rewind</Link></i> 
                            : null}
                    {
                        panel.parentId ?
                        <i className="material-icons back-button">
                            <Link to={`/panels/${panel.parentId}`}>skip_previous</Link>
                        </i>
                        : null
                    }
                    <LikeButton panelId={panel.id} />
                    {
                        user.id === panel.authorId ?
                        <i className="material-icons edit-button">
                            <Link to={`${pathname}/edit`}>
                                edit
                            </Link>
                        </i>
                        : null
                    }
                </Segment>
                <Segment>
                    <CommentsIndex />
                </Segment>
                </Main>
                <SideBar>
                    <BranchIndex panel={panel}/>
                </SideBar>
            </>
                :
                null
            }
        </Container>
    )
}
Panel.whyDidYouRender = true;
export default PanelShow;
