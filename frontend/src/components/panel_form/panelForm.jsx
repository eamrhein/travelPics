import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import styled from 'styled-components';
import { Form, FormWrapper, Input, Button, Img } from '../../styles/theme';
import axios from 'axios';

const AuthStyle = styled.div`
  	display: flex;
	flex-direction: column;  
	justify-content: center;
`;
const Imgpreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 400px;
  max-height: 500px;
  max-width: 500px;
	cursor: pointer;
	margin-bottom: 1rem;
  background-color: white;
  object-fit: cover;
`;

const PanelForm = (props) => {
  const {fetchPanel, formType} = props;
  const id = props.match.params.panelId
  let [panel, setPanel] = useState({
    authorId: '',
    title: '',
    panelText: '',
    photoURL: null,
    childId: [],
    parentId: formType==="branch" ? id : null,
    likes: 0,
    rootId: null
  })
  let [photoFile, setPhotoFile] = useState(null)

  let prevPanel = useSelector(state => state.entities.panels[id])
  useEffect(()=> {
    if(fetchPanel) {
      fetchPanel(id)
    };
  }, [fetchPanel, id]);
  useEffect(() =>{
      if(formType === 'edit'){
        setPanel({...prevPanel});
      }
  }, [formType, prevPanel])

  function handleSubmit(e){
        e.preventDefault();
        if(photoFile) {
          getSignedPhotoRequest(photoFile);
        } else {
          sendPanel()
        }
  }

  function handleChange(e, form){
      setPanel({
        ...panel,
        [form]: e.target.value
      })
  }

  function sendPanel(){
    panel.authorId = props.currentUser.id;
    props.action(panel)
      .then((childPanel) => {
        if(props.formType === 'branch') {
          props.fetchPanel(panel.parentId)
            .then(parentPanel =>{
              parentPanel.panel.data.childIds.push(childPanel.panel.data.id)
              props.updatePanel(parentPanel.panel.data)
                .then(() => props.history.push(`/panels/${childPanel.panel.data.id}`))
            },
             (err) => console.log(err))
        } else{
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
  
  let formTitle =  props.formType
  .replace(/^\w/, chr => chr.toUpperCase())
  return(
    <AuthStyle>
      <h1 style={{textAlign: "center"}}>
        {
         formTitle
        } Trip
        </h1>
      <Form className='create-panel-form' onSubmit={handleSubmit}>
        <FormWrapper>
          <Input
            style={{width: '100%'}}
            type="text"
            onChange={(e) => handleChange(e, 'title')}
            value={panel.title}
            placeholder="Location"
          />
          <div>
						<Input
							id="file"
							style={{display: 'none'}} 
							type="file"
							accept="image/png, image/jpeg"
							onChange={photoReader}/>
						{panel.photoURL ? 
							<label htmlFor="file">
								<Imgpreview>
									<Img alt={panel.title} src={panel.photoURL}  />
								</Imgpreview> 
							</label>:
							<label htmlFor="file">
								<Imgpreview>
							    Pick a nice picture of the location you traveled to.
								</Imgpreview>
							</label> }
              </div>
              <textarea 
                style={{marginBottom: '1rem', resize: 'none'}}
                cols="30" rows="10" 
                onChange={(e) => handleChange(e,'panelText')} 
                value={panel.panelText}
                placeholder="Describe What Happened"
              />
              <Button type="submit" value={props.formType}>Complete</Button>
            </FormWrapper>
    </Form>
    </AuthStyle>
  )
}
// }

export default PanelForm;

