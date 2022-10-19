import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import {
  getPlaylistById,
  getSongToPlaylist
} from "../../redux/playlistSlice/currentPlaylist";
import { getAllLikedSongs } from "../../redux/songSlice/songSlice";
import Audios from "../HomeFooter/Audio";
import DetailSong from "../HomeFooter/DetailSong";
import Like from "../Like/like";
const Total = styled.div`
  display: grid;
  grid-template-rows: 75vh 15vh;
`;
const Container = styled.div`
  background-color: whitesmoke;
  position: relative;
  border-radius: 10px;
  overflow: auto;
`;

const Head = styled.div`
  position: relative;
  display: flex;
  height: 250px;
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
  /* box-shadow: 0 4px 60px rgb(0 0 0 / 50%); */
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
  /* color: #fff; */
  grid-template-columns: 0.2fr 3fr 2fr 0.2fr 0.2fr;
  .col {
    display: flex;
    align-items: center;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
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
  object-fit: cover;
`;
const SongTime = styled.span``;
const SongInfo = styled.div``;

const Wrapper = styled.div`
  height: 100%;
  /* background: linear-gradient(rgba(0, 0, 0, 0.5) 0, rgba(0, 0, 0, 0.7) 100%); */
`;
const Footer = styled.div`
  background-color: black;
  display: grid;
  grid-template-columns: 1fr 2fr;
`;
const PlaylistAdmin = () => {
  const { id } = useParams();
  const isLoggedInUser = useSelector((state) => state.user.user);
  let allLikedSongs = useSelector((state) => state.song.getAllLikedSongs);
  const isLoggedIn = !!isLoggedInUser._id;
  const currentPlaylist = useSelector(
    (state) => state.currentPlaylist.playlist
  );
  const currentSong = useSelector(
    (state) => state.currentPlaylist.playlistAdmin
  );

  const dispatch = useDispatch();
  const [trackIndex, setTrackIndex] = useState(-1);
  const handleClick = (id, index) => {
    setTrackIndex(index);
  };
  useEffect(() => {
    dispatch(getPlaylistById(id));
  }, [id]);

  useEffect(() => {
    dispatch(getSongToPlaylist(id));
    dispatch(getAllLikedSongs(isLoggedInUser._id));
  }, []);

  return (
    <Total>
      <Container>
        <Head>
          {currentPlaylist && (
            <Navbar>
              <Image src={currentPlaylist.image} />
              <PlaylistInfo>
                <PlaylistTitle>Playlist</PlaylistTitle>
                <PlaylistName>{currentPlaylist.name}</PlaylistName>
              </PlaylistInfo>
            </Navbar>
          )}
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
            {isLoggedIn &&
              currentSong &&
              currentSong.map((song, index) => (
                <SongItem onClick={() => handleClick(song._id, index)}>
                  <SongIndex className="col">{index + 1}</SongIndex>
                  <SongInfo className="col">
                    <SongImage src={song.image} />
                    <SongDetail>
                      <SongName>{song.name}</SongName>
                      <SongSinger>{song.singerName}</SongSinger>
                    </SongDetail>
                  </SongInfo>
                  <SongName className="col">{song.album}</SongName>
                  <Like track={song} allLikedSongs={allLikedSongs}/>
                  <SongTime className="col">{song.duration}</SongTime>
                </SongItem>
              ))}
            {!isLoggedIn &&
              currentSong &&
              currentSong.map((song, index) => (
                <SongItem onClick={() => handleClick(song._id, index)}>
                  <SongIndex className="col">{index + 1}</SongIndex>
                  <SongInfo className="col">
                    <SongImage src={song.image} />
                    <SongDetail>
                      <SongName>{song.name}</SongName>
                      <SongSinger>{song.singerName}</SongSinger>
                    </SongDetail>
                  </SongInfo>
                  <SongName className="col">{song.album}</SongName>
                  <SongName className="col"></SongName>
                  <SongTime className="col">{song.duration}</SongTime>
                </SongItem>
              ))}
          </Song>
        </Wrapper>
      </Container>
      {currentSong && (
        <Footer>
          <DetailSong song={currentSong} trackIndex={trackIndex} />
          <Audios
            song={currentSong}
            trackIndex={trackIndex}
            setTrackIndex={setTrackIndex}
          />
        </Footer>
      )}
    </Total>
  );
};

export default PlaylistAdmin;
