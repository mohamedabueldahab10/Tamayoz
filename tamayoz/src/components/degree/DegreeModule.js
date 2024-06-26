import {
  Box,
  Divider,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import styles from '../../assets/css/modules/employee/NewEmployee.module.css';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import CustomizedAutoComplete from '../utilities/CustomizedAutoComplete';
import BackupIcon from '@mui/icons-material/Backup';
import StyledInputBase from '../utilities/StyledInputBase';
import JobPositionModal from '../jobPosition/JobPositionModal';
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
export default function DegreeModule() {
  const { t } = useTranslation('modules');
  const schema = yup.object().shape({
    name: yup.string().required(t('validation.employee_name')),
    jobPosition: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(t('validation.job_position')),
          id: yup.number().required(t('validation.job_position')),
        })
      )
      .min(1, t('validation.job_position'))
      .required(t('validation.job_position')),
  });
  const methods = useForm({
    shouldUnregister: true,
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      code: '',
      name: '',
      jobPosition: [],
      description: '',
    },
  });
  const [openJobPosition, setOpenJobPosition] = useState(false);
  const handleCloseJobPosition = () => {
    setOpenJobPosition(false);
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
              {t('degree.create_degree')}
            </Typography>
          </Box>
          <Divider sx={{ mb: '5px' }} />
          <Box className={styles.formColumn}>
            <Box className={styles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('degree.form.code')}
                // minWidth="300px"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={styles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('degree.form.name')}
                // minWidth="300px"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                id="autoparentjobposition"
                name="jobPosition"
                label={t('degree.form.job_position')}
                options={currencies}
                multiple
                // errors={errors}
                setOpen={() => setOpenJobPosition(true)}
              />
            </Box>
            {/* <Box className={styles.singleRow}> */}
            <Box sx={{ width: '100%', paddingBlock: '20px' }}>
              <TextField
                // {...register('employeeName')}
                label={t('degree.form.description')}
                fullWidth
                multiline
                rows={5}
                id="fullWidth"
              />
            </Box>
            {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
          </Box>
          {/* </Box> */}
        </form>
      </FormProvider>
      <JobPositionModal
        open={openJobPosition}
        handleClose={handleCloseJobPosition}
      />
    </>
  );
}
