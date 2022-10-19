import React from 'react';
import 'react-h5-audio-player/lib/styles.css';
import styled from 'styled-components';

import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
const  Container = styled.div`

display: flex;
align-items: center;
justify-content: space-between;
`
function Controls(props) {
    return (
        <Container className="c-player--controls">
            <button className="skip-btn" onClick={() => props.SkipSong(false)}>
                <SkipPreviousIcon  />
            </button>
            <button className="play-btn" onClick={() => props.setIsPlaying(!props.isPlaying)}>
                {props.isPlaying ? <PauseCircleIcon /> : <PlayCircleFilledWhiteIcon />} 
            </button>
            <button className="skip-btn" onClick={() => props.SkipSong()}>
                <SkipNextIcon  />
            </button>
        </Container>
    )
}

export default Controls