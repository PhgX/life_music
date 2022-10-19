import { yupResolver } from "@hookform/resolvers/yup";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import FavoriteIcon from "@mui/icons-material/Favorite";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import InputField from "../../components/FormControler/InputField/InputField";
import {
  createPlaylist,
  getPlaylistAndUser,
} from "./../../redux/playlistSlice/playlistSlice";

const Container = styled.div`
  height: 100%;
  width: 100%;

  border-radius: 5px;
  background: linear-gradient(
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.1)
  );
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  /* align-items: center;
  justify-content: center; */
`;
const Menu = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  color: #b3b3b3;
  align-items: flex-start;
  
`;
const MenuItem = styled.div`
  .item-link {
    display: flex;
    padding: 8px 0;
    text-decoration: none;
    color: #b3b3b3;
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }
`;
const ItemIcon = styled.div``;
const ItemDesc = styled.p`
  margin-left: 10px;
  font-size: 16px;
  font-weight: 500;
`;
const Hr = styled.div`
  border: 1px solid #a7a7a7;
  width: 80%;
`;
const Bottom = styled.div`
overflow: auto;
height: 57vh;
&::-webkit-scrollbar {
    width: 0.5rem;
    &-thumb {
      background-color: rgba(255, 255, 255,0.6);
    }
  }
`
const CreateList = styled.div`
  color: #b3b3b3;
  cursor: pointer;
  display: flex;
  .profile-item {
    color: #b3b3b3;
    text-decoration: none;
    display: flex;
    align-items: flex-start;
    &:hover {
      color: #fff;
    }
  }
`;
const ListTitle = styled.p`
  padding: 10px 0;
  font-weight: 500;
`;
const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const style = {
  position: "absolute",
  display: "flex",
  background: "grey",
  flexDirection: "column",
  alginItem: "center",
  justifyContent: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const MenuUser = styled.div`
 display: flex;
  color: #b3b3b3;
  align-items: flex-start;
  margin: 10px 0;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`
const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("Tên Playlist không được để trống")
      .min(2, "Tên Playlist quá ngắn")
      .max(25, "Tên Playlist quá 25 ký tự "),
  })
  .required();
const GuestSide = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedInUser = useSelector((state) => state.user.user);
  const isLoggedIn = !!isLoggedInUser._id;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if (isLoggedIn) {
      setOpen(true);
    } else {
      enqueueSnackbar("Vui lòng đăng nhập tài khoản", { variant: "error" });
    }
  };
  const handleClose = () => setOpen(false);
  const user = useSelector((state) => state.user.user);
  const playlists = useSelector((state) => state.playlist.playlists);
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm({
    defaultValues: {
      name: "",
      id: `${user._id}`,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setTimeout(() => {
      if(isLoggedIn) dispatch(getPlaylistAndUser(user._id));
      return
    },100)
  },[]);

  const handleSubmit = async (data) => {
    try {
      if (isLoggedIn) {
         dispatch(createPlaylist(data)).then(() => {
          dispatch(getPlaylistAndUser(user._id))
         });
         setOpen(false);
        // const resultAction = await dispatch(action);
        // const playlists = unwrapResult(resultAction);
        enqueueSnackbar("Bạn đã tạo playlist thành công", {
          variant: "success",
        });
        // setTimeout(window.location.reload(), 5000);
      } else {
        enqueueSnackbar("Vui lòng đăng nhập tài khoản", { variant: "error" });
      }
      // navigate('/playlist')
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  const handleClick = () => {
    if (isLoggedIn) {

    } else {
      enqueueSnackbar("Vui lòng đăng nhập tài khoản", { variant: "error" });
    }
  };
  const { isSubmitting } = form.formState;
  return (
    <Container>
      <Wrapper>
        <Menu>
          <MenuItem onClick={() => handleClick()}>

            {
              isLoggedIn &&  (
                <>
                <NavLink className="item-link" to={"/library"}>
              <ItemIcon>
                {" "}
                <LibraryMusicIcon />
              </ItemIcon>
              <ItemDesc>Thư viện</ItemDesc>
            </NavLink>
                </>
              )
            }
           {!isLoggedIn && (
            <MenuUser>
              <ItemIcon>
              <LibraryMusicIcon />
              </ItemIcon>
              <ItemDesc>Thư viện</ItemDesc>
            </MenuUser>
           )}


          </MenuItem>
          <MenuItem>
            <NavLink className="item-link" onClick={handleOpen}>
              <ItemIcon>
                {" "}
                <ControlPointIcon />
              </ItemIcon>
              <ItemDesc>Tạo playlist</ItemDesc>
            </NavLink>
          </MenuItem>
          <MenuItem onClick={() => handleClick()}>
           {
            isLoggedIn && (
              <>
               <NavLink className="item-link" to={'/liked-song'}>
              <ItemIcon>
                <FavoriteIcon />
              </ItemIcon>
              <ItemDesc>Bài hát đã thích</ItemDesc>
            </NavLink>
              </>
            )
           }
           {
            !isLoggedIn && (
            <MenuUser>
              <ItemIcon>
                <FavoriteIcon />
              </ItemIcon>
              <ItemDesc>Bài hát đã thích</ItemDesc>
            </MenuUser>

            )
           }
          </MenuItem>

          <MenuItem onClick={() => handleClick()}>

            {
              isLoggedIn && (
                <NavLink className="item-link" to={"/upload"}>
              <ItemIcon>
                <CloudUploadOutlinedIcon />
              </ItemIcon>
              <ItemDesc>Tải lên bài hát</ItemDesc>
            </NavLink>
              )
            }
             {
              !isLoggedIn && (
<MenuUser>
              <ItemIcon>
                <DownloadForOfflineOutlinedIcon />
              </ItemIcon>
              <ItemDesc>Tải lên bài hát</ItemDesc>
            </MenuUser>
              )
             }

          </MenuItem>
          <MenuItem>
            <NavLink className='item-link' to={"/song-list"}>
              <ItemIcon>
                <DownloadForOfflineOutlinedIcon />
              </ItemIcon>
              <ItemDesc>Danh sách bài hát</ItemDesc>
            </NavLink>
          </MenuItem>
        </Menu>
        <Hr />

        <Bottom>
        {playlists &&
          // isLoggedIn &&
          // playlists.length > 0 &&
          playlists.map((item, index) => (
            <CreateList key={index}>
              <NavLink to={`/playlist/${item._id}`} className="profile-item">
                <ListTitle>{item.name}</ListTitle>
              </NavLink>
            </CreateList>
          )
          )}
        </Bottom>
      </Wrapper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tạo Playlist
          </Typography>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {isSubmitting && (
              <LinearProgress
                sx={{ width: "100%", color: "grey.500" }}
                color="secondary"
              />
            )}
            <Form>
              {/* <InputField name="id" form={form} value={""} hidden /> */}
              <InputField name="name" form={form} />
              <Button
                sx={{ mt: 1, p: 2, width: "50%", borderRadius: "500px" }}
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="inherit"
              >
                Thêm mới
              </Button>
            </Form>
          </form>
        </Box>
      </Modal>
    </Container>
  );
};

export default GuestSide;
