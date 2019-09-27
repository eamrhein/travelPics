import React, { Component } from 'react'
import { connect } from 'react-redux'
import RouteIndexItem from './route_index_item';

export class RouteIndex extends Component {
    render() {
        return (
            <ul>
                
                { this.props.panel.childIds ?
                    this.props.panel.childIds.map((panelId) => {
                    return <RouteIndexItem panelId={panelId} />
                }) :
                    ""
                }
            </ul>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    panel: state.entities.panels[ownProps.panelId]
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteIndex)