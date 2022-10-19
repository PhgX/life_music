import React, {useState, useRef, useEffect} from 'react'

import Details from './../DetailSong/DetailSong';
import Controls from './../Audio/Audio';
import  styled  from 'styled-components';
const Container = styled.div`
display: grid;
height: 70px;
width: 100%;
grid-template-columns: 1fr 1fr 1fr;
background-color: #7a7a7a;
`


function Player(props) {

    const audioEl = useRef(null);
    // tạo biến phạm vi biến bên ngoài
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isPlaying) {
            audioEl.current.play();
        } else {
            audioEl.current.pause();
        }
    });

    const SkipSong = (forwards = true) => {
        if (forwards) {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp++;

                if (temp > props.songs.length - 1) {
                    temp = 0;
                }

                return temp;
            });
        } else {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp--;

                if (temp < 0) {
                    temp = props.songs.length - 1;
                }

                return temp;
            });
        }
    }


    return (
        <Container className="c-player">
            <audio src={props.songs[props.currentSongIndex].file} ref={audioEl}></audio>
            
            <Details song={props.songs[props.currentSongIndex]} />
            <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} SkipSong={SkipSong} />
            <p>Next up: <span>{props.songs[props.nextSongIndex]?.name} by {props.songs[props.nextSongIndex].author}</span></p>
        </Container>
    )
}

export default Player;