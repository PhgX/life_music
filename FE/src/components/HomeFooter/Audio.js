import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { useDispatch } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  height: 70%;
  width: 100%;
  color: black;
  z-index: 1;

  .player-music {
    display: block;
    margin-right: 20px;
  }
`;

function Audios({ song, trackIndex, setTrackIndex }) {
  let {
    name = "",
    file = "",
    image = "",
  } = trackIndex !== -1 ? song[trackIndex] : {};
  const dispatch = useDispatch();
  const handleClickNext = () => {
    if (trackIndex < song.length - 1) {
      setTrackIndex((next) => next + 1);
    } else {
      setTrackIndex(0);
    }
  };
  const handleClickPre = () => {
    if (trackIndex) {
      setTrackIndex((pre) => pre - 1);
    } else {
      setTrackIndex(song.length - 1);
    }
  };

  return (
    <Container>
      <AudioPlayer
        className="player-music"
        src={file}
        layout="stacked-reverse"
        showSkipControls={true}
        showJumpControls={false}
        onClickNext={handleClickNext}
        onClickPrevious={handleClickPre}
      />
    </Container>
  );
}

export default Audios;
