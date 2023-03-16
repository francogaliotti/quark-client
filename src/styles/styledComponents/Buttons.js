import styled from "styled-components";

export const PrimaryButton = styled.button`
  outline: none;
  background-color: rgb(24, 27, 32);
  color: #fff;
  font-size: 17px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 4px 18px;
  transition: all 230ms ease-in-out;
  margin-top: 1em;
  cursor: pointer;
  width: 50%;
  &:hover {
    background-color: transparent;
    border: 2px solid rgb(24, 27, 32);
    color: rgb(24, 27, 32);
  }
`;

export const SecondaryButton = styled.button`
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 17px;
  border: 2px solid rgb(24, 27, 32);
  border-radius: 5px;
  padding: 4px 18px;
  transition: all 230ms ease-in-out;
  margin-top: 1em;
  cursor: pointer;
  width: 50%;
  &:hover {
    background-color: rgb(24, 27, 32);
    border: 2px solid transparent;
    color: transparent;
  }
`;