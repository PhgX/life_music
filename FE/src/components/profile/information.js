import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 50px;
  background-color: #333;
  border-radius: 10px;
  display: flex;
    flex-direction: column;
    align-items: center;
    
`;



const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Desc = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;


const Warrper = styled.div`
width: 550px;
height: 70%;
background-color: #fff;
-webkit-box-shadow: 5px 5px 24px 5px #000000; 
box-shadow: 5px 5px 24px 5px #000000;
`;

function createData(name, calories) {
  return { name, calories };
}


const Information = () => {
  const user = useSelector((state) => state.user.user);
  const rows = [
    createData("Tên người dùng", `${user.fullname ? user.fullname: ''}`),
    createData("Email", `${user.email}`),
    createData("Địa chỉ", `${user.address ? user.address : ''}`),
    createData("Số điện thoại", `${user.phone}`),
  ];
  return (
    <Container>
      <Warrper>
      <Desc>
        <Typography variant="h4" component="h1" sx={{ marginTop: '30px'}}>Tổng Quan Tài Khoản</Typography>
        <Typography variant="h5" component="h3" sx={{ marginBottom: '30px '}}>
          Hồ Sơ
        </Typography>
      </Desc>
      <TableContainer component={Paper}>
        <Table sx={{width: '100%', height:"100%" }} aria-label="caption table">
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.calories}</TableCell>
                {/* <TableCell align="left">{row.fat}</TableCell> */}
                {/* <TableCell align="left">{row.carbs}</TableCell>
                <TableCell align="left">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Warrper>
    </Container>
  );

};

export default Information;
