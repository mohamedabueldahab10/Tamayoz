import React, { forwardRef } from 'react';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import { useFormContext, Controller } from 'react-hook-form';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format, parse } from 'date-fns';
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
    const parseDate = (value) =>
      value ? parse(value, 'MM/dd/yyyy', new Date()) : null;
    const formatDate = (date) => (date ? format(date, 'MM/dd/yyyy') : '');
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          // defaultValue={parseDate(defaultValue)}
          render={({ field }) => (
            <CustomDatePickerWrapper width={width} height={height}>
              <DatePicker
                {...field}
                {...props}
                ref={ref}
                label={label}
                value={field.value ? parseDate(field.value) : null}
                onChange={(date) => field.onChange(formatDate(date))}
                TextField={(params) => (
                  <CustomTextField
                    {...params}
                    label={label}
                    placeholder={label}
                  />
                )}
              />
            </CustomDatePickerWrapper>
          )}
        />
      </LocalizationProvider>
    );
  }
);
export default CustomSingleDate;
