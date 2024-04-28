import React from 'react';
import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { useFormContext, Controller } from "react-hook-form";

const Root = styled('div')`
  color: rgba(255,255,255,0.65);
  font-size: 14px;
`;

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
  color:#000;
`;

const InputWrapper = styled('div')`
  width: 230px;
  border: 2px solid var(--primary-color);
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: 'var(--primary-color)';
  }

  &:focused {
    border: '5px solid var(--secondary-color)';
  }

  & input {
    background-color: #fff;
    color: #ccc;
    height: 35px;
    box-sizing: border-box;
    padding: 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;

const Tag = ({ label, onDelete }) => (
  <div style =
  {{
    display: "flex",
    alignItems: "center",
    height: "24px",
    margin: "2px",
    lineHeight: "22px",
    backgroundColor: "var(--secondary-color)",
    border: "1px solid var(--primary-color)",
    borderRadius: "2px",
    boxSizing: "content-box",
    padding: "0 4px 0 10px",
    outline: "0",
    overflow: "hidden",
    color:"var(--primary-color)",
    "&:focus": {
    backgroundColor: "var(--secondary-color)",
    },
    }}
    >
    <span style={{overflow:"hidden", whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{label}</span>
    <CloseIcon sx={{cursor:"pointer",padding:"2px"}} onClick={onDelete} />
  </div>
);

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};


const Listbox = styled('ul')`
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;
  color: #000;
  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: #ccc;
    }
  }

  & li[aria-selected='true'] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: var(--primary-color);
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: #ccc;
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`;

const CustomizedAutoComplete = ({ options, defaultValue, multiple, id, getOptionLabel, label, name, onChange }) => {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id,
    defaultValue,
    multiple,
    options,
    getOptionLabel,
    isOptionEqualToValue: (option, value) => option.id === value.id,
  });
  const { control } = useFormContext();
  
  const handleAutocompleteChange = (event, newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>{label}</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option, index) => (
            <Tag key={index} label={option.label} onDelete={() => {}} {...getTagProps({ index })} />
          ))}
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                {...getInputProps()}
                onChange={(event) => handleAutocompleteChange(event, event.target.value)}
              />
            )}
          />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li key={index} {...getOptionProps({ option, index })}>
              <span>{option.label}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
};

CustomizedAutoComplete.propTypes = {
  options: PropTypes.array.isRequired,
  defaultValue: PropTypes.array,
  multiple: PropTypes.bool,
  id: PropTypes.string.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default CustomizedAutoComplete;