import React, { useState } from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  border: solid #8e44ad;
  padding: 40px;
  border-radius: 10px;
`;

const SingleField = styled.div`
    display: flex;
    gap: 5px;
`

const FormLabel = styled.label`

`;

const FormInput = styled.input`
  height: 30px;
  width: 20em;
  font-size: 17px;
  outline: none;
  border-radius: 3px;
  padding: 0 10px;
`;

const FormButton = styled.button`
  width: 70%;
  outline: none;
  background-color: #8e44ad;
  color: #fff;
  font-size: 17px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 4px 18px;
  transition: all 230ms ease-in-out;
  margin-top: 1em;
  cursor: pointer;
  &:hover {
    background-color: transparent;
    border: 2px solid #8e44ad;
    color: #8e44ad;
  }
`;

function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({
            name: username,
            password: password,
            LoggedIn: true
        }))
    }


    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
                <SingleField>
                    <FormLabel>Username: </FormLabel>
                    <FormInput
                        placeholder='Username'
                        onChange={(event) => { setUsername(event.target.value) }}
                    />
                </SingleField>
                <SingleField>
                    <FormLabel>Password: </FormLabel>
                    <FormInput
                        type="password"
                        placeholder='Password'
                        onChange={(event) => { setPassword(event.target.value) }}
                    />
                </SingleField>
                <FormButton type='submit'>Login </FormButton>
        </FormContainer>
    )
}

export default LoginPage