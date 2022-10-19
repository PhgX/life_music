import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { Fragment} from "react";
import {useSelector} from "react-redux";
import { useDispatch } from 'react-redux';
import {fetchSong, getSongRandom} from "../../redux/songSlice/songSlice";
import {getPlaylistAndUser} from "../../redux/playlistSlice/playlistSlice";
import {NavLink} from "react-router-dom";
import PlaylistShowLibrary from "../Playlist/playlistShowLibrary";
import DetailSong from "../HomeFooter/DetailSong";
import Audios from "../HomeFooter/Audio";
const Total = styled.div`
  display: grid;
  grid-template-rows: 75vh 15vh;
`
const Container=styled.div`
  //background: linear-gradient(
  //        rgba(255, 255, 255, 0.1),
  //        rgba(255, 255, 255, 0.1)
  //);
  background-color: grey;
  overflow: auto;
  
  .results_container {
    margin: 2rem;
    display: grid;
    z-index: 2;
    grid-template-columns: 1fr 2fr;

    .songs_container {
      flex: 2;
    }

    .playlists_container {
      width: 100%;
      height: 320px;
      display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    }
  }
`
const SongItem = styled.div`
  cursor: pointer;
  height: 60px;
  display: flex;
  padding: 10px;
  margin: 10px;
   background-color: #7a7a7a; 
  padding: 0 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  &:hover {
    background-color: rgba(255, 255, 255,0.1)
  }
`;
const SongImage = styled.img`
object-fit: cover;
  width: 50px;
  height: 50px;
`;
const SongName = styled.p`
  color:#fff;
  margin-left: 20px;
  `
const SongSinger = styled.span`

`;
const Footerdiv = styled.div`
height: 20%;
display: grid;
grid-template-columns: 1fr 2fr;
`

const Library = () => {
    const dispatch = useDispatch()
    const songRandom = useSelector((state) => state.song.songRandom)
    const isLoggedInUser = useSelector(state => state.user.user )
    const isLoggedIn = !!isLoggedInUser._id;
    const user = useSelector(state=> state.user.user);
    const playlists = useSelector (state => state.playlist.playlists);
    const [trackIndex, setTrackIndex] = useState(-1)
    const handleClick = (id, index) => {
        setTrackIndex(index);
    };
    useEffect(()=> {
        dispatch(getPlaylistAndUser(user._id))
    },[user._id])
    useEffect(() => {
        dispatch(getSongRandom());
    }, []);
    return (
        <Total>
            <Container>
                <div className={"results_container"}>
                    <div className={"songs_container"}>
                        {songRandom && songRandom.map((song,index)=>(
                            <Fragment key={song._id}>
                                <SongItem onClick={() => handleClick(song._id, index)}>
                                    <SongImage src={song.image}></SongImage>
                                    <SongName>{song.name}</SongName>
                                    <SongSinger>{song.singer}</SongSinger>
                                </SongItem>
                            </Fragment>

                        ))}
                    </div>

                    <div className={"playlists_container"}>
                        {
                            playlists &&(
                                isLoggedIn &&
                                (
                                    <PlaylistShowLibrary playlists={playlists}/>
                                )
                            )
                        }
                    </div>
                </div>
            </Container>
            {songRandom &&
                <Footerdiv>
                    <DetailSong song = {songRandom}  trackIndex={trackIndex}/>
                    <Audios song={songRandom} trackIndex={trackIndex} setTrackIndex={setTrackIndex} />
                </Footerdiv>}

        </Total>

    );
};

export default Library;