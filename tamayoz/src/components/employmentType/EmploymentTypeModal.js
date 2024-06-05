import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Divider, Modal, Typography } from '@mui/material';
import BoxModal from '../utilities/BoxModal';
import CloseIcon from '@mui/icons-material/Close';
import StyledButton from '../utilities/StyledButton';
import SecondaryBtn from '../utilities/SecondaryBtn';
import styles from '../../assets/css/modules/employee/NewEmployee.module.css';
import StyledInputBase from '../utilities/StyledInputBase';
import CustomizedAutoComplete from '../utilities/CustomizedAutoComplete';
const addresses = [
  { label: 'IT', id: 1 },
  { label: 'Languages', id: 2 },
  { label: 'Marketing', id: 3 },
  { label: 'Programming', id: 4 },
  { label: 'Soft Skills', id: 5 },
];
const headModalStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'start',
  padding: '15px 5px',
  width: '100%',
};
export default function EmploymentTypeModal({ open, handleClose }) {
  const { t } = useTranslation('modules');
  const schema = yup.object().shape({
    employeeName: yup.string().required(t('validation.employee_name')),
  });
  const methods = useForm({
    shouldUnregister: true,
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      employeeName: '',
    },
  });
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <FormProvider {...methods}>
          <form>
            <BoxModal>
              <Box sx={headModalStyle}>
                <Typography color="var(--dark-color)" fontWeight="bold">
                  {t('emplymenttype.create_employmenttype')}
                </Typography>
                <Box
                  sx={{
                    width: '20px',
                    height: '20px',
                    display: 'grid',
                    placeItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <CloseIcon onClick={handleClose} />
                </Box>
              </Box>
              <Divider sx={{ mb: '5px' }} />
              <Box className={styles.formColumn}>
                <Box className={styles.singleRow}>
                  <StyledInputBase
                    type="text"
                    placeholder={t('emplymenttype.form.name')}
                    //   {...register('companyName')}
                  />
                  <Box>
                    {/* <ErrorText>{errors.companyName?.message}</ErrorText> */}
                  </Box>
                </Box>
                <Box className={styles.singleRow}>
                  <CustomizedAutoComplete
                    defaultValue={[]}
                    id="autocountry"
                    name="country"
                    label={t('emplymenttype.form.country')}
                    options={addresses}
                    multiple
                    //   errors={errors}
                    // setOpen={() => setDepartmentOpen(true)}
                  />
                </Box>
              </Box>
              <Divider sx={{ mt: '10px' }} />
              <Box className={styles.ButtonContainer}>
                <StyledButton
                  //   disabled={disableSkills}
                  customwidth="120px"
                  customminwidth="100px"
                  type="submit"
                  //   onClick={() => {
                  //     handleSubmitSkills((data) => {
                  //       handleSkills(data);
                  //       setOpenSkills(false);
                  //       resetSkills();
                  //     })();
                  //   }}
                >
                  {t('resume.save_close')}
                </StyledButton>
                <SecondaryBtn
                  customwidth="120px"
                  customminwidth="100px"
                  //   onClick={() => {
                  //     resetSkills();
                  //     handleToggleSkills();
                  //   }}
                >
                  {t('resume.discard')}
                </SecondaryBtn>
              </Box>
            </BoxModal>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}
