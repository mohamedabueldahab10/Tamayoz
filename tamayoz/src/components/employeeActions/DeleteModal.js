import React from 'react';
import {
  Box,
  Modal,
  Snackbar,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import StyledButton from '../utilities/StyledButton';
import TypographyHeader from '../utilities/TypographyHeader';
import styled from 'styled-components';
import AxiosInstance from '../helpers/AxiosInstance';
const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  max-width: 600px;
  width: 60%;
  height: 40vh;
  background: #fff;
  border-radius: 5px;
  box-shadow: 24;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 20px;
`;
export default function DeleteModal(props) {
  const { t } = useTranslation('modules');
  const instance = AxiosInstance();
  const [snack, setSnack] = useState(false);
  const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack(false);
  };
  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    setIsLoading(true);
    setDisable(true);
    instance
      .delete(`/Employee/DeleteData`, { data: [props.currentRow.id] })
      .then((res) => {
        setIsLoading(false);
        setDisable(false);
      })
      .then(() => {
        props.setOpenDeleteModal(false);
        props.fetchData();
      })
      .catch((err) => {
        setSnack(true);
        setIsLoading(false);
        setDisable(false);
      });
  };
  return (
    <div>
      <Modal open={props.openDeleteModal}>
        <form onSubmit={handleSubmit}>
          <ModalContainer>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0 60px 0',
              }}
            >
              <WarningAmberOutlinedIcon
                sx={{
                  transform: 'Scale(2.8)',
                  margin: '0 30px 0 0',
                  color: '#ffb121',
                }}
              />
              <TypographyHeader>{t('delete.are_you_sure')}</TypographyHeader>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
              }}
            >
              <StyledButton
                small="true"
                onClick={() => {
                  props.setOpenDeleteModal(false);
                }}
              >
                {t('delete.undo_delete')}
              </StyledButton>
              <StyledButton small="true" disabled={disable} type="submit">
                {isLoading ? <CircularProgress /> : t('delete.confirm_delete')}
              </StyledButton>
            </Box>
          </ModalContainer>
        </form>
      </Modal>
      <Box>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={snack}
            autoHideDuration={4500}
            onClose={handleClose}
          >
            <Alert severity="error" sx={{ width: '100%' }}>
              {t('delete.error')}
            </Alert>
          </Snackbar>
        </Stack>
      </Box>
    </div>
  );
}
