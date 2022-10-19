import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClickAwayListener } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import styled from "styled-components";
import {
  addSongToPlaylist,
} from "../../redux/playlistSlice/currentPlaylist";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router";
import { getAllPlaylist } from "../../redux/playlistSlice/playlistAdmin";

const Container = styled.div`
  .menu,
  .playlists {
    z-index: 100;
    width: 15rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
    background-color: whitesmoke;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    position: absolute;
    top: 0%;
    right: 0;

    .option,
    .playlist_option {
      font-size: 1rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      svg {
        width: 2rem;
        height: 2rem;
      }

      &:hover {
        background-color: var(--light-black);
      }
    }

    .playlist_option:hover .playlists {
      display: block;
    }

    .playlists {
      top: 0;
      bottom: initial;
      right: 95%;
      display: none;
    }
  }
`;

const PlaylistMenu = ({
  currentPlaylist,
  song,
  handleRemoveSong,
  closeMenu,
}) => {
  let id = useParams();
  const playlists = useSelector((state) => state.playlist.playlists);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleAddToPlaylist = async (songId, playlistId) => {
    const payload = { songId, playlistId };
    try {
      dispatch(addSongToPlaylist({ payload })).then(() => {
        dispatch(getAllPlaylist());
      });
      enqueueSnackbar("Thêm bài hát thành công", { variant: "success" });
      window.location.reload()
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <Container>
      <ClickAwayListener onClickAway={closeMenu}>
        <div className={"menu"} onClick={closeMenu}>
          <div className={"playlist_option"}>
            <p style={{ fontSize: "17px" }}>Thêm bài hát vào Playlist</p>
            <Fragment>
              <ArrowLeftIcon />
              <div className={"playlists"}>
                {playlists.map((playlist) => (
                  <div
                    className={"option"}
                    onClick={() => handleAddToPlaylist(song._id, playlist._id)}
                    key={playlist._id}
                  >
                    <p style={{ fontSize: "17px" }}>{playlist.name}</p>
                  </div>
                ))}
              </div>
            </Fragment>
          </div>
          {currentPlaylist && currentPlaylist.user === user._id && (
            <div className={"option"}>
              <p
                onClick={() => handleRemoveSong(song._id)}
                style={{ fontSize: "17px" }}
              >
                Xoá bài hát ra khỏi Playlist
              </p>
            </div>
          )}
        </div>
      </ClickAwayListener>
    </Container>
  );
};

export default PlaylistMenu;
