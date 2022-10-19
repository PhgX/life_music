import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from '@mui/material/Typography';
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import * as yup from "yup";
import PasswordField from "../../components/FormControler/PasswordField/PasswordField";
import { changePassword } from "../../redux/userSlice/userSlice";
import { useNavigate } from "react-router";
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

max-width: 450px;
background-color: #fff;
max-width: 450px;
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
const Title = styled.h1`
margin-top:20px;
`
const Form = styled.div`
margin-top:20px;
width:100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
    .form-input {
    width: 90%;
}
`

const schema = yup
    .object()
    .shape({
        newpassword: yup.string().required("Mật khẩu không được để trống")
            .min(6, "Mật khẩu tối thiểu 6 ký tự")
            .max(25, "Mật khẩu tối đa 25 ký tự"),
        confirmPassword: yup.string()
            .required("Nhập lại mật khẩu của bạn")
            .oneOf([yup.ref("newpassword")],"Mật khẩu không khớp"),
    })
    .required();

const UpdatePassword = (props) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const form = useForm({
        defaultValues: {
            oldpassword: "",
            newpassword: "",
            confirmPassword: "",
        },
        resolver: yupResolver(schema),
    });

    let navigate = useNavigate();
    const handleSubmit = async (data) => {
        try {
            const action = await changePassword(data);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            enqueueSnackbar("Đổi mật khẩu thành công", { variant: "success" });
            navigate('/profile');
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
                    <Title>Thay đổi mật khẩu</Title>
                </Topbar>
                <Form>

                    <form onSubmit={form.handleSubmit(handleSubmit)} className="form-input">
                        {isSubmitting && (
                            <LinearProgress
                                sx={{width:'100%',color: "grey.500" }}
                                color="secondary"

                            />
                        )}
                        <PasswordField name="oldpassword" label="Mật khẩu cũ " form={form} />
                        <PasswordField name="newpassword" label="Mật khẩu mới" form={form} />
                        <PasswordField
                            name="confirmPassword"
                            label="Nhập lại mật khẩu"
                            form={form}
                        />
                        <Button sx={{ mt:5,p:2,width:'50%' ,borderRadius:'500px'}} disabled={isSubmitting} type="submit"  variant="contained" color="inherit">
                            Lưu
                        </Button>
                    </form>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default UpdatePassword;
