import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import {IconButton} from "@mui/material";
import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {getPlaylistById, updatePlaylist} from "../../redux/playlistSlice/currentPlaylist";
import {unwrapResult} from "@reduxjs/toolkit";
import {useSnackbar} from "notistack";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useNavigate} from "react-router";

const Container = styled.div`
  width: 30rem;
  min-height: 30rem;
  background-color: whitesmoke;
  border-radius: 1rem;
  position: fixed;
  top: calc(50% - 17rem);
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);

  .close_btn {
    position: absolute;
    right: 0%;
    top: 0%;

    svg {
      width: 2rem;
      height: 2rem;
      color: var(--white);
    }
  }

  .form_container {
    h1 {
      font-size: 1.8rem;
      font-weight: 500;
      margin: 2rem;
      margin-bottom: 0;
    }

    .input_container {
      padding: 0.5rem 1rem;
    }
  }
`
const Form = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .form-input {
    width: 90%;
  }
`
const InforAvatar = styled.div`
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  margin: 15px auto;
  border: 1px solid #ddd;
  cursor: pointer;
  :hover span {
    bottom: -15%;
  };
  ::-webkit-file-upload-button {
  cursor: pointer;
}
`
const InfoImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`
const InforSpan = styled.span`
  position: absolute;
  bottom: -100%;
  left: 0;
  width: 100%;
  height: 50%;
  text-align: center;
  color: orange;
  transition: 0.3s ease-in-out;
  background: #fff5;
`
const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`
const FormInput = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`
const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  padding: 10px;

`
const PlaylistModel = ({closeModel, playlist, id}) => {
    const [avatar, setAvatar] = useState('');
    const initState = {name: '', description: ''}
    const [playlistData, setPlaylistData] = useState(initState)
    const {name, description} = playlistData;
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const navigate=useNavigate()
    useEffect(() => {
        setPlaylistData(playlist)
    }, [playlist])
    const changeAvatar = (e) => {
        const file = e.target.files[0]
            setAvatar(file)
    }
    const handleInput = e => {
        const {name, value} = e.target
        setPlaylistData({...playlistData, [name]: value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          dispatch(updatePlaylist({id, avatar, name, description})).then(() => {
            dispatch(getPlaylistById(id))
          });
          enqueueSnackbar('Cập nhật thành công', {variant: "success"});
        } catch (error) {
            console.log(error);
            enqueueSnackbar(error.message, {variant: "error"});
        }
    };

    return (
        <Container>
            <IconButton className={'close_btn'} onClick={closeModel}>
                <CloseIcon/>
            </IconButton>
            <Form>
                <form onSubmit={handleSubmit} className="form-input">

                    <Logo>
                        <InforAvatar>
                            <InfoImg src={avatar ? URL.createObjectURL(avatar) : playlist.image}
                                     style={{filter: 'invert(0)'}}
                                     alt="avatar"/>
                            <InforSpan>
                                <i>
                                    <CameraAltIcon/>
                                </i>
                                <p>Thay ảnh</p>
                                <Input type="file" name="file" id="file_up"
                                       accept="image/*" onChange={changeAvatar}/>
                            </InforSpan>
                        </InforAvatar>

                    </Logo>

                    <FormInput>
                        <label>Nhập tên playlist</label>
                        <TextField id="outlined-basic" variant="outlined" name={'name'} value={name}
                                   onChange={handleInput}/>
                        <br/>
                        <label>Nhập mô tả</label>
                        <TextField id="filled-basic" rows={3} multiline variant="outlined" name={'description'}
                                   value={description} onChange={handleInput}/>

                        <Button sx={{mt: 3, p: 2, width: '30%', borderRadius: '500px', color: "black", mb: 3}}
                                type="submit"
                                variant="contained" color="inherit"
                                style={{marginLeft: '50%', transform: 'translateX(-50%)'}}>
                            Lưu
                        </Button>
                    </FormInput>
                </form>
            </Form>
        </Container>
    );
};

export default PlaylistModel;