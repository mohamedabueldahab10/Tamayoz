import React from 'react';
import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { useFormContext, Controller, useController } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ErrorText from './ErrorText';
const InputWrapper = styled('div')`
  width: 230px;
  border: 1px solid var(--secondary-color);
  border-inline: none !important;
  border-top: none !important;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
   &:focus-within {
    border: 2px solid var(--primary-color);
  }
  & input {
    background-color: #fff;
    color: var(--primary-color);
    height: 35px;
    box-sizing: border-box;
    padding: 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
    &::placeholder {
      font-size: 18px;
      color: #ccc;
      letter-spacing: 0.5px;
    }
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
  top: 100%;
  left: 0;
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

const CustomizedAutoComplete = ({ options, defaultValue, multiple, id, getOptionLabel,label, name, errors}) => {
  const { control, setValue } = useFormContext();
  const {field} = useController({name}); 
  const handleAutocompleteChange = (event, newValue) => {
    setValue(name, newValue, { shouldValidate: true });
  };
  const {
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
    onChange:handleAutocompleteChange,
  });
  return (
    <>
      <div>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option, index) => (
            <Tag label={option.label} {...getTagProps({ index })} />
          ))}
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
            <input
            {...field} 
            value={value}
            {...getInputProps()} 
            placeholder={label}
            />
            )}
        />
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>
                <span>{option.label}</span>
                <CheckIcon fontSize="small" />
              </li>
            ))}
          </Listbox>
        ) : null}
        </InputWrapper>
        {errors && <ErrorText>{errors[name]?.message}</ErrorText> }
      </div>
    </>
  );
};

CustomizedAutoComplete.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultValue: PropTypes.arrayOf(PropTypes.object),
  multiple: PropTypes.bool,
  id: PropTypes.string,
  getOptionLabel: PropTypes.func,
};
CustomizedAutoComplete.defaultProps = {
  defaultValue: [],
  multiple: false,
  id: 'customized-autocomplete',
};

export default CustomizedAutoComplete;
