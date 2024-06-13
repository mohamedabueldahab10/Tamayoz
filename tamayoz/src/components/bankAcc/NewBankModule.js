import { Box, Divider, Tooltip, Typography } from '@mui/material';
import React from 'react';
import styles from '../../assets/css/modules/employee/NewEmployee.module.css';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import CustomizedAutoComplete from '../utilities/CustomizedAutoComplete';
import StyledInputBase from '../utilities/StyledInputBase';
import PrivateStyles from '../../assets/css/modules/employee/PrivateInfo.module.css';
import BackupIcon from '@mui/icons-material/Backup';
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
export default function NewBankModule() {
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
              {t('bank.create_bank')}
            </Typography>
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
                    minWidth="100px"
                    // {...register('employeeName')}
                  />
                  {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                </Box>
                <Box className={styles.singleRow}>
                  <CustomizedAutoComplete
                    minWidth="180px"
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
                    minWidth="100px"
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
        </form>
      </FormProvider>
    </>
  );
}
