import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Audio from "../Audio/Audio";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchSong, fetchSongById } from "../../redux/songSlice/songSlice";
import DetailSong from './../DetailSong/DetailSong';
import Song from './../Songs/Song';
import Player from './../Player/Player';

const Container = styled.div`
  height: 70px;
  width: 85%;
  bottom: 0;
  right: 0;
  /* background-color: #040404; */
  display: grid;
  /* grid-template-columns: 1fr 2fr; */
  /* position: s; */
`;


const AudioPlay = styled.div``;
const Footer = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.song.songs);
  const song = useSelector(state => state.playlistAdmin.playlistAdmin);
  
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);
  // if (props.onTrackSelect !== 0) {
  //   setCurrentSongIndex(props.onTrackSelect)
  // }
  useEffect(() => {
    dispatch(fetchSong());
  }, []);
  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex]);
  const onTrackSelect =(index) => {
      setCurrentSongIndex(index)
  }
  return (
    <Container>
      {
       ( songs.length > 0) && ( <Player  currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex} 
        nextSongIndex={nextSongIndex} 
        songs={songs}/>)
      }
      
    </Container>
  );
};

export default Footer;
