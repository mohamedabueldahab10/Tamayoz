import React from 'react';
import ErrorText from './ErrorText';
import styles from '../../assets/css/modules/auth/Login.module.css';
import { InputAdornment, InputBase } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useFormContext } from 'react-hook-form';

const PasswordInput = (props) => {
  const { register } = useFormContext();

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputGroup}>
        <InputBase
          type="password"
          className={styles.input}
          {...props.input}
          {...register(props.name)}
          placeholder={props.placeholder}
          startAdornment={
            <InputAdornment position="start">
              <LockOpenIcon sx={{ color: 'var(--primary-color)' }} />
            </InputAdornment>
          }
        />
      </div>
      {props.error ? <ErrorText>{props.error.message}</ErrorText> : null}
    </div>
  );
};

export default PasswordInput;
