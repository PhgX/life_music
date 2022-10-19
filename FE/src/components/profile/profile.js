import React from 'react';
import { Outlet } from "react-router";
import styled from 'styled-components';
import GuestNavbar from '../GuestNavbar/GuestNavbar';
import SideBarProfile from "./sideBarProfile";

const Container=styled.div`
    background-color: #040404;
    
   display: grid;
   grid-template-rows: 10vh 90vh;
    overflow: hidden;
`
const Body = styled.div`
display:grid;
grid-template-columns: 25vw 74vw;
gap : 20px;
`
const Profile = () => {
    return (
        <Container>
            <GuestNavbar />
            <Body>
                <SideBarProfile  />
                <Outlet/>
            </Body>

        </Container>
    );
};

export default Profile;