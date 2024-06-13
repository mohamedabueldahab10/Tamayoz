import { Box, Divider, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import styles from '../../assets/css/modules/employee/NewEmployee.module.css';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import CustomizedAutoComplete from '../utilities/CustomizedAutoComplete';
import StyledInputBase from '../utilities/StyledInputBase';
import PrivateStyles from '../../assets/css/modules/employee/PrivateInfo.module.css';
import CustomizedLabel from '../utilities/CustomizedLabel';
import BackupIcon from '@mui/icons-material/Backup';
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

export default function BankAccountModule() {
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
  const [bankOpen, setBankOpen] = useState(false);
  const handleCloseBank = () => {
    setBankOpen(false);
  };
  const handleFormSubmit = async (data) => {
    console.log('Employee Data', data);
  };
  return (
    <>
      <Box className={styles.headerInfo}>
        <Tooltip title="Save">
          <BackupIcon
            sx={{
              color: 'var(--primary-color)',
              fontSize: '28px',
              cursor: 'pointer',
            }}
            onClick={() => methods.handleSubmit(handleFormSubmit)()}
          />
        </Tooltip>
      </Box>
      <FormProvider {...methods}>
        <form
          style={{ width: '100%' }}
          onSubmit={methods.handleSubmit(handleFormSubmit)}
        >
          <Box sx={headModalStyle}>
            <Typography color="var(--dark-color)" fontWeight="bold">
              {t('bankaccount.create_bank_acc')}
            </Typography>
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
        </form>
      </FormProvider>
      <NewBankModal open={bankOpen} handleClose={handleCloseBank} />
    </>
  );
}
