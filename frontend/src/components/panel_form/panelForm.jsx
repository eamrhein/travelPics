import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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

const PanelForm = props => {
  const { fetchPanel, formType, currentUser } = props;
  const id = props.match.params.panelId;
  let [panel, setPanel] = useState({
    authorId: currentUser.id,
    title: undefined,
    panelText: undefined,
    photoURL: undefined,
    childId: [],
    parentId: formType === 'branch' ? id : undefined,
    likes: 0,
    rootId: undefined
  });
  let [photoFile, setPhotoFile] = useState(null);
  let prevPanel = useSelector(state => state.entities.panels[0]);

  useEffect(() => {
    if (fetchPanel) {
      fetchPanel(id);
    }
  }, [fetchPanel, id]);
  useEffect(() => {
    if (formType === 'edit') {
      setPanel({ ...prevPanel });
    }
  }, [formType, prevPanel]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (photoFile) {
      let url = await uploadPhoto(photoFile);
      let obj = await {
        ...panel,
        photoURL: url
      };
      sendPanel(obj);
    } else {
      sendPanel(panel);
    }
  }

  function handleChange(e, form) {
    setPanel({
      ...panel,
      [form]: e.target.value
    });
  }

  function sendPanel(obj) {
    props.action(obj).then(
      childPanel => {
        if (props.formType === 'branch') {
          props.fetchPanel(panel.parentId).then(
            parentPanel => {
              parentPanel.panel.data.childIds.push(childPanel.panel.data.id);
              props
                .updatePanel(parentPanel.panel.data)
                .then(() => props.history.push(`/panels/${childPanel.panel.data.id}`));
            },
            err => console.log(err)
          );
        } else {
          props
            .authorRoot({
              userId: props.currentUser.id,
              rootId: childPanel.panel.data.id
            })
            .then(() => {
              props.history.push(`/panels/${childPanel.panel.data.id}`);
            });
        }
      },
      err => console.log(err)
    );
  }

  function photoReader(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () => {
      setPhotoFile(file);
      setPanel({
        ...panel,
        photoURL: reader.result
      });
    };
    if (file && file.type.includes('image')) {
      reader.readAsDataURL(file);
    } else {
      setPhotoFile(file);
      setPanel({
        ...panel,
        photoURL: reader.result
      });
    }
  }

  async function uploadPhoto(photo) {
    let fd = new FormData();
    fd.append('photo', photo);
    let res = await axios.post(`/api/images`, fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    let signedRequest = await res.data;
    return signedRequest;
  }

  let formTitle = props.formType.replace(/^\w/, chr => chr.toUpperCase());
  return (
    <AuthStyle>
      {formTitle === 'Branch' || formTitle === 'Create' ? (
        <h1 style={{ textAlign: 'center' }}>Add Photo</h1>
      ) : (
        <h1 style={{ textAlign: 'center' }}>Edit Photo</h1>
      )}
      <Form className="create-panel-form" onSubmit={handleSubmit}>
        <FormWrapper>
          <Input
            style={{ width: '100%' }}
            type="text"
            onChange={e => handleChange(e, 'title')}
            value={panel.title}
            placeholder="Location"
          />
          <div>
            <Input
              id="file"
              name="photo"
              style={{ display: 'none' }}
              type="file"
              accept="image/png, image/jpeg"
              onChange={photoReader}
            />
            {panel.photoURL ? (
              <label htmlFor="file">
                <Imgpreview>
                  <Img alt={panel.title} src={panel.photoURL} />
                </Imgpreview>
              </label>
            ) : (
              <label htmlFor="file">
                <Imgpreview>Pick a nice picture of the location you traveled to.</Imgpreview>
              </label>
            )}
          </div>
          <textarea
            style={{ marginBottom: '1rem', resize: 'none' }}
            cols="30"
            rows="10"
            onChange={e => handleChange(e, 'panelText')}
            value={panel.panelText}
            placeholder="Describe What Happened"
          />
          <Button type="submit" value={props.formType}>
            Complete
          </Button>
        </FormWrapper>
      </Form>
    </AuthStyle>
  );
};
// }

export default PanelForm;
