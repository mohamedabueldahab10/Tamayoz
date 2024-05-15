import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const ReusableAutoComplete = ({ options, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddNewOption = () => {
    if (inputValue.trim() !== '') {
      onChange([...options, inputValue]);
      setInputValue('');
    }
  };

  return (
    <Autocomplete
      multiple
      options={options}
      value={options}
      onChange={(event, value) => onChange(value)}
      inputValue={inputValue}
      onInputChange={(event, value) => setInputValue(value)}
      isOptionEqualToValue={(option, value) => option === value}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <div key={index} {...getTagProps({ index })}>
            {option}
          </div>
        ))
      }
      renderOption={(option) => option}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Select or add"
          placeholder="Type something..."
          InputProps={{
            ...params.InputProps,
            onBlur: (event) => {
              handleAddNewOption();
              params.InputProps.onBlur(event);
            },
          }}
        />
      )}
    />
  );
};

export default ReusableAutoComplete;
