import { Box, Tab, Tabs, Tooltip } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import BackupIcon from '@mui/icons-material/Backup';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import EmployeeResume from './EmployeeResume';
import EmployeeInfo from './EmployeeInfo';
import styles from '../../assets/css/modules/employee/NewEmployee.module.css';
import WorkInformation from './WorkInformation';
import PrivateInfo from './PrivateInfo';
import HrSettings from './HrSettings';
import NavbarContext from '../../context/NavbarContext';
import TypographyHeader from '../../components/utilities/TypographyHeader';
import AxiosInstance from '../../components/helpers/AxiosInstance';
import { useQueryClient } from 'react-query';
import axios from 'axios';

const tabStyle = {
  color: 'var(--dark-color)',
  fontSize: '14px',
  fontWeight: 'bold',
  cursor: 'pointer',
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
export default function NewEmployee() {
  const instance = AxiosInstance();
  const queryClient = useQueryClient();
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem('currentPage', location.pathname);
    return () => {
      localStorage.removeItem('currentPage');
    };
  }, [location.pathname]);
  const { t } = useTranslation('modules');
  const schema = yup.object().shape({
    // employeeName: yup.string().required(t('validation.employee_name')),
    // tags: yup
    //   .array()
    //   .of(
    //     yup.object().shape({
    //       label: yup.string().required(t('validation.tags')),
    //       id: yup.number().required(t('validation.tags')),
    //     })
    //   )
    //   .min(1, t('validation.tags'))
    //   .required(t('validation.tags')),
    // workMobile: yup.string().required(t('validation.work_mobile')),
    // department: yup
    //   .array()
    //   .of(
    //     yup.object().shape({
    //       label: yup.string().required(t('validation.department')),
    //       id: yup.number().required(t('validation.department')),
    //     })
    //   )
    //   .min(1, t('validation.department'))
    //   .required(t('validation.department')),
    // workPhone: yup.string().required(t('validation.work_phone')),
    // jobPosition: yup
    //   .array()
    //   .of(
    //     yup.object().shape({
    //       label: yup.string().required(t('validation.job_position')),
    //       id: yup.number().required(t('validation.job_position')),
    //     })
    //   )
    //   .min(1, t('validation.job_position'))
    //   .required(t('validation.job_position')),
    // workMail: yup.string().required(t('validation.work_mail')),
    // manager: yup
    //   .array()
    //   .of(
    //     yup.object().shape({
    //       label: yup.string().required(t('validation.manager')),
    //       id: yup.number().required(t('validation.manager')),
    //     })
    //   )
    //   .min(1, t('validation.manager'))
    //   .required(t('validation.manager')),
    // company: yup
    //   .array()
    //   .of(
    //     yup.object().shape({
    //       label: yup.string().required(t('validation.company')),
    //       id: yup.number().required(t('validation.company')),
    //     })
    //   )
    //   .min(1, t('validation.company'))
    //   .required(t('validation.company')),
    // coach: yup
    //   .array()
    //   .of(
    //     yup.object().shape({
    //       label: yup.string().required(t('validation.coach')),
    //       id: yup.number().required(t('validation.coach')),
    //     })
    //   )
    //   .min(1, t('validation.coach'))
    //   .required(t('validation.coach')),
    // degree: yup
    //   .array()
    //   .of(
    //     yup.object().shape({
    //       label: yup.string().required(t('validation.degree')),
    //       id: yup.number().required(t('validation.degree')),
    //     })
    //   )
    //   .min(1, t('validation.degree'))
    //   .required(t('validation.degree')),
    // date: yup.date().required(t('validation.date')),
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
  async function handleFormSubmit(data) {
    const EmployeeData = {
      empMainData: {
        firstname: 'hamada',
        middlename: '',
        lastname: '',
        code: '',
        titleid: 0,
        dateofbirth: '12-12-2022',
        experienceYears: 1,
        passportId: 0,
        countryId: 0,
        regionId: 0,
        cityId: 0,
        workMobile: '',
        workPhone: '',
        workEmail: '',
        departmentId: 1,
        jobPositionId: 1,
        managerId: 1,
        companyId: 1,
        workingHoursId: 0,
        timeoffMangerId: 0,
        timesheetMangerId: 0,
        attendanceMangerId: 0,
        timezone: '',
        privateAddress: '',
        privateEmail: '',
        privatePhone: '',
        bankAccountId: 0,
        langId: 0,
        carPlate: '',
        nationalityId: 0,
        identificationNum: '',
        gender: '',
        numOfChildren: 1,
        spouseName: '',
        spouseBirthdate: '12-12-2022',
        relatedUserId: 0,
        employeeTypeId: 1,
      },
      empEmergancy: [
        {
          phone: '12121212',
          name: 'mohamed',
          degreeOfKinship: 'hasband',
          residenceCardNum: 1,
        },
      ],
    };
    await axios
      .post('http://10.10.8.223:8080/Employee/InsertData', EmployeeData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('Employee Response: ' + res);
        // queryClient.invalidateQueries("employeesdatagrid");
      })
      .catch((error) => {
        console.log('Employee Data', error);
      });
  }
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const { setAdditionalNavbarItems } = useContext(NavbarContext);

  useEffect(() => {
    setAdditionalNavbarItems([
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          columnGap: '10px',
        }}
      >
        <TypographyHeader>New Employee</TypographyHeader>
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
      </Box>,
    ]);

    // Cleanup function to remove buttons when the component is unmounted
    return () => setAdditionalNavbarItems([]);
  }, [setAdditionalNavbarItems]);
  return (
    <Box className={styles.employeeContainer}>
      <FormProvider {...methods}>
        <form
          style={{ width: '100%' }}
          onSubmit={methods.handleSubmit(handleFormSubmit)}
        >
          <EmployeeInfo />
        </form>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                width: 'fit-content',
                '& .Mui-selected': {
                  border: '1px solid var(--primary-color)',
                },
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              <Tab sx={tabStyle} label={t('resume.resume')} {...a11yProps(0)} />
              <Tab
                sx={tabStyle}
                label={t('work_info.work_info')}
                {...a11yProps(1)}
              />
              <Tab
                sx={tabStyle}
                label={t('private_info.private_info')}
                {...a11yProps(2)}
              />
              <Tab
                sx={tabStyle}
                label={t('hr_settings.hr_settings')}
                {...a11yProps(3)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={tabValue} index={0}>
            <Box className={styles.nameInfo}>
              <EmployeeResume />
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <WorkInformation />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={2}>
            <PrivateInfo />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={3}>
            <HrSettings />
          </CustomTabPanel>
        </Box>
      </FormProvider>
    </Box>
  );
}
