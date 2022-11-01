import React from 'react'
import styled from 'styled-components'

const NavbarContainer = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    background-color: azure;
    position: fixed;
    top: 0;
`

function Navbar() {
  return (
    <NavbarContainer>
        Algo
    </NavbarContainer>
  )
}

export default Navbar