import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Like from "../Like/like";



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
const PlaylistAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
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

  grid-template-columns: 0.2fr 3fr 2fr 0.5fr 0.2fr;
  cursor: pointer;
  .col {
    display: flex;
    align-items: center;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const SongName = styled.span`
font-size:20px;
font-weight:500;
`;
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
  object-fit: cover;
`;
const SongTime = styled.span``;
const SongInfo = styled.div``;

const Wrapper = styled.div`
  height: 100%;
  /* background: linear-gradient(rgba(0, 0, 0, 0.5) 0, rgba(0, 0, 0, 0.7) 100%); */
`;
const SongList = ({ song, onTrackSelect }) => {
  const isLoggedInUser = useSelector(state => state.user.user )
  let allLikedSongs = useSelector((state) => state.song.getAllLikedSongs)
  const isLoggedIn = !!isLoggedInUser._id;
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
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
              <PlaylistName>Danh sách bài hát</PlaylistName>
            </PlaylistInfo>
          </Navbar>
      
      </Head>
      <Wrapper>
        <Body>
          <BodyTitle></BodyTitle>
          <BodyTitle>Tên bài hát</BodyTitle>
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
                {!isLoggedIn && (
                  <SongName className="col">{item.album}</SongName>
                )}

                {
                  isLoggedIn && ( <Like track={item} allLikedSongs={allLikedSongs} />)
                }
               
                <SongTime className="col">{item.duration}</SongTime>
              </SongItem>
            ))}
        </Song>
      </Wrapper>
    </Container>
  );
};

export default SongList;
