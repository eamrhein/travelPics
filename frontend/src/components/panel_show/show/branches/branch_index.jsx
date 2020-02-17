import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch, Link } from 'react-router-dom';
import { fetchPanels }  from '../../../../actions/panel_actions'
import { AiFillPlusSquare } from 'react-icons/ai'
import BranchIndexItem from './branch_index_item';
import styled from 'styled-components';
let AddPhoto = styled.p`
    display: flex;
    align-items: center;
    margin: 2px 3px 30px 0px;
    font-weight: bolder;
    transition: all 0.2s ease;
`;
const BranchIndex = (props) => {
    let {panel} = props
    let dispatch = useDispatch()
    let {url} = useRouteMatch()
    let [trip, setTrip] = useState(true)
    useEffect(() => {
        if(trip) {
            dispatch(fetchPanels(panel.childIds))
            setTrip(false)
        }
    }, [dispatch, panel.childIds, trip] )
    let [iconColor, setIconColor] = useState('#545454')
    let [opacity, setOpacity] = useState('0.5')
    const hoverEffect = (text) => {
        if(text === 'hover') {
            setOpacity('1')
            setIconColor('#FF3B3F')
        } else {
            setOpacity('0.5')
            setIconColor('#545454')
        }
    }
    return (
        <>
            {
                panel ?
                panel.childIds.map(childId => <BranchIndexItem panelId={childId} key={childId} />)
                : null
            }
            <Link to={url + `/branch`}>
                <AddPhoto 
                    style={{opacity: opacity}} 
                    onMouseEnter={() => hoverEffect('hover')} 
                    onMouseLeave={() => hoverEffect()}>
                    <AiFillPlusSquare style={{color: iconColor, marginRight: '3px'}} /> Add Photo
                </AddPhoto>
            </Link>
        </>
    )
}
// export class BranchIndex extends Component {

//     componentDidMount() {
//         this.props.fetchPanels(this.props.panel.childIds)
//     }

//     componentDidUpdate(prevProps) {
//         if (this.props.panelId !== prevProps.panelId) {
//             this.props.fetchPanels(this.props.panel.childIds)
//         }
//     }

//     render() {

//         return (
           
//             <>
//                 { this.props.panel ?
//                     this.props.panel.childIds.map((childId) => {
//                     return <BranchIndexItem panelId={childId} key={childId}/>
//                 }) :
//                     null
//                 }
//                     <Link to={`${this.props.match.url}/branch`}>
//                         <Plus />
//                         <span>Add Photo</span>
//                     </Link>
//             </>
//         )
//     }
// }

// const mapStateToProps = (state, ownProps) => ({
//     panel: state.entities.panels[ownProps.panelId]
// })

// const mapDispatchToProps = (dispatch) => ({
//     fetchPanels: (arr) => dispatch(fetchPanels(arr))
// })
export default BranchIndex;