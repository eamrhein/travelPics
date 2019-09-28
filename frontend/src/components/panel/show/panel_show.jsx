import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchPanel } from '../../../actions/panel_actions';
import { useSwipeable, Swipeable } from 'react-swipeable';

import Panel from '../panel';
import BranchIndex from './branches/branch_index';

export class PanelShow extends Component {

    constructor(props) {
        super(props);
        this.handleSwipe = this.handleSwipe.bind(this);
    }

    componentDidMount() {
        this.props.fetchPanel(this.props.match.params.panelId);
    }

    handleSwipe() {
        if (this.props.panel.parentId) {
            this.props.history.push(`/panels/${this.props.panel.parentId}`);
        }
    }

    render() {

        if (this.props.panel) {
            return (
            <Swipeable onSwiped={this.handleSwipe} className="panel-show">
                    <Panel panelId={this.props.match.params.panelId}/>            
                    <BranchIndex panelId={this.props.match.params.panelId}/>
                    <div>comment index placeholder</div>
            </Swipeable>
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }

    }
}

const mapStateToProps = (state, ownProps) => ({
    panel: state.entities.panels[ownProps.match.params.panelId]
})

const mapDispatchToProps = (dispatch) => ({
    fetchPanel: (panelId) => dispatch(fetchPanel(panelId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PanelShow);
