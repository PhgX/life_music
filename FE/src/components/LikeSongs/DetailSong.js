import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import  styled from 'styled-components';

const Container = styled.div `
display: flex;
/* align-items: center; */
justify-content: flex-start;
padding: 20px;
`
const Song = styled.div`
`
const SongImage = styled.img`
width: 60px;
height: 60px;
`
const SongName = styled.span`
margin: 20px;
`
const SongSinger = styled.div`
`
const DetailSong = ({song, trackIndex}) => {
  let {
    name = "",
    file = "",
    image = "",
  } = trackIndex !== -1 ? song[trackIndex] : {};

  return (
     
    <Container>
      <SongImage src={image ? image :"https://images.unsplash.com/photo-1458560871784-56d23406c091?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"} />
      <SongName >{name.slice(0, 15)} </SongName> 
      </Container>
  )
}

export default DetailSong