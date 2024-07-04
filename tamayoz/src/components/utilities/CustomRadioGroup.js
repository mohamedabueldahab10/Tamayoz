import React from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import ErrorText from './ErrorText';

const CustomRadioGroup = ({ name, options, errors }) => {
  const { control } = useFormContext();

  console.log('RadioGroup Data =========', options);
  return (
    <>
      <div>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              {options
                ? options.length > 0 &&
                  options?.map((option) => (
                    <FormControlLabel
                      key={option.id}
                      value={option.name}
                      control={
                        <Radio
                          sx={{ '& .MuiSvgIcon-root': { fontSize: '16px' } }}
                        />
                      }
                      label={option.name}
                      defaultValue=""
                    />
                  ))
                : []}
            </RadioGroup>
          )}
        />
        {errors && <ErrorText>{errors[name]?.message}</ErrorText>}
      </div>
    </>
  );
};

export default CustomRadioGroup;
