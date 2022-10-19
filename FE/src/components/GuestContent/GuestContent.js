import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// import { style } from "@mui/material/styles";
import {
  getAllPlaylist,
  getRandomPlaylist,
} from "./../../redux/playlistSlice/playlistAdmin";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Slider from "./../Slider/Slider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { InstallDesktopSharp } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { getSongRandom } from "./../../redux/songSlice/songSlice";
import {useState} from "react";
import DetailSong from "../HomeFooter/DetailSong";
import Audios from "../HomeFooter/Audio";

const Total = styled.div`
  display: grid;
  grid-template-rows: 75vh 15vh;

`;
const Container = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  padding: 24px 24px 0;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.8rem;
    border-radius: 10px;
    &-thumb {
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
  background: linear-gradient(
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.1)
  );
`;
const Footer = styled.div`
  background-color: black;
  display: grid;
  grid-template-columns: 1fr 2fr;
`;
const Wrapper = styled.div``;

const Top = styled.div``;
const TopTitle = styled.h1`
  margin-bottom: 20px;
  color: var(--primary-white);
  display: flex;
  align-items: start;
`;
const ListMe = styled.div``;
const ListMeImg = styled.img`
  max-height: 100%;
`;
const ListMeTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
`;

const Categories = styled.div`
  margin-top: 20px;
`;
const Playlist = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin-top: 30px;
  .playlist-item {
    text-decoration: none;
  }
`;
const PlaylistItem = styled.div`
  width: 100%;
  height: 280px;
  background-color: rgba(255, 255, 255, 0.05);

  border-radius: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  -webkit-box-shadow: 0px 0px 5px 3px rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 5px 3px rgba(255, 255, 255, 0.1);
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
const PlaylistImage = styled.img`
  width: 159px;
  height: 159px;
  border-radius: 5px;
  object-fit: cover;

`;
const PlaylistTitle = styled.p`
  color: #fff;
  font-size: 16px;
  display: block;
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: break-word;
  /* padding: 10px 0; */
`;
const PlaylistSinger = styled.span`
  padding: 10px 0;
  font-size: 14px;
  color: #a7a7a7;
`;
const Header = styled.div`
  height: 250px;
  margin-bottom: 40px;
 
`;

const NewSong = styled.div`
  display: grid;
  width: 100%;
  margin-top: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;
const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 10px;
  flex: 1;
`;
const SongItem = styled.div`
  background-color: transparent;

  display: flex;
  justify-items: center;
  align-items: center;
  color: #fff;
  height: 80px;
  cursor: pointer;
  .move-icon {
    display: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    .move-icon {
      display: block;
      backgroundcolor: "#fff";
    }
  }
`;

const SongImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-left: 10px;
  object-fit: cover;

`;
const SongName = styled.span`
  display: flex;
`;
const SongSinger = styled.span``;

const GuestContent = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idPop = open ? "simple-popover" : undefined;
  const playlistAdmin = useSelector(
    (state) => state.playlistAdmin.playlistAdmin
  );
  const { id } = useParams();
  const playlistRandom = useSelector(
    (state) => state.playlistAdmin.playlistRandom
  );

  const songRandom = useSelector((state) => state.song.songRandom)
  const dispatch = useDispatch();
  const [trackIndex, setTrackIndex] = useState(-1)
  const handleClickSong = (id, index) => {
    setTrackIndex(index);
  };
  useEffect(() => {
    dispatch(getAllPlaylist());
  }, [id]);

  useEffect(() => {
    dispatch(getRandomPlaylist());
  }, []);

  useEffect(() => {
    dispatch(getSongRandom());

  }, []);

  return (
      <Total>
    <Container>
      <Wrapper>
        <Header>
        <TopTitle>Sản phẩm sắp phát hành</TopTitle>
          <Slider  />
        </Header>
        <Top>
          <TopTitle>Có thể bạn muốn nghe</TopTitle>
          <NewSong>
          {
            songRandom && songRandom.map((song, index) => (
              <SongItem key={song._id} onClick={() => handleClickSong(song._id, index)}>
              <SongImg src={song.image} />
              <SongInfo>
                <SongName>{song.name}</SongName>
                <SongSinger>{song.singerName}</SongSinger>
              </SongInfo>
              <IconButton>
                <MoreVertIcon
                  className="move-icon"
                  aria-describedby={idPop}
                  variant="contained"
                  onClick={handleClick}
                />
              </IconButton>
            </SongItem>
            )

            )
          }
           
          </NewSong>
          <Popover
            id={InstallDesktopSharp}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
          </Popover>
        </Top>
        <Categories>
          <TopTitle>Đề xuất cho bạn</TopTitle>
          <Playlist>
            {playlistRandom &&
              playlistRandom.map((playlist) => (
                <PlaylistItem key={playlist._id}>
                  <NavLink
                    className="playlist-item"
                    to={`playlists/${playlist._id}`}
                  >
                    <PlaylistImage src={playlist.image} />
                    <PlaylistTitle> {playlist.name}</PlaylistTitle>
                    <PlaylistSinger>{playlist.singer}</PlaylistSinger>
                  </NavLink>
                </PlaylistItem>
              ))}
          </Playlist>
        </Categories>
        <Categories>
          <TopTitle>Chào buổi sáng</TopTitle>
          <Playlist>
            {playlistAdmin &&
              playlistAdmin.map((playlist) => (
                <PlaylistItem key={playlist._id}>
                  <NavLink
                    className="playlist-item"
                    to={`playlists/${playlist._id}`}
                  >
                    <PlaylistImage src={playlist.image} />
                    <PlaylistTitle> {playlist.name}</PlaylistTitle>
                    <PlaylistSinger>{playlist.singer}</PlaylistSinger>
                  </NavLink>
                </PlaylistItem>
              ))}
          </Playlist>
        </Categories>
      </Wrapper>
    </Container>
        {
          songRandom &&
            <Footer>
              <DetailSong song = {songRandom}  trackIndex={trackIndex}/>
              <Audios song={songRandom} trackIndex={trackIndex} setTrackIndex={setTrackIndex} />
            </Footer>
        }
      </Total>
  );
};

export default GuestContent;
