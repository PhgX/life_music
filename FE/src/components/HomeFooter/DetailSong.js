import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: flex;
 
  justify-content: flex-start;
  padding: 20px;
`;
const Song = styled.div``;
const SongImage = styled.img`
  width: 70px;
  height: 70px;
`;
const SongName = styled.span`
  color: palevioletred;
`;
const SongDetail = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  margin-left: 10px;
`;
const SongSinger = styled.div`
  color: palevioletred;
`;
const DetailSong = ({ song, trackIndex }) => {
  let {
    name = "",
    file = "",
    image = "",
    singerName = "",
  } = trackIndex !== -1 ? song[trackIndex] : {};
  return (
    <Container>
      <SongImage
        src={
          image
            ? image
            : "https://images.unsplash.com/photo-1458560871784-56d23406c091?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
        }
      />
      <SongDetail>
        <SongName>{name} </SongName>
        <SongSinger>{singerName}</SongSinger>
      </SongDetail>
    </Container>
  );
};

export default DetailSong;
