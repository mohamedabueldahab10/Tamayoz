// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { useAutocomplete } from '@mui/base/useAutocomplete';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';
// import { autocompleteClasses } from '@mui/material/Autocomplete';
// import { useFormContext, Controller } from 'react-hook-form';
// import AddIcon from '@mui/icons-material/Add';
// import ErrorText from './ErrorText';
// import { Box, CircularProgress, InputBase } from '@mui/material';
// const CreationLI = styled('li')`
//   cursor: pointer;
//   color: var(--primary-color);
//   &:hover {
//     background-color: #fafafa;
//     font-weight: 600;
//   }
// `;
// const NoRecords = styled('li')`
//   color: var(--primary-color);
// `;
// const InputWrapper = styled('div')`
//   min-width: ${(props) => props.minWidth || '300px'};
//   border: 1px solid var(--secondary-color);
//   border-inline: none !important;
//   border-top: none !important;
//   padding: 1px;
//   display: flex;
//   flex-wrap: wrap;
//   position: relative;
//   &:focus-within {
//     border: 2px solid var(--primary-color);
//   }
//   & input {
//     background-color: #fff;
//     color: var(--primary-color);
//     height: 35px;
//     box-sizing: border-box;
//     padding: 6px;
//     width: 0;
//     min-width: 30px;
//     flex-grow: 1;
//     border: 0;
//     margin: 0;
//     outline: 0;
//     &::placeholder {
//       font-size: 18px;
//       color: #5f5f5f;
//       letter-spacing: 0.5px;
//     }
//   }
// `;

// const Tag = ({ label, onDelete }) => (
//   <div
//     style={{
//       display: 'flex',
//       alignItems: 'center',
//       height: '24px',
//       margin: '2px',
//       lineHeight: '22px',
//       backgroundColor: 'var(--secondary-color)',
//       border: '1px solid var(--primary-color)',
//       borderRadius: '2px',
//       boxSizing: 'content-box',
//       padding: '0 4px 0 10px',
//       outline: '0',
//       overflow: 'hidden',
//       color: 'var(--primary-color)',
//       zIndex: '2',
//       '&:focus': {
//         backgroundColor: 'var(--secondary-color)',
//       },
//     }}
//   >
//     <span
//       style={{
//         overflow: 'hidden',
//         whiteSpace: 'nowrap',
//         textOverflow: 'ellipsis',
//       }}
//     >
//       {label}
//     </span>
//     <CloseIcon sx={{ cursor: 'pointer', padding: '2px' }} onClick={onDelete} />
//   </div>
// );

// Tag.propTypes = {
//   label: PropTypes.string.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

// const Listbox = styled('ul')`
//   width: 300px;
//   margin: 2px 0 0;
//   padding: 0;
//   position: absolute;
//   top: 100%;
//   left: 0;
//   list-style: none;
//   background-color: #fff;
//   overflow: auto;
//   max-height: 250px;
//   border-radius: 4px;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
//   z-index: 3;
//   color: #000;
//   & li {
//     padding: 5px 12px;
//     display: flex;

//     & span {
//       flex-grow: 1;
//     }

//     & svg {
//       color: #ccc;
//     }
//   }

//   & li[aria-selected='true'] {
//     background-color: #fafafa;
//     font-weight: 600;

//     & svg {
//       color: var(--primary-color);
//     }
//   }

//   & li.${autocompleteClasses.focused} {
//     background-color: #ccc;
//     cursor: pointer;

//     & svg {
//       color: currentColor;
//     }
//   }
// `;

// const CustomizedAutoComplete = ({
//   options,
//   defaultValue,
//   multiple,
//   id,
//   getOptionLabel,
//   label,
//   name,
//   errors,
//   setOpen,
//   minWidth,
//   isOptionEqualToValue,
//   handleNextPage,
//   fetchNextPage,
//   hasNextPage,
//   isFetchingNextPage,
//   isError,
//   error,
//   control,
// }) => {
//   const { setValue } = useFormContext();
//   const [inputValue, setInputValue] = useState('');
//   const [selectedValue, setSelectedValue] = useState(defaultValue);
//   useEffect(() => {
//     // When defaultValue changes, update the local state
//     setSelectedValue(defaultValue);
//   }, [defaultValue]);

//   const handleAutocompleteChange = (event, newValue) => {
//     const valueToSet = newValue
//       ? Array.isArray(newValue)
//         ? newValue
//         : [newValue]
//       : [];
//     setValue(name, valueToSet, { shouldValidate: true });
//     setSelectedValue(valueToSet);
//   };

//   const handleInputChange = (event, newInputValue) => {
//     setInputValue(newInputValue);
//   };

//   const handleCreationOption = () => {
//     setOpen(true);
//   };

//   const {
//     getInputProps,
//     getTagProps,
//     getListboxProps,
//     getOptionProps,
//     groupedOptions,
//     value,
//     focused,
//     setAnchorEl,
//   } = useAutocomplete({
//     id,
//     defaultValue,
//     multiple,
//     options,
//     getOptionLabel,
//     isOptionEqualToValue,
//     onChange: handleAutocompleteChange,
//     inputValue,
//     onInputChange: handleInputChange,
//     value: selectedValue, // Use selectedValue to manage the selected options
//   });

//   return (
//     <>
//       <Box sx={{ minWidth }}>
//         <InputWrapper
//           ref={setAnchorEl}
//           className={focused ? 'focused' : ''}
//           minWidth={minWidth}
//         >
//           {selectedValue.map((option, index) => (
//             <Tag
//               label={option.name}
//               key={`tag-${option.id}`}
//               {...getTagProps({ index })}
//             />
//           ))}
//           <Controller
//             name={name}
//             control={control}
//             render={({ field }) => (
//               <InputBase
//                 sx={{
//                   width: '100%',
//                   '::placeholder': {
//                     fontSize: '18px',
//                     color: 'red',
//                     letterSpacing: '0.5px',
//                   },
//                 }}
//                 {...field}
//                 value={inputValue}
//                 inputProps={{ ...getInputProps(), placeholder: label }}
//               />
//             )}
//           />
//           {groupedOptions.length > 0 || inputValue ? (
//             <Listbox {...getListboxProps()}>
//               {groupedOptions.map((option, index) => (
//                 <li
//                   key={`option-${option.id}`}
//                   {...getOptionProps({ option, index })}
//                 >
//                   <span>{option.name}</span>
//                   <CheckIcon fontSize="small" />
//                 </li>
//               ))}
//               {hasNextPage !== undefined ? (
//                 <NoRecords onClick={handleNextPage}>
//                   <span style={{ cursor: 'pointer' }}>Load More</span>
//                   {/* <AddIcon fontSize="small" /> */}
//                 </NoRecords>
//               ) : (
//                 <></>
//               )}
//               {isFetchingNextPage && (
//                 <NoRecords>
//                   <CircularProgress size={24} />
//                 </NoRecords>
//               )}
//               {isError && (
//                 <NoRecords>
//                   <span>Error: {error.message}</span>
//                 </NoRecords>
//               )}
//               {setOpen
//                 ? inputValue && (
//                     <CreationLI onClick={handleCreationOption}>
//                       <span>Create "{inputValue}"</span>
//                       <AddIcon fontSize="small" />
//                     </CreationLI>
//                   )
//                 : inputValue && (
//                     <NoRecords>
//                       <span>No records</span>
//                     </NoRecords>
//                   )}
//             </Listbox>
//           ) : null}
//         </InputWrapper>
//         {errors && <ErrorText>{errors[name]?.message}</ErrorText>}
//       </Box>
//     </>
//   );
// };

// CustomizedAutoComplete.propTypes = {
//   options: PropTypes.arrayOf(PropTypes.object).isRequired,
//   defaultValue: PropTypes.arrayOf(PropTypes.object),
//   multiple: PropTypes.bool,
//   id: PropTypes.string,
//   getOptionLabel: PropTypes.func,
//   label: PropTypes.string,
//   name: PropTypes.string,
//   errors: PropTypes.object,
//   setOpen: PropTypes.func,
//   minWidth: PropTypes.string,
//   isOptionEqualToValue: PropTypes.func,
//   fetchNextPage: PropTypes.func,
//   handleNextPage: PropTypes.func,
//   hasNextPage: PropTypes.bool,
//   isFetchingNextPage: PropTypes.bool,
//   isError: PropTypes.bool,
//   error: PropTypes.object,
//   control: PropTypes.object.isRequired,
// };

// CustomizedAutoComplete.defaultProps = {
//   defaultValue: [],
//   multiple: false,
//   id: 'customized-autocomplete',
//   minWidth: '300px',
//   getOptionLabel: (option) => option.label,
//   label: '',
//   name: '',
//   errors: {},
//   setOpen: null,
//   isOptionEqualToValue: (option, value) => option.id === value.id,
// };

// export default CustomizedAutoComplete;
import React, { useState } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { Controller } from 'react-hook-form';

const AutoComplete = ({
  control,
  name,
  label,
  loadMoreOptions,
  createNewOption,
  options,
  loading,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [localOptions, setLocalOptions] = useState(options);

  const handleLoadMore = async () => {
    const moreOptions = await loadMoreOptions();
    setLocalOptions((prevOptions) => [...prevOptions, ...moreOptions]);
  };

  const handleCreateNewOption = () => {
    createNewOption(inputValue);
    setLocalOptions((prevOptions) => [
      ...prevOptions,
      { label: inputValue, value: inputValue },
    ]);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={[...localOptions, { label: 'Load more...', loadMore: true }]}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          getOptionLabel={(option) => option.label || ''}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          filterOptions={(options, { inputValue }) => {
            const filtered = options.filter((option) =>
              option.label.toLowerCase().includes(inputValue.toLowerCase())
            );

            if (filtered.length === 0) {
              filtered.push({
                label: `No Records. Create "${inputValue}"?`,
                create: true,
              });
            }

            return filtered;
          }}
          onChange={(event, newValue) => {
            if (newValue?.loadMore) {
              handleLoadMore();
            } else if (newValue?.create) {
              handleCreateNewOption();
            } else {
              field.onChange(newValue);
            }
          }}
        />
      )}
    />
  );
};

export default AutoComplete;
