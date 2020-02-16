import React, { useState, useEffect } from 'react';
import { login, clearErrors } from '../../actions/session_actions';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import { Form, FormWrapper, Input, Button } from '../../styles/theme'

const AuthStyle = styled.div`
  display: flex;
	flex-direction: column;  
	justify-content: center;
`;

const LoginForm = () => {
  let [form, setForm] = useState({
		email: '',
		password: ''
	});
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(login(form));
  };
  const handleChange = (e, name) => {
		setForm({...form, [name]: e.currentTarget.value});
  };
  const renderErrors = () => {
        return (
          <ul>
            {Object.keys(errors).map((error, i) => (
              <li style={{color: 'red'}} key={`error-${i}`}>
                {errors[error]}
              </li>
            ))}
          </ul>
        );
      }
  useEffect(() => {
    dispatch(clearErrors())
    return function() {
      dispatch(clearErrors())
    }
    
  }, [dispatch])
  return (
    <AuthStyle>
			<h3 style={{textAlign: "center"}}>Login</h3>
			<Form onSubmit={e => handleSubmit(e)}>
				<FormWrapper>
					<Input type="email" placeholder="Email" value={form.email} onChange={(e) => handleChange(e, 'email')} />
					<Input type="password" placeholder="Password" value={form.password} onChange={(e) => handleChange(e, 'password')}  />
					<Button type="submit">Login</Button>
				</FormWrapper>
			</Form>
      {renderErrors()}
    </AuthStyle>
  );
}
export default LoginForm;