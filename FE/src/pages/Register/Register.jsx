import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from '@mui/material/Typography';
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import * as yup from "yup";
import InputField from "../../components/FormControler/InputField/InputField";
import PasswordField from "../../components/FormControler/PasswordField/PasswordField";
import { register } from "../../redux/userSlice/userSlice";
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
background-repeat: no-repeat;
background-size: cover;
overflow: hidden;
`
const Wrapper = styled.div`
margin-top: 10px;
max-width: 450px;


`
const Topbar = styled.div`
padding: 40px 0 12px;
`
const Logo = styled.h1`

`
const Title = styled.h2`
margin-top:20px;
color: #333;
`
const Form = styled.div`


`
const FormInput = styled.div`

`

const Bottom = styled.div`
margin-top: 20px;
`
const Link = styled.a`
color: red;
`
const LinkLogin = styled.span`
color: #333;

`
const schema = yup
  .object()
  .shape({
    username: yup.string()
    .required("Tên tài khoản không được để trống")
    .min(2, "Tên tài khoản quá ngắn")
    .max(25, "Tên tài khoản quá 25 ký tự "),
    email: yup.string()
    .email("Email không đúng định dạng")
    .required("Email không được để trống"),
    password: yup.string().required("Mật khẩu không được để trống")
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .max(25, "Mật khẩu tối đa 25 ký tự"),
    confirmPassword: yup.string()
    .required("Nhập lại mật khẩu của bạn")
    .oneOf([yup.ref("password")],"Mật khẩu không khớp"),
    phone: yup.string()
    .required("Nhập số điện thoại"),
  })
  .required();

const Register = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
    resolver: yupResolver(schema),
  });
  
  const handleSubmit = async (data) => {
    try {
      const action = await register(data);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      enqueueSnackbar("Bạn đã đăng ký thành công", { variant: "success" });
      navigate('/login')
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: "error" });
      navigate('/register')
    }
  };
  const { isSubmitting } = form.formState;
  
  return (
    <Container>
      <Wrapper>
        <Topbar>
          <Typography variant="h3" sx={{color:'#333'}}>
          Music Life
          </Typography>
        <Title>Đăng ký miễn phí để bắt đầu nghe.</Title>
        </Topbar>
      <Form>
        
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {isSubmitting && (
          <LinearProgress
            sx={{width:'100%',color: "grey.500" }}
            color="secondary"
           
          />
        )}
       
        <InputField name="username" label="Tên tài khoản" form={form} />
       
        <InputField name="email" label="Nhập email của bạn" form={form} />
        <PasswordField name="password" label="Mật khẩu" form={form} />
        <PasswordField
          name="confirmPassword"
          label="Nhập lại mật khẩu"
          form={form}
        />
        <InputField name="phone" label="Nhập số điện thoại" form={form} />
        <Button sx={{ mt:5,p:2,width:'50%' ,borderRadius:'500px'}} disabled={isSubmitting} type="submit"  variant="contained" color="inherit">
         ĐĂNG KÝ
        </Button>
      </form>
      </Form>
      <Bottom>
        <LinkLogin>Bạn đã có tài khoản ?</LinkLogin>
        <Link href="/login">Đăng nhập</Link>
        
      </Bottom>
       </Wrapper>
     
    </Container>
  );
};

export default Register;
