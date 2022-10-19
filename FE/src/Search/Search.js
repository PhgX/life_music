import React, {useState, useEffect, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {fetchSong, searchSong} from "../redux/songSlice/songSlice";
import {getAllPlaylist} from "../redux/playlistSlice/playlistAdmin";
import PlaylistGuest from "../components/Playlist/playlistGuest";
import DetailSong from "../components/HomeFooter/DetailSong";
import Audios from "../components/HomeFooter/Audio";
import PlaylistAdmin from './../components/PlaylistAdmin/PlaylistAdmin';


const Total = styled.div`
  display: grid;
  grid-template-rows: 75vh 15vh;
`
const Container = styled.div`
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
const Songs = styled.div``
const SongItem = styled.div`
  display: flex;
  margin: 10px;
  background-color: #7a7a7a;
  padding: 0 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;
`
const SongImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`
const SongName = styled.p`
  margin-left: 20px;
  color: #fff;
`
const Footer = styled.div`
  height: 20%;
  display: grid;
  grid-template-columns: 1fr 2fr;
`
const Search = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => {
        return state.song.songs
    })
    const playlists = useSelector(state => {
        return state.playlistAdmin.playlistAdmin
    })
    const [trackIndex, setTrackIndex] = useState(-1)
    const handleClick = (id, index) => {
        setTrackIndex(index);
    }

        useEffect(() => {
            dispatch(fetchSong());
            dispatch(getAllPlaylist());
        }, [])

        return (
            <Total>
                <Container>
                    <div className={"results_container"}>
                        <div className={"songs_container"} >
                            {songs.map((song, index) => (
                                <Fragment key={song._id}>
                                    <SongItem  onClick={() => handleClick(song._id, index)} >
                                        <SongImage src={song.image}/>
                                        <SongName>{song.name}</SongName>
                                    </SongItem>
                                </Fragment>
                            ))
                            }
                        </div>
                        <div className={"playlists_container"}>
                            {playlists &&
                                <PlaylistGuest playlists={playlists}/>
                            }
                        </div>
                    </div>
                </Container>
                <Footer>
                    <DetailSong song={songs} trackIndex={trackIndex}/>
                    <Audios song={songs} trackIndex={trackIndex} setTrackIndex={setTrackIndex}/>
                </Footer>
            </Total>
        )
    }


export default Search;

