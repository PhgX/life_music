import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import * as yup from "yup";
import InputField from "../../components/FormControler/InputField/InputField";
import PasswordField from "../../components/FormControler/PasswordField/PasswordField";
import { login } from "../../redux/userSlice/userSlice";
import CircularProgress from '@mui/material/CircularProgress';
import { NavLink } from "react-router-dom";
const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
text-align: center;
justify-content: center;
background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.8)
    ),
    url("https://images.unsplash.com/photo-1488376739361-ed24c9beb6d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80");;
background-size: cover;

`
const Wrapper = styled.div`
margin-top: 10px;
max-width: 450px;

`
const Topbar = styled.div`
padding: 40px 0 32px;
.logo-link {
  text-decoration: none;
}
`
const Logo = styled.h1`
color:#333;

`
const Title = styled.h1`
margin-top:40px;
color:#333;
`
const Form = styled.div`

`


const Bottom = styled.div`
margin-top: 20px;
`
const Link = styled.a`
color:#333;

`
const LinkLogin = styled.span`
color:#333;

`
const schema = yup
  .object()
  .shape({
    username: yup.string()
    .required("Tên tài khoản không được để trống từ 6 -25 ký tự")
    .min(2, "Tên tài khoản quá ngắn")
    .max(25, "Tên tài khoản quá 25 ký tự"),
    password: yup.string().required("Mật khẩu không được để trống")
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .max(25, "Mật khẩu tối đa 25 ký tự"),
  })
  .required();

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (data) => {
    try {
      const action = await login(data);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
        enqueueSnackbar('Đăng nhập thành công', { variant: "success" });
        navigate('/')
    } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });  
        navigate('/login')
    }
  };
  const { isSubmitting } = form.formState;

  return (
    <Container>
      <Wrapper>
        <Topbar>
          <NavLink to={'/'} className='logo-link'>
          <Typography variant="h2" sx={{color: "#333"}}>
          Music Life 
          </Typography>
          </NavLink>
        <Title>Để tiếp tục, hãy đăng nhập vào Music Life.</Title>
        </Topbar>
      <Form>
        
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {isSubmitting && (
          <LinearProgress
            sx={{width:'100%',color: "grey.500" }}
            color="secondary"
           
          />
        )}
       
        <InputField name="username" label="Tên tài khoản" form={form}/> 
        <PasswordField name="password" label="Mật khẩu" form={form} />
        <Button sx={{ mt:5,p:2,width:'50%' ,borderRadius:'500px'}} disabled={isSubmitting} type="submit"  variant="contained" color="inherit">
         ĐĂNG Nhập
        </Button>
      </form>
      </Form>
      <Bottom>
        <LinkLogin>Bạn chưa có tài khoản ?</LinkLogin>
        <Link href="/register">Đăng ký</Link>
        
      </Bottom>
       </Wrapper>  
    </Container>
  );
};

export default Login;
