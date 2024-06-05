import { Box } from '@mui/material';
import styled from 'styled-components';

const BoxModal = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  max-width: 1000px;
  width: 100%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 24;
  padding: 10px 20px;
`;
export default BoxModal;
