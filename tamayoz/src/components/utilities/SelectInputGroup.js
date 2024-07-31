import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { InputBase, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from '../../assets/css/modules/SelectInputGroup.module.css';

const InputStyle = styled(InputBase)(({ theme }) => ({
  ' .MuiInputBase-input': {
    position: 'relative',
    borderBottom: '1px solid #ccc',
    borderRadius: '0px',
    // background: '#FFFFFF 0% 0% no-repeat padding-box',
    // boxShadow: '0px 0px 6px #010E3F26',
    color: 'var(--primary-color)',
    fontSize: '18px',
    padding: '16px 27px 8px px',
    '&:focus': {
      borderRadius: '0px',
      borderBottom: '2px solid var(--primary-color)',
    },
  },
}));

export default function SelectInputGroup(props) {
  console.log(props);
  const { name, id } = props;
  const { control } = useFormContext();
  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <Controller
          name={name}
          control={control}
          rules={
            props.applyRules ? { required: `${props.errorMassage}` } : null
          }
          render={({ field }) => (
            <Select
              disabled={props.disabled}
              {...field}
              displayEmpty
              variant="outlined"
              placeholder="Manager"
              sx={{ width: '300px', minWidth: '300px' }}
              input={<InputStyle />}
            >
              <MenuItem
                sx={{ color: 'var(--secondary-color)' }}
                value={''}
                disabled
              >
                {props.placeholder}
              </MenuItem>
              {props.items.map((item, index) => (
                <MenuItem key={item.name} value={id ? item.id : index + 1}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </div>
      {props.error ? (
        <p className={styles.error}>{props.error.message}</p>
      ) : null}
    </div>
  );
}
