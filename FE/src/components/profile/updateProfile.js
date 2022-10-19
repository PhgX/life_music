import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';
import * as yup from "yup";
import InputField from "../../components/FormControler/InputField/InputField";
import {updateProfile} from "../../redux/userSlice/userSlice";
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
text-align: center;
justify-content: center;
background-color: #333;
border-radius: 10px;
`

const Wrapper = styled.div`
background-color: #fff;
margin-top: 20px;
height: 600px;
width: 100%;
max-width: 450px;
-webkit-box-shadow: 5px 5px 24px 5px #000000; 
box-shadow: 5px 5px 24px 5px #000000;
`
const Topbar = styled.div`
margin-top:20px;

`
const Logo = styled.h1`
margin-top: 20px;
`
const Title = styled.h1`
margin-top:10px;
`
const Form = styled.div`

width:100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
.form-input {
    width: 90%;
}
`
const FormInput = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`


const Bottom = styled.div`
margin-top: 20px;
`
const Link = styled.a``
const LinkLogin = styled.span``
const schema = yup
    .object()
    .shape({
        fullname: yup.string()
            .max(25, " Họ Tên quá dài "),
        email: yup.string()
            .email("Email không đúng định dạng")
            .required("Email không được để trống"),
        address: yup.string(),
        phone: yup.string()
            .min(9,"Số điện thoại không đúng : vui lòng nhập đủ 9 chữ số")
            .required("Nhập số điện thoại"),
    })
    .required();

const UpdateProfile = (props) => {
    const user = useSelector(state=> state.user.user)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const form = useForm({
        defaultValues: {
            fullname: user.fullname,
            email: user.email,
            address: user.address,
            phone: user.phone,
        },
        resolver: yupResolver(schema),
    });
    console.log(form)

    const handleSubmit = async (data) => {
        try {
            dispatch(updateProfile(data));
            enqueueSnackbar('Cập nhật thành công', { variant: "success" });
            navigate('/profile')
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
        }
    };
    const { isSubmitting } = form.formState;

    return (
        <Container>
            <Wrapper>
                <Topbar>
                    <Typography variant="h3">
                        Music Life
                    </Typography>
                    <Title>Cập nhật hồ sơ</Title>
                </Topbar>
                <Form>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="form-input">
                        {isSubmitting && (
                            <LinearProgress
                                sx={{width:'100%',color: "grey.500" }}
                                color="secondary"

                            />
                        )}
                        <InputField name="fullname" label="Nhập Họ tên" form={form} />
                        <InputField name="email" label="Nhập email của bạn" form={form} />
                        <InputField name="address" label="Nhập địa chỉ của bạn" form={form} />
                        <InputField name="phone" label="Nhập số điện thoại" form={form} />
                        <Button sx={{ mt:5,p:2,width:'50%' ,borderRadius:'500px'}} disabled={isSubmitting} type="submit"  variant="contained" color="inherit">
                            Lưu
                        </Button>
                    </form>
                </Form>

            </Wrapper>

        </Container>
    );
};

export default UpdateProfile;
