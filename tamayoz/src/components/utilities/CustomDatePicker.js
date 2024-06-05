import React from 'react';
import { Controller } from 'react-hook-form';
import { styled } from '@mui/system';
import { Box, FormLabel, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import ErrorText from './ErrorText';
import { useTranslation } from 'react-i18next';
import CustomizedLabel from './CustomizedLabel';

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
  },
}));
const CustomTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    transform: 'translate(14px, -6px) scale(0.75)',
    textAlign: 'center',
  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(14px, -6px) scale(0.75)',
  },
});

const CustomDatePicker = ({ control, name, width, height, ...props }) => {
  const { t } = useTranslation('modules');
  const startName = `${name}.start`;
  const endName = `${name}.end`;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'end',
          gap: 2,
        }}
      >
        <Controller
          name={startName}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomDatePickerWrapper width={width} height={height}>
              <DatePicker
                label={t('form.start_date')}
                value={value || null}
                onChange={onChange}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                )}
              />
            </CustomDatePickerWrapper>
          )}
        />
        <CustomizedLabel>To</CustomizedLabel>
        <Controller
          name={endName}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomDatePickerWrapper width={width} height={height}>
              <DatePicker
                label={t('form.end_date')}
                value={value || null}
                onChange={onChange}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                )}
              />
            </CustomDatePickerWrapper>
          )}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
