import styled from "styled-components";
import { useState, useEffect, Fragment } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaylistModel from "./PlaylistModel";
import { useDispatch, useSelector } from "react-redux";
import {fetchSong, getSongsByPlaylistId} from "../../redux/songSlice/songSlice";
import { useNavigate, useParams} from "react-router";
import {
  deletePlaylist,
  getPlaylistById,
  getSongToPlaylist,
  removeSongFromPlaylist
} from "../../redux/playlistSlice/currentPlaylist";
import SongPlaylist from "../SongInPlaylist/SongPlaylist";
import {unwrapResult} from "@reduxjs/toolkit";
import {useSnackbar} from "notistack";
import DetailSong from "../HomeFooter/DetailSong";
import Audio from "../HomeFooter/Audio";
import React from "react";
import Swal from "sweetalert2";
const Total = styled.div`
  display: grid;
  grid-template-rows: 75vh 15vh;
`
const Container = styled.div`
  background-color: whitesmoke;
  position: relative;
  border-radius: 10px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.8rem;
    border-radius: 10px;
    &-thumb {
      background-color: rgba(255, 255, 255,0.6);
    }
  }
`;
const Head = styled.div`
  position: relative;
  display: flex;
  height: 250px;
  padding: 2rem;
  background: linear-gradient(transparent 0, rgba(0, 0, 0, 0.4) 100%);

  .head_gradient {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: linear-gradient(transparent 0, rgba(0, 0, 0, 0.4) 100%);
  }

  img {
    width: 200px;
    height: 200px;
    box-shadow: 0 4px 60px rgb(0 0 0 / 50%);
  }

  .playlist_info {
    align-self: flex-end;
    margin-left: 2rem;

    h1 {
      font-size: 6rem;
      margin: 0;
    }

    p {
      font-size: 1.4rem;
      margin: 0;
      text-transform: uppercase;
    }

    span {
      font-size: 1.4rem;
    }
  }
`;

const Body = styled.div`
  padding: 1rem 3rem;

  .body_nav {
    display: grid;
    justify-content: space-between;
    padding: 0.5rem 0;
    color: var(--light-white);
    font-size: 1.2rem;
    text-transform: uppercase;
    border-bottom: 1px solid var(--light-white);
    margin-bottom: 1rem;
    grid-template-columns: 1fr 1fr 1fr;

    .left {
      display: flex;
      flex: 1;
      padding-left: 2rem;

      span {
        margin-right: 1.5rem;
      }

      p {
        margin: 0;
      }
    }

    .center {
      flex: 1;
      display: flex;
      justify-content: center;

      p {
        margin: 0;
      }
    }

    .right {
      flex: 1;
      display: flex;
      justify-content:center;
      padding-right: 3rem;
      svg {
        width: 2rem;
        height: 2rem;
        align-content: center;
      }
    }
  }
`;

const Navbar = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
`;
const Image = styled.img`
 width: 200px;
    height: 200px;
    box-shadow: 0 4px 60px rgb(0 0 0 / 50%);
`
const PlaylistInfo = styled.div`
margin-left: 20px;
flex:1;
`
const PlaylistName = styled.h1`
font-size:50px;
`
const PlaylistTitle = styled.h1`

`
const PlaylistAction = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
`
const Footer = styled.div`
height: 20%;
  background-color: #333;
display: grid;
grid-template-columns: 1fr 2fr;
`
const Playlist = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const songs = useSelector((state) => state.song.songs);
  console.log('songs ', songs)
  const currentPlaylist = useSelector(
    (state) => state.currentPlaylist.playlist
  );
  const currentSong = useSelector(
      (state) => state.currentPlaylist.playlistAdmin
  );
  console.log('currentSong ', currentSong)
  const [model, setModel] = useState(false);
  const [playAudio,setPlayAudio]=useState(true)
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlaylistById(id));
  }, [id]);
  useEffect(()=> {
    dispatch(getSongToPlaylist(id))
  },[id]);
  useEffect(() => {
    dispatch(fetchSong())
  },[])
  const [trackIndex, setTrackIndex] = useState(-1)
  const onTrackSelect = (index)=> {
    setTrackIndex(index)
  }
  const handleDeletePlaylist = async () => {
    try {
      Swal.fire({
        title: 'Bạn có chắc muốn xoá Playlist?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'grey',
        cancelButtonColor: '#d33',
        confirmButtonText: ' Tôi Chắc chắn',
        cancelButtonText: 'Tôi nghĩ lại rồi'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const action = await deletePlaylist(currentPlaylist._id,navigate)
          const resultAction = await dispatch(action);
          const user = unwrapResult(resultAction);
          enqueueSnackbar('Xoá playlist thành công', {variant: "success"});
          Swal.fire(
              'Đã Xoá'
          )
          navigate("/")
          // setTimeout(window.location.reload(),  20000)
        }
      })

    } catch (error) {
      console.log('handleDeletePlaylist ', error);
      enqueueSnackbar(error.message, {variant: "error"});
    }
  };
  const handleRemoveSong = async (songId) => {
    const payload = { playlistId: currentPlaylist._id, songId };
    try {
      const action = await removeSongFromPlaylist({payload})
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      enqueueSnackbar('Xoá bài hát khỏi playlist thành công', {variant: "success"});
      setTimeout(window.location.reload(),5000)
    } catch (error) {
      console.log('handleRemoveSong ', error);
      enqueueSnackbar(error.message, {variant: "error"});
    }

  };

  return (
      <Total>
    <Container>
      <Fragment>
        {currentPlaylist && (
          <Head>
            <Navbar>
              <Image  src={currentPlaylist.image}/>
              <PlaylistInfo>
                <PlaylistTitle>Playlist</PlaylistTitle>
                <PlaylistName>{currentPlaylist.name}</PlaylistName>
                <span>{currentPlaylist.description}</span>
              </PlaylistInfo>
              <PlaylistAction>
              <IconButton onClick={() => setModel(true)}>
                <EditIcon  sx={{width: '40px', height: "40px"}}/>
              </IconButton>
              <IconButton onClick={handleDeletePlaylist}>
                <DeleteIcon sx={{width: '40px', height: "40px"}} />
              </IconButton>
              </PlaylistAction>
            </Navbar>
          </Head>
        )}
        <Body>
          <div className={"body_nav"}>
            <div className={"left"}>
              <span>#</span>
              <p>Tên bài hát</p>
            </div>
            <div className={"center"}>
              <p>Ca sỹ</p>
            </div>
            <div className={"right"}>
              <AccessTimeIcon />
            </div>
          </div>
          {currentSong && currentSong.map((song) => (
              <Fragment key={song._id} >
                <SongPlaylist
                    song={song}
                    currentPlaylist={currentPlaylist}
                    handleRemoveSong={handleRemoveSong}
                    // onTrackSelect={onTrackSelect}
                />
              </Fragment>
          ))}
          <hr/>
          <h3 style={{ paddingTop:30, fontSize:30}}>Bài Hát Đề Xuất</h3>
          {songs.map((song,index) => (
              <Fragment key={song._id}>
                <SongPlaylist
                    index={index}
                    song={song}
                    playlist={currentPlaylist}
                    handleRemoveSong={handleRemoveSong}
                    onTrackSelect={onTrackSelect}
                />
              </Fragment>
          ))}
        </Body>
        {model && (
          <PlaylistModel closeModel={() => setModel(false)} playlist={currentPlaylist} id={id} />
        )}
      </Fragment>
    </Container>
        <Footer>
          <DetailSong song={songs} trackIndex={trackIndex}/>
          <Audio song={songs} trackIndex={trackIndex} setTrackIndex={setTrackIndex}/>
        </Footer>
      </Total>
  );
};

export default Playlist;
