import { InputBase } from '@mui/material';
import styled from 'styled-components';
const StyledInputBase = styled(InputBase)(() => ({
  // width: "100%",
  maxWidth: `${(props) => (props.maxwidth ? props.maxwidth : '250px')}`,
  minWidth: '230px',
  '& .MuiInputBase-input': {
    color: 'var(--primary-color)',
    width: '100%',
    border: '1px solid var(--secondary-color)',
    borderInline: 'none !important',
    borderTop: 'none !important',
    padding: '7px',
    display: `${(props) => (props.variant === 'flex' ? 'flex' : '')}`,
    transition: 'box-shadow .5s',
    background: '#fff',
    '&::placeholder': {
      fontSize: '18px',
      color: '#5f5f5f',
      fontWeight: '500',
      letterSpacing: '0.5px',
    },
    '&:focus': {
      border: '2px solid var(--primary-color)',
      borderInline: 'none !important',
      borderTop: 'none !important',
    },
  },
}));
export default StyledInputBase;
