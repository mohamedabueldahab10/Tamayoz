import { Box, Divider, Input, Tab, Tabs, Tooltip } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useEffect, useMemo, useState } from 'react';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import EmployeeResume from './EmployeeResume';
import EmployeeInfo from './EmployeeInfo';
import styles from '../../assets/css/modules/employee/NewEmployee.module.css';
import WorkInformation from './WorkInformation';
import PrivateInfo from './PrivateInfo';
import HrSettings from './HrSettings';
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
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem('currentPage', location.pathname);
    return () => {
      localStorage.removeItem('currentPage');
    };
  }, [location.pathname]);
  const { t } = useTranslation('modules');
  const schema = yup.object().shape({
    employeeName: yup.string().required(t('validation.employee_name')),
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
    degree: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(t('validation.degree')),
          id: yup.number().required(t('validation.degree')),
        })
      )
      .min(1, t('validation.degree'))
      .required(t('validation.degree')),
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
  const handleFormSubmit = async (data) => {
    console.log('Employee Data', data);
  };
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Box className={styles.employeeContainer}>
      <Box className={styles.headerInfo}>
        <Tooltip title="Save">
          <SaveAltIcon
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
