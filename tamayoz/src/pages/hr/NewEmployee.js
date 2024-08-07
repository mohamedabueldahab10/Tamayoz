import {
  Alert,
  Box,
  IconButton,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Tooltip,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import BackupIcon from '@mui/icons-material/Backup';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import EmployeeResume from './EmployeeResume';
import EmployeeInfo from './EmployeeInfo';
import styles from '../../assets/css/modules/employee/NewEmployee.module.css';
import WorkInformation from './WorkInformation';
import PrivateInfo from './PrivateInfo';
import HrSettings from './HrSettings';
import NavbarContext from '../../context/NavbarContext';
import TypographyHeader from '../../components/utilities/TypographyHeader';
import AxiosInstance from '../../components/helpers/AxiosInstance';
import CloseIcon from '@mui/icons-material/Close';

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
export default function NewEmployee({ initialData }) {
  const navigate = useNavigate();
  const [snackSuccess, setSnackSuccess] = useState(false);
  const handleCloseSuccess = (branch) => {
    if (branch === 'clickaway') {
      return;
    }
    setSnackSuccess(false);
  };
  const [snackError, setSnackError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const handleCloseError = (branch) => {
    if (branch === 'clickaway') {
      return;
    }
    setSnackError(false);
  };
  const instance = AxiosInstance();
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem('currentPage', location.pathname);
    return () => {
      localStorage.removeItem('currentPage');
    };
  }, [location.pathname]);
  const { t } = useTranslation('modules');
  const schema = yup.object().shape({});

  const methods = useForm({
    shouldUnregister: true,
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      employeeName: '',
      workMobile: '',
      workPhone: '',
      degree: [],
      workMail: '',
      // nextAppraisalDate: format(parseISO('YYYY-MM-DD'), 'MM/dd/yyyy'),
      tags: [],
      department: [],
      jobPosition: [],
      manager: '',
      company: [],
      coach: [],
      // =========work info===========
      workaddress: [],
      expense: [],
      timeoff: [],
      timesheet: [],
      attendance: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
      workinghours: [],
      timezone: [],
      roles: [],
      defaultrole: [],
      // =========private info===========
      street: '',
      street2: '',
      city: [],
      state: [],
      zip: '',
      country: [],
      privatemail: '',
      privatephone: '',
      privatemobile: '',
      bankaccount: [],
      language: [],
      workdistance: '',
      privatecarplate: '',
      maritalStatus: [],
      dependenciesnumber: 0,
      contactname: '',
      contactnumber: '',
      certificateLevel: [],
      stydyfield: [],
      school: '',
      visanumber: '',
      workpermitnumber: '',
      visaexpirationdate: '',
      workpermitexpirationdate: '',
      workpermit: '',
      nationality: [],
      idnumber: '',
      ssnnumber: '',
      gender: [],
      birthdate: '',
      birthplace: '',
      nonresident: false,
      // =========hr settings===========
      employeetype: [],
      relatedusers: [],
      pincode: '',
      badgeid: '',
      billingtimetarget: '',
      hourlycost: '',
      fleetmobilitycard: '',
    },
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const handleFileChange = (file) => {
    setSelectedImage(file);
  };
  console.log('selectedImage==========>', selectedImage);
  async function handleFormSubmit(data) {
    const jsonStringData = JSON.stringify(data, null, 2);
    console.log('string Data: ' + jsonStringData);
    console.log('relatedusers length: ' + data.relatedusers.length);
    console.log('relatedusers length: ' + data.employeetype.length);
    var employeeArray = [];
    for (var i = 0; i < data.length; i++) {
      employeeArray.push(data[i].name);
    }
    const logFormData = (formData) => {
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    };
    console.log('Submit Data:', employeeArray);
    const EmployeeData = {
      empMainData: {
        // ======main info==========
        firstname: data.employeeName,
        middlename: '',
        lastname: '',
        code: '',
        workMobile: data.workMobile,
        workPhone: data.workPhone,
        workEmail: data.workMail,
        companyId: data.company.id ? data.company.id : 0,
        departmentId: data.department.id ? data.department.id : 0,
        managerId: data.manager.id ? data.manager.id : 0,
        jobPositionId: data.jobPosition.id ? data.jobPosition.id : 0,
        titleid: data.tags.id ? data.tags.id : 0,
        // =======work Info ======
        timeoffMangerId: data.timeoff.id ? data.timeoff.id : 0,
        timesheetMangerId: data.timesheet.id ? data.timesheet.id : 0,
        attendanceMangerId: data.attendance.id ? data.attendance.id : 0,
        workingHoursId: data.workinghours.id ? data.workinghours.id : 0,
        timezone: data.timezone.id ? data.timezone.id : 0,
        // =======private info ======
        // ===contact===
        privateAddress: data.street,
        countryId: data.country.id ? data.country.id : 0,
        regionId: data.state.id ? data.state.id : 0,
        cityId: data.city.id ? data.city.id : 0,
        privateEmail: data.privatemail,
        privatePhone: data.privatephone,
        bankAccountId: data.bankaccount.id ? data.bankaccount.id : 0,
        langId: data.language.id ? data.language.id : 0,
        carPlate: data.privatecarplate,
        // ===family===
        numOfChildren: data.dependenciesnumber,
        spouseName: '',
        spouseBirthdate: '12-12-2022',
        // ==citizenship==
        nationalityId: data.nationality.id ? data.nationality.id : 0,
        identificationNum: data.idnumber,
        gender: data.gender.id ? data.gender.id : 0,
        dateofbirth: data.birthdate,
        // =======hr setting ======
        relatedUserId: data.relatedusers.id ? data.relatedUsers.id : 0,
        employeeTypeId: data.employeetype.id ? data.employeetype.id : 1,

        experienceYears: 0,
        passportId: 0,
      },
      empEmergancy: [
        {
          phone: data.contactnumber,
          name: data.contactname,
          degreeOfKinship: '',
          residenceCardNum: 0,
        },
      ],
    };
    const formData = new FormData();
    formData.append('data', JSON.stringify(EmployeeData));

    if (selectedImage) {
      formData.append('img', selectedImage);
    }
    logFormData(formData);

    await instance
      .post('/Employee/InsertData', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setSnackSuccess(true);
        methods.reset();
        if (res.data.code === 1) {
          navigate(`/employees/${res.data.data}`);
        } else {
          setSnackError(true);
          setErrorMessage('Unexpected error occurred');
        }
      })
      .catch((error) => {
        setSnackError(true);
        setErrorMessage(error);
        console.log('Employee Data', error);
      });
  }
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    event.preventDefault();
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
  }, [methods, setAdditionalNavbarItems]);
  console.log('================', tabValue);
  return (
    <Box className={styles.employeeContainer}>
      <FormProvider {...methods}>
        <form
          style={{ width: '100%' }}
          onSubmit={methods.handleSubmit(handleFormSubmit)}
        >
          <EmployeeInfo onFileChange={handleFileChange} />
        </form>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
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
          <CustomTabPanel value={tabValue} index={0} />
          <CustomTabPanel value={tabValue} index={1} />
          <CustomTabPanel value={tabValue} index={2} />
          <CustomTabPanel value={tabValue} index={3} />
          <div style={{ display: tabValue === 0 ? 'block' : 'none' }}>
            <Box className={styles.nameInfo}>
              <EmployeeResume />
            </Box>
          </div>
          <div style={{ display: tabValue === 1 ? 'block' : 'none' }}>
            <WorkInformation />
          </div>
          <div style={{ display: tabValue === 2 ? 'block' : 'none' }}>
            <PrivateInfo />
          </div>
          <div style={{ display: tabValue === 3 ? 'block' : 'none' }}>
            <HrSettings />
          </div>
        </Box>
      </FormProvider>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={snackSuccess}
          autoHideDuration={4500}
          onClose={handleCloseSuccess}
        >
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                size="small"
                onClick={handleCloseSuccess}
              >
                <CloseIcon fontSize="inherit" color="green" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Employee added successfully!
          </Alert>
        </Snackbar>
      </Stack>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={snackError}
          autoHideDuration={4500}
          onClose={handleCloseError}
        >
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                size="small"
                onClick={handleCloseError}
              >
                <CloseIcon fontSize="inherit" color="red" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </Box>
  );
}
