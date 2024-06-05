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
import NewBankModal from './NewBankModal';
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
  padding: '0px 5px',
  borderBottom: '1px solid var(--secondary-color)',
  minWidth: '280px',
  maxWidth: '300px',
};

export default function BankAccountModal({ open, handleClose }) {
  const [bankOpen, setBankOpen] = useState(false);
  const handleCloseBank = () => {
    setBankOpen(false);
  };
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
                  {t('bankaccount.create_bank_acc')}
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

              <Box className={PrivateStyles.privateInfoContainer}>
                <Box className={PrivateStyles.infoSection}>
                  <Box className={styles.formColumn}>
                    <Box className={styles.singleRow}>
                      <StyledInputBase
                        type="text"
                        placeholder={t('bankaccount.form.acc_number')}
                        // minWidth="300px"
                        // {...register('employeeName')}
                      />
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                    <Box className={styles.singleRow}>
                      <CustomizedAutoComplete
                        defaultValue={[]}
                        id="autobank"
                        name="bank"
                        label={t('bankaccount.form.bank')}
                        options={addresses}
                        multiple
                        //   errors={errors}
                        setOpen={() => setBankOpen(true)}
                      />
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                  </Box>
                  {/* -------------------------city state zip country------------- */}
                  <Box className={styles.singleRow}>
                    <StyledInputBase
                      type="text"
                      placeholder={t('bankaccount.form.acc_holder_name')}
                      // {...register('employeeName')}
                    />
                    {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                  </Box>
                  <Box className={styles.singleRow}>
                    <StyledInputBase
                      type="text"
                      placeholder={t('bankaccount.form.acc_holder')}
                      // {...register('employeeName')}
                    />
                  </Box>
                </Box>
                {/* ==================left side=================== */}
                <Box className={PrivateStyles.infoSection}>
                  <Box className={styles.formContainer}>
                    <Box className={PrivateStyles.singleRow}>
                      <CustomizedAutoComplete
                        defaultValue={[]}
                        id="autocompany"
                        name="company"
                        label={t('bankaccount.form.company')}
                        options={addresses}
                        multiple
                        //   errors={errors}
                        // setOpen={() => setCompanyOpen(true)}
                      />
                    </Box>
                    <Box className={PrivateStyles.singleRow}>
                      <StyledInputBase
                        type="text"
                        placeholder={t('bankaccount.form.currency')}
                        // {...register('employeeName')}
                      />
                    </Box>
                  </Box>
                  <Box sx={labelContainerField}>
                    <CustomizedLabel>
                      {t('bankaccount.form.send_money')}
                    </CustomizedLabel>
                    <Box>
                      <CustomSwitcher
                        name="sendMoney"
                        uncheckedlabel={t('bankaccount.form.untrusted')}
                        checkedlabel={t('bankaccount.form.trusted')}
                      />
                    </Box>
                    {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
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
      <NewBankModal open={bankOpen} handleClose={handleCloseBank} />
    </>
  );
}
