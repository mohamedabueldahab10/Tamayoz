import { FormLabel } from '@mui/material';
import styled from 'styled-components';
const CustomizedLabel = styled(FormLabel)(() => ({
  fontSize: '18px !important',
  color: '#ccc !important',
  letterSpacing: '0.5px !important',
  fontWeight: '400 !important',
}));

export default CustomizedLabel;
