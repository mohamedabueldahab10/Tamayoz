import React from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import ErrorText from './ErrorText';

const CustomRadioGroup = ({ name, options, errors }) => {
  const { control } = useFormContext();

  console.log('RadioGroup OOOO', errors);
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
                  key={option.id}
                  value={option.label}
                  control={
                    <Radio
                      sx={{ '& .MuiSvgIcon-root': { fontSize: '16px' } }}
                    />
                  }
                  label={option.label}
                  defaultValue=""
                />
              ))}
            </RadioGroup>
          )}
        />
        {errors && <ErrorText>{errors[name]?.message}</ErrorText>}
      </div>
    </>
  );
};

export default CustomRadioGroup;
