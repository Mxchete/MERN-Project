// src/components/LoginPage.js
import React from 'react';
import styled from 'styled-components';

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #1db954;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #1db954;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const LoginPage = () => {
  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <LoginPageContainer>
      <LoginForm onSubmit={handleLogin}>
        <FormTitle>Login to Your Account</FormTitle>

        <FormGroup>
          <FormLabel>Email:</FormLabel>
          <FormInput type="email" required />
        </FormGroup>

        <FormGroup>
          <FormLabel>Password:</FormLabel>
          <FormInput type="password" required />
        </FormGroup>

        <FormButton type="submit">Login</FormButton>
      </LoginForm>
    </LoginPageContainer>
  );
};

