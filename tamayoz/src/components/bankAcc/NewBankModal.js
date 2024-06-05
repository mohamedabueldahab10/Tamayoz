import { Box, Divider, Modal, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import styles from '../../assets/css/modules/employee/NewEmployee.module.css';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import CustomizedAutoComplete from '../utilities/CustomizedAutoComplete';
import BoxModal from '../utilities/BoxModal';
import TypographyHeader from '../utilities/TypographyHeader';
import StyledInputBase from '../utilities/StyledInputBase';
import PrivateStyles from '../../assets/css/modules/employee/PrivateInfo.module.css';
import ColorPickerInput from '../utilities/ColorPickerInput';
import CustomizedLabel from '../utilities/CustomizedLabel';
import CloseIcon from '@mui/icons-material/Close';
import SecondaryBtn from '../utilities/SecondaryBtn';
import StyledButton from '../utilities/StyledButton';
import CustomSwitcher from '../utilities/CustomSwitcher';
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
const labelContainerField = {
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  width: '100%',
  gap: '10px',
  padding: '0px 5px',
  borderBottom: '1px solid var(--secondary-color)',
  minWidth: '280px',
  maxWidth: '300px',
};

export default function NewBankModal({ open, handleClose }) {
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
                  {t('bank.create_bank')}
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
                    placeholder={t('bank.form.name')}
                    // minWidth="300px"
                    // {...register('employeeName')}
                  />
                  {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                </Box>
                <Box className={styles.singleRow}>
                  <CustomizedAutoComplete
                    defaultValue={[]}
                    id="autobankid"
                    name="bankId"
                    label={t('bank.form.bank_id_code')}
                    options={addresses}
                    multiple
                    //   errors={errors}
                  />
                  {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                </Box>
              </Box>
              {/* -------------------------city state zip country------------- */}
              <Box className={PrivateStyles.privateInfoContainer}>
                <Box className={PrivateStyles.infoSection}>
                  <Box className={styles.formColumn}>
                    <Box className={styles.singleRow}>
                      <StyledInputBase
                        type="text"
                        placeholder={t('form.street')}
                        // {...register('employeeName')}
                      />
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                    <Box className={styles.singleRow}>
                      <StyledInputBase
                        type="text"
                        placeholder={t('form.street2')}
                        // {...register('employeeName')}
                      />
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                  </Box>
                  <Box className={styles.formContainer}>
                    <Box className={styles.singleRow}>
                      <StyledInputBase
                        type="text"
                        placeholder={t('form.city')}
                        minWidth="60px"
                        maxWidth="80px"
                        // {...register('employeeName')}
                      />
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                    <Box className={styles.singleRow}>
                      <CustomizedAutoComplete
                        minWidth="80px"
                        defaultValue={[]}
                        id="autostate"
                        name="state"
                        label={t('form.state')}
                        options={addresses}
                        multiple
                        //   errors={errors}
                      />
                    </Box>
                    <Box className={styles.singleRow}>
                      <StyledInputBase
                        type="text"
                        placeholder={t('form.zip')}
                        minWidth="60px"
                        maxWidth="80px"
                        // {...register('employeeName')}
                      />
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                  </Box>
                  <Box className={styles.formColumn}>
                    <Box className={styles.singleRow}>
                      <CustomizedAutoComplete
                        defaultValue={[]}
                        id="autocountry"
                        name="country"
                        label={t('form.country')}
                        options={addresses}
                        multiple
                        //   errors={errors}
                      />
                    </Box>
                  </Box>
                </Box>

                {/* ==================left side=================== */}
                <Box className={PrivateStyles.infoSection}>
                  <Box className={styles.formColumn}>
                    <Box className={PrivateStyles.singleRow}>
                      <StyledInputBase
                        type="text"
                        placeholder={t('bank.form.bank_phone')}
                        // {...register('bankPhone')}
                      />
                      {/* <ErrorText>{errors.phone?.message}</ErrorText> */}
                    </Box>
                    <Box className={PrivateStyles.singleRow}>
                      <StyledInputBase
                        type="text"
                        placeholder={t('bank.form.bank_mail')}
                        // {...register('bankmail')}
                      />
                      {/* <ErrorText>{errors.mail?.message}</ErrorText> */}
                    </Box>
                  </Box>
                </Box>
              </Box>
              {/* ===================Branches================= */}
              <Divider />
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
