import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
display: flex;
`
const SongImage = styled.img`
height: 50px;
width: 50px;
`
const SongName = styled.h3`
color: var(--primary-white);
`
const SongSinger = styled.h4`
color: var(--primary-white);

`
function Details(props) {
 
    return (
        <Container className="c-player--details">
           { props.song && ( <>
             <div className="details-img">
             <SongImage src={props.song.image} alt="" />
           </div>
           <SongName className="details-title">{props.song.name}</SongName>
           <SongSinger className="details-artist">{props.song.author}</SongSinger>
           </>
           )}
        </Container>
    )
}

export default Details