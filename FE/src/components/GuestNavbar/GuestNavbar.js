import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Avatar, debounce, Menu, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { getAllPlaylist, searchPlaylist } from "../../redux/playlistSlice/playlistAdmin";
import { fetchSong, searchSong } from "../../redux/songSlice/songSlice";
import { logout } from "../../redux/userSlice/userSlice";
import Tooltip from '@mui/material/Tooltip';
const Container = styled.div`

  grid-column-gap: 10px;
  background-color: #040404;
  /* position: fixed; */
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; ;

`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items:flex-start;
  margin-left: 30px;  
  justify-content: center;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoLink = styled.a`
 
  padding: 10px;
  font-size: 30px;
  font-weight: 700;
  color: #ffff;
 text-decoration: none;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const HomeForm = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  height: 48px;
  background-color: #2a2a2a;
  border-radius: 500px;
  &:focus {
    background-color: aqua;
  }
  .nav-search {
    text-decoration: none;
    display: flex;
    align-items: center;
    width: 100%;
  }
`;
const SearchButton = styled.button`
  display: flex;
  height: 30px;
  width: 30px;
  background: transparent;
  color: #fff;
  border: 0;
  outline: none;
  margin-left: 5px;
  padding: 5px;
  align-items: center;
`;
const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  border: 0;
  flex: 2;
  outline: none;
  text-decoration: none;
  background: transparent;
  color: #fff;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  margin-right: 20px;
`;

const GuestNavbar = () => {

  const isLoggedInUser = useSelector(state => state.user.user )

  const isLoggedIn = !!isLoggedInUser._id;
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }
    useEffect(() => {
        dispatch(fetchSong());
        dispatch(getAllPlaylist());
    },[])
    const debounceList = useCallback(debounce((nextValue) => {
        dispatch(searchSong(nextValue));
        dispatch(searchPlaylist(nextValue));

        if (nextValue === '') {
            dispatch(fetchSong());
            dispatch(getAllPlaylist());
        }
    }, 300))
   const handleChange = (e) => {
       // e.target.value = e.target.value.replace(/[^\w\s]+/g, '')
       debounceList(e.target.value)
    }

    // const handleChange = (e) => {
    //          dispatch(searchSong(e.target.value));
    //          // dispatch(searchPlaylist(e.target.value))
    //     if (e.target.value ===  '') {
    //         dispatch(fetchSong())
    //     }
    // }
  return (
    <Container>
      <Left>
        <LogoLink href="/">
              Music Life 
        </LogoLink>
      </Left>
      <Center>
        
        <HomeForm >
            <NavLink className='nav-search' to={ '/search'} >
          <SearchButton>
            <SearchOutlinedIcon />
          </SearchButton >
          <Input placeholder="Bạn muốn nghe gì..."
                 // onChange = {handleChange}
              onKeyUp = {handleChange}
          />
            </NavLink>
        </HomeForm>
      </Center>
      <Right>
        <Stack direction="row" spacing={2}>
          {!isLoggedIn && (

            <>
          <Button href="/register" variant="text" sx={{color:'white'}}>Đăng ký</Button>    
          <Button href="/login" variant="text" sx={{color:'white'}}>Đăng Nhập</Button>
            </>
          )}

{isLoggedIn && (
  <Tooltip title={isLoggedInUser.fullname} placement="left" sx={{fontSize:'20px'}}>

    <Avatar
     onClick={handleClick}
      alt="Duc Anh"
      src={isLoggedInUser.profileImage}
      sx={{ width: 50, height: 50, cursor: 'pointer'}}
    />
  </Tooltip>

)}
        </Stack>
      </Right>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem> 
        <Link style={{color:"#333", textDecoration: 'none'}} to="/profile">
             Hồ sơ
        </Link>
        </MenuItem>
        
        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
      </Menu>
    </Container>
  );
};

export default GuestNavbar;
