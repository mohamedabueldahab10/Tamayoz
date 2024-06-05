// MUISwitch.js
import React from 'react';
import {
  Switch,
  FormHelperText,
  InputAdornment,
  FormLabel,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import CustomizedLabel from './CustomizedLabel';

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: 'var(--primary-color)',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: 'var(--primary-color)',
  },
}));
export default function CustomSwitcher({
  name,
  trusted,
  defaultValue = false,
  checkedlabel,
  uncheckedlabel,
  ...rest
}) {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => {
          return (
            <>
              <StyledSwitch
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                color={
                  field.value === true ? 'success' : 'var(secondary-color)'
                }
                {...rest}
              />
              <CustomizedLabel
                sx={{
                  color: `${
                    field.value === true
                      ? 'var(--primary-color)'
                      : 'var(--secondary-color)'
                  } !important`,
                  paddingInline: '20px !important',
                  fontWeight: '700 !important',
                }}
              >
                {field.value === true ? checkedlabel : uncheckedlabel}
              </CustomizedLabel>
            </>
          );
        }}
      />
    </div>
  );
}
