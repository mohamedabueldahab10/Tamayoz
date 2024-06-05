import React, { forwardRef } from 'react';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import { useFormContext, Controller } from 'react-hook-form';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
const CustomDatePickerWrapper = styled('div')(({ width, height }) => ({
  '& .MuiInputBase-root': {
    width: width || '300px',
    height: height || '40px',
    color: 'var(--primary-color)',
    backgroundColor: '#fff',
    borderRadius: '0',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1px solid var(--secondary-color)',
      borderInline: 'none !important',
      borderTop: 'none !important',
    },
    '&:hover fieldset': {
      borderColor: 'var(--primary-color)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--primary-color)',
    },
    '&.css-1y6rgth-MuiFormLabel-root-MuiInputLabel-root': {
      transform: 'translate(14px, 10px) scale(1)',
    },
  },
}));
const CustomTextField = styled(TextField)({
  '&.css-1y6rgth-MuiFormLabel-root-MuiInputLabel-root': {
    transform: 'translate(14px, 10px) scale(1) !important',
  },
});
const CustomSingleDate = forwardRef(
  ({ name, defaultValue, rules, width, height, label, ...props }, ref) => {
    const { control } = useFormContext();

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={rules}
          render={({ field }) => (
            <CustomDatePickerWrapper width={width} height={height}>
              <DatePicker
                {...field}
                {...props}
                ref={ref}
                label={label}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    label={label}
                    placeholder={label}
                  />
                )}
                onChange={(date) => field.onChange(date)}
              />
            </CustomDatePickerWrapper>
          )}
        />
      </LocalizationProvider>
    );
  }
);
export default CustomSingleDate;
