import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import {Img, SmallImg} from '../../../../styles/theme'
export class BranchIndexItem extends Component {
    render() {
        return (
            <>
                {this.props.panel ?
                <>
                <Link to={`/panels/${this.props.panelId}`}>
                    <SmallImg className="thumb-holder">
                        <Img
                         className="panel-thumb"
                         src={this.props.panel.photoURL}
                         alt={this.props.panel.title}
                    />
                    </SmallImg>
                </Link>
                <div>
                    {this.props.panel.title}
                </div>
                </>
                :
                "" }
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    panel: state.entities.panels[ownProps.panelId]
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(BranchIndexItem)
