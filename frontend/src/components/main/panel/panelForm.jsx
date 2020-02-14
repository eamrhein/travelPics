import React, {useState, useEffect} from 'react';
import axios from 'axios';
const PanelForm = (props) => {
  let [panel, setPanel] = useState({
    authorId: '',
    title: '',
    panelText: '',
    photoURL: '',
    childId: [],
    parentId: null,
    likes: 0,
    rootId: null
  })
  let [photoFile, setPhotoFile] = useState(null)

  useEffect(()=> {
    switch (props.formType) {
      case 'edit':
        props.fetchPanel(props.match.params.panelId)
          .then(() => setPanel(props.panels[props.match.params.panelId]))
        break;
      case 'branch':
        props.fetchPanel(props.match.params.panelId)
          .then((panel) => {
            let panelToCheck = panel.panel.data
            if(panelToCheck.rootId === null){
              setPanel({
                ...panel, 
                parentId: props.match.params.panelId,
                rootId: panelToCheck.id })
            } else {
              setPanel({ 
                ...panel,
                parentId: props.match.params.panelId, 
                rootId: panelToCheck.rootId 
              })
            }
          })
        break
      default:
        break;
    }
  }, [props]);
  function handleSubmit(e){
        e.preventDefault();
        getSignedPhotoRequest(photoFile);
      }
  function handleChange(form){
    return function(e) {
      setPanel({
        ...panel,
        [form]: e.target.value
      })
    }
  }
  function sendPanel(){
    panel.authorId = props.currentUser.id;
    props.action(panel)
      .then((childPanel) => {
        if(childPanel.panel.data.parentId && props.formType === 'branch') {
          props.fetchPanel(childPanel.panel.data.parentId)
            .then(parentPanel =>{
              parentPanel.panel.data.childIds.push(childPanel.panel.data.id)
              props.updatePanel(parentPanel.panel.data)
                .then(() => props.history.push(`/panels/${childPanel.panel.data.id}`))
            },
             (err) => console.log(err))
        } else {
          props.authorRoot({ userId: props.currentUser.id, rootId: childPanel.panel.data.id})
            .then(() => {
              props.history.push(`/panels/${childPanel.panel.data.id}`)
            })
        }
      }, (err) => console.log(err))
  }
  function  photoReader(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () => {
      setPanel({
        ...panel,
        photoURL: reader.result
      })
      setPhotoFile(file)
    } 
    if (file && file.type.includes("image")) {
      reader.readAsDataURL(file);
    } else {
      setPanel({
        ...panel,
        photoURL: reader.result
      })
      setPhotoFile(file)
    }
  }
  function getSignedPhotoRequest(photo) {
    const res = axios.get(`/api/images?file-name=${photo.name}&file-type=${photo.type}`)
    .then( res => {
        console.log(res);
        const { signedRequest, url } = res.data;
        uploadFile(photo, signedRequest, url)
      },
      err => console.log(err)
    );
  console.log(res);
  }
  function uploadFile(file, signedRequest, url) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const {title, authorId, panelText, childId, parentId, likes, rootId} = panel;
          setPanel({photoURL: url, title: title, authorId: authorId, panelText: panelText,
          childId: childId, parentId: parentId, likes: likes, rootId: rootId});
          sendPanel();
        }
        else {
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }
  return(
    <div>
      <form className='create-panel-form' onSubmit={handleSubmit}>
        <h1 className='panel-form-title'>{props.formType}</h1>
        <label >
          Title
          <input type="text" onChange={handleChange('title')} />
        </label>
        <label className="image-input">
          <input id="file-input" type="file" onChange={photoReader} />
          <div className="image-input-label">
            upload an image
          </div>
          {panel.photoURL ? (<img src={panel.photoURL} alt={panel.title} className="image-preview" />) : ""}
        </label>
        <label >
          Caption
          <textarea cols="30" rows="10" onChange={handleChange('panelText')} value={panel.panelText}></textarea>
        </label>
        <input type="submit" value={props.formType}/>
    </form>
    </div>
  )
}
// }

export default PanelForm;

