import React from 'react';
import { Controller } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import ErrorText from './ErrorText';
import { useTranslation } from 'react-i18next';

const CustomDatePicker = ({ control, name }) => {
  const { t } = useTranslation('modules');
  const startName = `${name}.start`;
  const endName = `${name}.end`;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{ display: 'flex', gap: 4, maxWidth: '600px', flexWrap: 'wrap' }}
      >
        <Controller
          name={startName}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DatePicker
              label={t('form.start_date')}
              value={value || null}
              onChange={onChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : ''}
                />
              )}
            />
          )}
        />
        <Controller
          name={endName}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DatePicker
              label={t('form.end_date')}
              value={value || null}
              onChange={onChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : ''}
                />
              )}
            />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
