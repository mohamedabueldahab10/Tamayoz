import React from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Controller } from 'react-hook-form';
import ErrorText from './ErrorText';

const CustomRadioGroup = ({ name, options, control, error }) => {
  return (
    <>
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup {...field}>
            {options.map((option) => (
              <FormControlLabel 
                key={option.value} 
                value={option.value} 
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: '16px' } }} />} 
                label={option.label}
              />
            ))}
          </RadioGroup>
        )}
      />
    </div>
      {error && <ErrorText error>{error.message}</ErrorText>}
    </>
  );
};

export default CustomRadioGroup;
