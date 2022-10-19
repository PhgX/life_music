import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import ModeIcon from '@mui/icons-material/Mode';
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import { useDispatch } from 'react-redux';
import { updateAvatar } from "../../redux/userSlice/userSlice";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Button from '@mui/material/Button';

const Container2 = styled.div`

  background-color: #333;
  height: 100vh;
  border-radius:10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  `
const Logo=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  padding: 10px;
  
`
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 80%;
  padding: 10px;
`

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  border-top: 1px solid cornsilk;
  width: 100%;
  height: 100%;
  padding: 20px;

  .icon {
    width: 50px;
    height: 50px;
    color:#7a7a7a
  }

`
const Title = styled.div`
padding-left: 10px;
  font-size: 20px;
  color: #7a7a7a;
  .nav_link {
    text-decoration: none;
    font-size: 20px;
    color: #7a7a7a;
    &:hover {
   color: #fff
   }
  }
`
const InforAvatar=styled.div`
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
  }

,:: -webkit-file-upload-button {
  cursor: pointer;
}
`
const InfoImg=styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`
const InforSpan=styled.span`
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
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
  
`
const SideBarProfile = () => {
    const user = useSelector(state=> state.user.user)
    const [avatar, setAvatar] = useState('');
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const changeAvatar = (e) => {
        const file = e.target.files[0]
        setAvatar(file)
    }
    const uploadAvatar = async (e) => {
      try {
          e.preventDefault();
          if(avatar) {
            dispatch(updateAvatar(avatar));
            enqueueSnackbar('Cập nhật ảnh đại diện thành công', {variant: "success"});
          } else {
            enqueueSnackbar('Chưa chọn ảnh đại diện', {variant: "error"});
          }
        } catch (error) {
            console.log(error);
            enqueueSnackbar(error.message, {variant: "error"});
        }
    };

    return (
        <Container2>

            <form onSubmit={uploadAvatar}>
                <Logo>
                    <InforAvatar>
                        <InfoImg src={avatar ? URL.createObjectURL(avatar) : user.profileImage}
                                 style={{filter:'invert(0)'}}
                                 alt="avatar" />
                        <InforSpan >
                            <i>
                              <CameraAltIcon />
                            </i>
                            <p >Thay ảnh</p>
                            <Input type="file" name="file" id="file_up"
                                   accept="image/*" onChange={changeAvatar}/>
                        </InforSpan>
                    </InforAvatar>
                <Button variant='contained' color="secondary" type="submit"  >Lưu</Button>
                </Logo>
            </form>

            <Menu>
                <MenuItem>
                    <HomeIcon  className='icon'/>
                    <Title>
                        <NavLink  className= "nav_link"to={'/profile'} >
                            Tổng quan tài khoản
                        </NavLink>
                    </Title>
                </MenuItem>
            
                <MenuItem>
                    <ModeIcon  className='icon' />
                    <Title>
                        <NavLink className= "nav_link" to={'/profile/update'}>
                            Sửa hồ sơ
                        </NavLink>
                    </Title>
                </MenuItem>
                <MenuItem>
                    <LockIcon   className='icon'/>
                    <Title>
                        <NavLink className= "nav_link" to={'/profile/password'}>
                            Đổi mật khẩu
                        </NavLink>
                    </Title>

                </MenuItem>
            </Menu>
        </Container2>
    );
};

export default SideBarProfile;