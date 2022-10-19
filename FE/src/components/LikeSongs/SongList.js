import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Dislike from "../Like/Dislike";
import {
  changelikeOrNotStatus,
  getAllLikedSongs,
} from "../../redux/songSlice/songSlice";

const Container = styled.div`
  background-color: whitesmoke;
  position: relative;
  border-radius: 10px;
  overflow: auto;
`;

const Head = styled.div`
  position: relative;
  display: flex;
  height: 310px;
  padding: 2rem;
  background: linear-gradient(transparent 0, rgba(0, 0, 0, 0.4) 100%);
`;
const Navbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Image = styled.img`
  width: 232px;
  height: 232px;
  box-shadow: 0 4px 60px rgb(0 0 0 / 50%);
`;
const PlaylistInfo = styled.div`
  margin-left: 20px;
  flex: 1;
`;
const PlaylistName = styled.h1`
  font-size: 70px;
`;
const PlaylistTitle = styled.h1``;

const Body = styled.div`
  padding: 1rem 3rem;
  display: grid;
  grid-template-columns: 0.2fr 3fr 2fr 0.2fr;
  text-transform: uppercase;
  color: #3b3b3b;
  border-bottom: 1px solid #ccc;
`;
const BodyTitle = styled.p``;

const Song = styled.div``;

const SongItem = styled.div`
  padding: 0.5rem 3rem;
  display: grid;
  font-weight: 500;
  /* color: #fff; */
  grid-template-columns: 0.2fr 3fr 2fr 0.2fr 0.2fr;
  cursor: pointer;
  .col {
    display: flex;
    align-items: center;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
  }
`;

const SongName = styled.span``;
const SongDetail = styled.span`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
const SongSinger = styled.span``;

const SongIndex = styled.span``;

const SongImage = styled.img`
  width: 50px;
  height: 50px;
`;
const SongTime = styled.span``;
const SongInfo = styled.div``;

const Wrapper = styled.div`
  height: 100%;
  background-color: #fff;
  /* background: linear-gradient(rgba(0, 0, 0, 0.5) 0, rgba(0, 0, 0, 0.7) 100%); */
`;

const SongList = ({ song, onTrackSelect }) => {
  const handleClick = (id, index) => {
    onTrackSelect(index);
  };

  return (
    <Container>
      <Head>
        <Navbar>
          <Image src="https://images.unsplash.com/photo-1458560871784-56d23406c091?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" />
          <PlaylistInfo>
            <PlaylistTitle>Playlist</PlaylistTitle>
            <PlaylistName>Những bài hát yêu thích</PlaylistName>
          </PlaylistInfo>
        </Navbar>
      </Head>
      <Wrapper>
        <Body>
          <BodyTitle></BodyTitle>
          <BodyTitle>Bài hát</BodyTitle>
          <BodyTitle></BodyTitle>
          <BodyTitle>
            <AccessTimeIcon />
          </BodyTitle>
        </Body>
        <Song>
          {song.length > 0 &&
            song.map((item, index) => (
              <SongItem
                key={item._id}
                onClick={() => handleClick(item._id, index)}
              >
                <SongIndex className="col">{index + 1}</SongIndex>
                <SongInfo className="col">
                  <SongImage src={item.image} />
                  <SongDetail>
                    <SongName>{item.name.slice(0, 15)}</SongName>
                    <SongSinger>{item.singerName}</SongSinger>
                  </SongDetail>
                </SongInfo>
                <SongName className="col">{item.album}</SongName>
                <Dislike songId={item._id} likeId={item.like} />
                <SongTime className="col">{item.duration}</SongTime>
              </SongItem>
            ))}
        </Song>
      </Wrapper>
    </Container>
  );
};

export default SongList;
