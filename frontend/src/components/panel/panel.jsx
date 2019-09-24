import React, { Component } from 'react'
import { connect } from 'react-redux'


export class Panel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shareDrawerOpen: false
        }

        this.handleLike = this.handleLike.bind(this);
        this.handleShare = this.handleShare.bind(this);
        this.copyLink = this.copyLink.bind(this);
    }

    handleLike() {
        //toggle like
    }

    handleShare() {
        this.setState({
            shareDrawerOpen: !!this.state.shareDrawerOpen
        });
        if (this.shareDrawerOpen) {
            this.copyLink();
        }
    }

    copyLink() {
        let link = document.getElementById("panelLink");
        link.select();
        link.setSelectionRange(0, 99999);
        document.execCommand("copy");
    }

    render() {
        return (
            <div>
                <div className="panel-proper">
                    <h2>Panel Title</h2>
                    <figure className="panel-figure">
                        <img src="testpanel.png"></img>
                    </figure>
                    <figcaption>lorem ipsum whatever</figcaption>
                    <ul className="panel-action-buttons">
                        <i className="material-icons">favorite</i>
                        <i className="material-icons">share</i>
                    </ul>
                </div>
                <div className={ this.state.shareDrawerOpen ?
                    "share-drawer open" :
                    "share-drawer"
                }>
                    <span>Link copied to clipboard.</span>
                    <input type="text" value={`${this.props.url}/panels/${this.props.panelId}`} id="panelLink"></input>
                </div>
            </div>
        )
    }
}



const mapStateToProps = (state, ownProps) => ({
    panel: state.entities.panels[ownProps.panelId]
})

const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
