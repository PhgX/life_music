import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const ValidationTextField = styled(OutlinedInput)({
  backgroundColor: "#fff",
  "& label.Mui-focused": {
    color: "#333"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#333"
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      backgroundColor: "#fff",
      borderColor: "black"
    },
    "&:hover fieldset": {
      borderColor: "#333"
    },
    "&.Mui-focused fieldset": {
      borderColor: "#333"
    }
  }
 
});
function PasswordField(props) {
  const { form, name, label, disabled } = props;
  const {
    formState: { errors },
  } = form;
  const hasError = !!errors[name];
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(pass => !pass);
  };
  return (
    <>
      
      <FormControl sx={{ marginTop: 2, width:'100%' }}  >
          <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
          <Controller 
            name={name}
            control={form.control}
            
            render = {({ field})=> (
                <ValidationTextField
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    label={label}  
                    disabled={disabled}
                    errors= {!!hasError}
                    endAdornment={
                        <InputAdornment position="end" >
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                />         
            )}
            />     
        </FormControl>
      <FormHelperText error={!!hasError}>
        {errors[name]?.message}
      </FormHelperText>
    </>
  );
}

export default PasswordField;
