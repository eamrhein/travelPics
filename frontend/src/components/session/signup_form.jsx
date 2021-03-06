import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { signup, clearErrors } from '../../actions/session_actions';
import { Form, FormWrapper, Input, Button } from '../../styles/theme';

const AuthStyle = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const SignupForm = () => {
  let [form, setForm] = useState({
    first: '',
    last: '',
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearErrors());
    return function() {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const errors = useSelector(state => state.errors.session);
  const renderErrors = () => {
    return (
      <ul>
        {Object.keys(errors).map((error, i) => (
          <li style={{ color: 'red' }} key={`error-${i}`}>
            {errors[error]}
          </li>
        ))}
      </ul>
    );
  };
  const handleChange = (e, name) => {
    setForm({ ...form, [name]: e.currentTarget.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signup(form));
  };
  return (
    <AuthStyle>
      <h3>Signup</h3>
      <Form onSubmit={e => handleSubmit(e)}>
        <FormWrapper>
          <Input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={e => handleChange(e, 'username')}
          />
          <Input
            type="text"
            placeholder="First"
            value={form.first}
            onChange={e => handleChange(e, 'first')}
          />
          <Input
            type="text"
            placeholder="Last"
            value={form.last}
            onChange={e => handleChange(e, 'last')}
          />
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => handleChange(e, 'email')}
          />
          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => handleChange(e, 'password')}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={form.password2}
            onChange={e => handleChange(e, 'password2')}
          />
          <Button type="submit">Signup</Button>
        </FormWrapper>
        {renderErrors()}
      </Form>
    </AuthStyle>
  );
};

export default SignupForm;
