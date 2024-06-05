import { Box, Divider, Modal, Typography } from '@mui/material';
import React from 'react';
import styles from '../../assets/css/modules/employee/NewEmployee.module.css';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import CustomizedAutoComplete from '../utilities/CustomizedAutoComplete';
import BoxModal from '../utilities/BoxModal';
import CloseIcon from '@mui/icons-material/Close';
import CustomizedLabel from '../utilities/CustomizedLabel';
import StyledCheck from '../utilities/StyledCheck';
import ColorPickerInput from '../utilities/ColorPickerInput';
import SecondaryBtn from '../utilities/SecondaryBtn';
import StyledButton from '../utilities/StyledButton';
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
export default function DepartmentModal({ open, handleClose }) {
  const { t } = useTranslation('modules');
  const schema = yup.object().shape({
    employeeName: yup.string().required(t('validation.employee_name')),
    jobPositionName: yup.string().required(t('validation.job_position_name')),
    tags: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(t('validation.tags')),
          id: yup.number().required(t('validation.tags')),
        })
      )
      .min(1, t('validation.tags'))
      .required(t('validation.tags')),
    workMobile: yup.string().required(t('validation.work_mobile')),
    department: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(t('validation.department')),
          id: yup.number().required(t('validation.department')),
        })
      )
      .min(1, t('validation.department'))
      .required(t('validation.department')),
    workPhone: yup.string().required(t('validation.work_phone')),
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
    workMail: yup.string().required(t('validation.work_mail')),
    manager: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(t('validation.manager')),
          id: yup.number().required(t('validation.manager')),
        })
      )
      .min(1, t('validation.manager'))
      .required(t('validation.manager')),
    company: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(t('validation.company')),
          id: yup.number().required(t('validation.company')),
        })
      )
      .min(1, t('validation.company'))
      .required(t('validation.company')),
    coach: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(t('validation.coach')),
          id: yup.number().required(t('validation.coach')),
        })
      )
      .min(1, t('validation.coach'))
      .required(t('validation.coach')),
    date: yup.date().required(t('validation.date')),
  });
  const methods = useForm({
    shouldUnregister: true,
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      employeeName: '',
      workMobile: '',
      workPhone: '',
      jobPositionName: '',
      workMail: '',
      nextAppraisalDate: '',
      tags: [],
      department: [],
      jobPosition: [],
      manager: [],
      company: [],
      coach: [],
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
                  {t('department.create_department')}
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
              <Divider />
              <Box className={styles.ButtonContainer}>
                <StyledButton
                  //   disabled={disableResume}
                  customwidth="120px"
                  customminwidth="100px"
                  //   onClick={() => {
                  //     handleSubmitResume((data) => {
                  //       handleResume(data);
                  //       setOpenResume(false);
                  //       resetResume();
                  //     })();
                  //   }}
                >
                  {t('resume.save_close')}
                </StyledButton>
                <SecondaryBtn
                  customwidth="120px"
                  customminwidth="100px"
                  //   onClick={() => {
                  //     resetResume();
                  //     handleToggleResume();
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
