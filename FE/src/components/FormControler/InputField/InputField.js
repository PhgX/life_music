import React from "react";
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Controller } from 'react-hook-form';

import { TextField, FormHelperText} from '@mui/material';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};
const ValidationTextField = styled(TextField)({
  backgroundColor: "#fff",

  
  });
function InputField(props) {
  const { form, name, label, disabled, value} = props;
  const {
    formState: { errors },
  } = form;
  const hasError = errors[name];

  return (
    <>
      <Controller
        name={name}
        control={form.control}
        render = {({ field})=> (
            <ValidationTextField
                {...field}
                
                sx ={{marginTop:2, width: '100%'}}
                label={label}
                disabled={disabled}
                errors= {!!hasError}
                value={value}
            />         
        )}
      />
      <FormHelperText error={!!hasError}>
        {errors[name]?.message}
      </FormHelperText>
    </>
  );
}

export default InputField;
