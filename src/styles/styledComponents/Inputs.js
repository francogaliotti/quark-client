import styled from "styled-components";

export const PrimaryInput = styled.input`
    height: 30px;
    width: 20em;
    font-size: 17px;
    outline: none;
    border-radius: 3px;
    padding: 0 10px;
    @media (max-width: 800px){
        height: 25px;
        font-size: 15px;
        width: 80%
    }
    @media (max-width: 450px){
        height: 22px;
        font-size: 13px;
    }
`