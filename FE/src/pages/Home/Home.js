import React from "react";
import { Outlet } from "react-router";
import styled from "styled-components";
import Footer from "../../components/Footer/Footer";
import GuestNavbar from "./../../components/GuestNavbar/GuestNavbar";
import GuestSide from "./../../components/GuestSide/GuestSide";
import HomeFooter from './../../components/HomeFooter/HomeFooter';
const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  background-color: #040404;
  display: grid;
  grid-template-rows:10vh 90vh ;
  grid-row-gap: 5px;
  overflow: hidden;
`;

const Body = styled.div`
display: grid;
grid-column-gap: 10px;
grid-template-columns: 15vw 85vw;
overflow: hidden;
  &::-webkit-scrollbar {
    width: 0.7rem;
    &-thumb {
      background-color: rgba(255, 255, 255,0.6);
    }
  }
`
const Home = () => {
  return ( 
  <Container>
   <GuestNavbar />
   <Body>
      <GuestSide />
      <Outlet />
   </Body>
   {/* <HomeFooter /> */}
   {/* <Footer /> */}
  </Container> 
  );
};
export default Home;
