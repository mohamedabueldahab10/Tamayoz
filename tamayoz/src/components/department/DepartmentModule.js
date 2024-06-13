import { Box, Divider, Tooltip, Typography } from '@mui/material';
import React from 'react';
import styles from '../../assets/css/modules/employee/NewEmployee.module.css';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import CustomizedAutoComplete from '../utilities/CustomizedAutoComplete';
import BackupIcon from '@mui/icons-material/Backup';
import CustomizedLabel from '../utilities/CustomizedLabel';
import StyledCheck from '../utilities/StyledCheck';
import ColorPickerInput from '../utilities/ColorPickerInput';
const currencies = [
  { label: 'Sales', id: 1 },
  { label: 'Trainer', id: 2 },
  { label: 'Consultant', id: 3 },
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
  alignItems: 'start',
  flexDirection: 'column',
  width: '95%',
  mb: '15px',
  mt: '10px',
  padding: '0px 5px',
  borderBottom: '1px solid var(--secondary-color)',
  minWidth: '300px',
};
export default function DepartmentModule() {
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
              {t('department.create_department')}
            </Typography>
          </Box>
          <Divider sx={{ mb: '5px' }} />
          <Box className={styles.formColumn}>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                id="autodepartmentname"
                name="departmentname"
                label={t('department.form.department_name')}
                options={currencies}
                // errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                id="automanagername"
                name="managername"
                label={t('department.form.manager_name')}
                options={currencies}
                // errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                id="autoparentdepartmentname"
                name="parentdepartmentname"
                label={t('department.form.parent_department')}
                options={currencies}
                // errors={errors}
              />
            </Box>
            <Box sx={labelContainerField}>
              <Box>
                <CustomizedLabel>
                  {t('department.form.custom_appraisal_template')}
                </CustomizedLabel>
              </Box>
              <Box>
                <StyledCheck name="customApprasialTemplate" />
              </Box>
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                id="autocompany"
                name="company"
                label={t('department.form.company')}
                options={currencies}
                // errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                id="autoappraisalSurvey"
                name="appraisalSurvey"
                label={t('department.form.appraisal_survey')}
                options={currencies}
                // errors={errors}
              />
            </Box>
            <Box sx={labelContainerField}>
              <Box sx={{ mb: '-5px' }}>
                <CustomizedLabel>{t('company.form.color')}</CustomizedLabel>
              </Box>
              <Box>
                <ColorPickerInput name="color" />
              </Box>
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
        </form>
      </FormProvider>
    </>
  );
}
