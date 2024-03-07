import React from 'react'
import styles from "../../assets/css/modules/auth/Login.module.css";
import ErrorText from './ErrorText';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {InputAdornment,InputBase} from '@mui/material';
import { useFormContext } from "react-hook-form";

const LoginInputUser = (props) => {
  const { register } = useFormContext();

  return (
      <div className={styles.inputContainer}>
          <div className={styles.inputGroup}>
           <InputBase 
            className={styles.input}
           {...props.input}
           {...register(props.name)}
            placeholder='Email address or Phone Number'
            startAdornment={
              <InputAdornment position="start">
                <PersonOutlineIcon sx={{color:"var(--primary-color)"}} />
              </InputAdornment>
            }
            />
          </div>
          {props.error ? <ErrorText>{props.error.message}</ErrorText> : null}
        </div>

  )
}

export default LoginInputUser
