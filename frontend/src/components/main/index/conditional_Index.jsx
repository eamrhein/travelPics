import React from 'react';
import { Main, Container, SideBar, Img} from '../../../styles/theme';
import Panel from '../../panel/panel'

class ConditionalIndex extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      panels : [], 
      panelsIdsToRender : []

    }
    this.rebuildAllPanels= this.rebuildAllPanels.bind(this);
  }

  componentDidMount(){
    this.loadedPanelIds = [];
    if (this.props.ProfilePanels === undefined){
      const { panelIdsToFetch, indexType } = this.props;
      if (panelIdsToFetch.length > 0 || indexType === 'Main' || indexType === 'Like') {
        this.fetchAndLoadPannels(panelIdsToFetch);
      } 
      

    } else if (this.props.indexType === 'Profile') {
      if (this.props.ProfilePanels.length > 0) {
        this.fetchAndLoadPannels(this.props.ProfilePanels)
      }

    }
}
  rebuildAllPanels(){
      let mobilePanels = this.state.panelsIdsToRender
         .map(id => <Panel panel={this.props.panels[id]} key={'panel' + id} />)
         this.setState({panels: mobilePanels});
  }

  fetchAndLoadPannels(idsArr){
    this.props.fetchPanels(idsArr)
      .then(() => {
        let idsToFetchChildren = Object.keys(this.props.panels)
        this.props.fetchChildren(idsToFetchChildren).then(() => {
          this.loadedPanelIds = Object.keys(this.props.panels).reverse()
            //panel object threaded to panel component
          this.setState({ panelsIdsToRender: this.state.panelsIdsToRender.concat(this.loadedPanelIds.splice(0, 7)) }, ()=> {
            this.rebuildAllPanels()
          })
        }); 
      });
    
  }


  componentWillUnmount() {
    this.props.clearPanelState();
    this.props.clearChildState();
  }

  render(){
    return (
      <Container>
        <Main>
            {this.state.panels}
        </Main>
        <SideBar>
          <div className="user" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <div style={{height: '60px' , marginRight: '10px'}}><Img style={{borderRadius: '50%'}} src="https://via.placeholder.com/80" /></div>
            <div className="handle" style={{lineHeight: 0.5}}>
              <p>handle</p>
              <p style={{fontSize: '8pt'}}>First Last</p>
            </div>
          </div>
          <div className="friends">
            Friends
          </div>
        </SideBar>
      </Container>
    );
  }
}

export default ConditionalIndex;

