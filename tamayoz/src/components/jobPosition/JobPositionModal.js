import {
  Box,
  Divider,
  InputAdornment,
  Modal,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import styles from '../../assets/css/modules/employee/NewEmployee.module.css';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import CustomizedAutoComplete from '../utilities/CustomizedAutoComplete';
import BoxModal from '../utilities/BoxModal';
import StyledInputBase from '../utilities/StyledInputBase';
import PrivateStyles from '../../assets/css/modules/employee/PrivateInfo.module.css';
import CustomizedLabel from '../utilities/CustomizedLabel';
import CloseIcon from '@mui/icons-material/Close';
import SecondaryBtn from '../utilities/SecondaryBtn';
import StyledButton from '../utilities/StyledButton';
import CompanyModal from '../company/CompanyModal';
import DepartmentModal from '../department/DepartmentModal';
import StyledCheck from '../utilities/StyledCheck';
import EmploymentTypeModal from '../employmentType/EmploymentTypeModal';
import TypographyHeader from '../utilities/TypographyHeader';
const addresses = [
  { label: 'IT', id: 1 },
  { label: 'Languages', id: 2 },
  { label: 'Marketing', id: 3 },
  { label: 'Programming', id: 4 },
  { label: 'Soft Skills', id: 5 },
];
const tabStyle = {
  color: 'var(--dark-color)',
  fontSize: '14px',
  fontWeight: 'bold',
  cursor: 'pointer',
};
const headModalStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'start',
  padding: '15px 5px',
  width: '100%',
};
const labelContainerCheck = {
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  width: '95%',
  padding: '0px 5px',
  borderBottom: '1px solid var(--secondary-color)',
  minWidth: '300px',
};
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function JobPositionModal({ open, handleClose }) {
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const handleCloseDepartment = () => {
    setDepartmentOpen(false);
  };
  const [companyOpen, setCompanyOpen] = useState(false);
  const handleCloseCompany = () => {
    setCompanyOpen(false);
  };
  const [employmentTypeOpen, setEmploymentTypeOpen] = useState(false);
  const handleCloseEmployment = () => {
    setEmploymentTypeOpen(false);
  };
  const { t } = useTranslation('modules');
  const schema = yup.object().shape({
    jobPosition: yup.string().required(t('validation.job_position_name')),
  });
  const methods = useForm({
    shouldUnregister: true,
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      jobPosition: [],
    },
  });
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <FormProvider {...methods}>
          <form>
            <BoxModal>
              <Box sx={headModalStyle}>
                <Typography color="var(--dark-color)" fontWeight="bold">
                  {t('jobposition.create_jobposition')}
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
              <Box className={styles.nameInfo}>
                <Box className={styles.fullSingleRow}>
                  <Box sx={{ width: '100%' }}>
                    <StyledInputBase
                      type="text"
                      sx={{ width: '100%' }}
                      minWidth="300px"
                      maxWidth="500px"
                      placeholder={t('jobposition.form.job_position')}
                      //   {...register('companyName')}
                      variant="flex"
                    />
                  </Box>
                  <Box>
                    {/* <ErrorText>{errors.companyName?.message}</ErrorText> */}
                  </Box>
                </Box>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    sx={{
                      mt: '20px',
                      width: 'fit-content',
                      '& .Mui-selected': {
                        border: '1px solid var(--primary-color)',
                      },
                      display: 'flex',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Tab
                      sx={tabStyle}
                      label={t('jobposition.recruitment')}
                      {...a11yProps(0)}
                    />
                    <Tab
                      sx={tabStyle}
                      label={t('jobposition.job_summary')}
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </Box>
                {/* ===================Recruitment================= */}
                <CustomTabPanel value={tabValue} index={0}>
                  <Box className={PrivateStyles.privateInfoContainer}>
                    {/* =============right left========= */}
                    <Box className={PrivateStyles.infoSection}>
                      <Box className={styles.formColumn}>
                        <Box className={styles.singleRow}>
                          <CustomizedAutoComplete
                            defaultValue={[]}
                            id="autodepartment"
                            name="department"
                            label={t('jobposition.form.department')}
                            options={addresses}
                            multiple
                            //   errors={errors}
                            setOpen={() => setDepartmentOpen(true)}
                          />
                        </Box>
                        <Box className={styles.singleRow}>
                          <StyledInputBase
                            type="text"
                            placeholder={t('jobposition.form.email')}
                            // minWidth="500px"
                            // {...register('employeeName')}
                          />
                          {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                        </Box>
                      </Box>
                      <Box className={styles.singleRow}>
                        <CustomizedAutoComplete
                          defaultValue={[]}
                          id="autoemployment"
                          name="employmentType"
                          label={t('jobposition.form.employment_type')}
                          options={addresses}
                          multiple
                          //   errors={errors}
                          setOpen={() => setEmploymentTypeOpen(true)}
                        />
                      </Box>
                      <Box className={styles.singleRow}>
                        <CustomizedAutoComplete
                          defaultValue={[]}
                          id="autoemployment"
                          name="employmentType"
                          label={t('jobposition.form.company')}
                          options={addresses}
                          multiple
                          //   errors={errors}
                          setOpen={() => setCompanyOpen(true)}
                        />
                      </Box>
                    </Box>
                    {/* =============right section========= */}
                    <Box className={PrivateStyles.infoSection}>
                      <Box className={styles.formColumn}>
                        <Box className={PrivateStyles.singleRow}>
                          <StyledInputBase
                            type="number"
                            placeholder={t('jobposition.form.target')}
                            inputProps={{
                              min: '1',
                              step: '1',
                              'aria-label': 'target',
                            }}
                            // {...register('employeeName')}
                            endAdornment={
                              <InputAdornment position="end">
                                {t('jobposition.form.new_employee_target')}
                              </InputAdornment>
                            }
                          />
                          {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                        </Box>
                        <Box sx={labelContainerCheck}>
                          <Box>
                            <CustomizedLabel>
                              {t('jobposition.form.ispublished')}
                            </CustomizedLabel>
                          </Box>
                          <Box>
                            <StyledCheck name="isPublished" />
                          </Box>
                          {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                        </Box>
                        <Box className={PrivateStyles.singleRow}>
                          <CustomizedAutoComplete
                            defaultValue={[]}
                            id="autowebsite"
                            name="website"
                            label={t('jobposition.form.website')}
                            options={addresses}
                            multiple
                            //   errors={errors}
                          />
                        </Box>
                        <Box className={PrivateStyles.singleRow}>
                          <CustomizedAutoComplete
                            defaultValue={[]}
                            id="autointerviewers"
                            name="interviewers"
                            label={t('jobposition.form.interviewers')}
                            options={addresses}
                            multiple
                            //   errors={errors}
                          />
                        </Box>
                        <Box className={PrivateStyles.singleRow}>
                          <CustomizedAutoComplete
                            defaultValue={[]}
                            id="autocontractTemplate"
                            name="contractTemplate"
                            label={t('jobposition.form.contract_template')}
                            options={addresses}
                            multiple
                            //   errors={errors}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <TypographyHeader>
                    {t('jobposition.process_details')}
                  </TypographyHeader>
                  <Divider sx={{ marginBlock: '5px' }} />
                  <Box sx={{ width: '100%', paddingBlock: '20px' }}>
                    <TextField fullWidth multiline rows={5} id="fullWidth" />
                  </Box>
                  {/* ===================Branches================= */}
                </CustomTabPanel>
                {/* ===================job summary================= */}
                <CustomTabPanel value={tabValue} index={1}>
                  <Box sx={{ width: '100%', paddingBlock: '20px' }}>
                    <TextField fullWidth multiline rows={5} id="fullWidth" />
                  </Box>
                </CustomTabPanel>
              </Box>
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
      <CompanyModal open={companyOpen} handleClose={handleCloseCompany} />
      <DepartmentModal
        open={departmentOpen}
        handleClose={handleCloseDepartment}
      />
      <EmploymentTypeModal
        open={employmentTypeOpen}
        handleClose={handleCloseEmployment}
      />
    </>
  );
}
