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
import styles from '../../../assets/css/modules/employee/NewEmployee.module.css';
import WorkInformation from './WorkInformation';
import PrivateInfo from './PrivateInfo';
import HrSettings from './HrSettings';
import NavbarContext from '../../../context/NavbarContext';
import TypographyHeader from '../../../components/utilities/TypographyHeader';
import AxiosInstance from '../../../components/helpers/AxiosInstance';
import { useQueryClient } from 'react-query';
import CloseIcon from '@mui/icons-material/Close';
import HeaderBtn from '../../../components/utilities/HeaderBtn';

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
export default function UpdateEmployee({ initialData, empId }) {
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
  const queryClient = useQueryClient();
  const location = useLocation();
  const currentPath = location.pathname;
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
  });
  const { isDirty } = methods.formState;
  const [employeeName, setEmployeeName] = useState(null);
  useEffect(() => {
    if (initialData) {
      setEmployeeName(initialData.employeeData.firstname);
      // =================main Information =================
      methods.setValue('employeeName', initialData.employeeData.firstname);
      methods.setValue('workMobile', initialData.employeeData.workMobile);
      methods.setValue('workPhone', initialData.employeeData.workPhone);
      methods.setValue('workMail', initialData.employeeData.workEmail);
      // =================Work Information =================
      // =================Private Information =================
      methods.setValue('street', initialData.employeeData.privateAddress);
      methods.setValue('zip', '');
      methods.setValue('privatemail', initialData.employeeData.privateEmail);
      methods.setValue('privatephone', initialData.employeeData.privatePhone);
      methods.setValue('privatemobile', '');
      methods.setValue('workdistance', '');
      methods.setValue('privatecarplate', initialData.employeeData.carPlate);
      methods.setValue(
        'dependenciesnumber',
        initialData.employeeData.numOfChildren
      );
      methods.setValue(
        'contactname',
        initialData.employeeData.emergencyContact.name
      );
      methods.setValue(
        'contactnumber',
        initialData.employeeData.emergencyContact.phone
      );
      methods.setValue('visanumber', '');
      methods.setValue('workpermitnumber', '');
      methods.setValue('visaexpirationdate', '');
      methods.setValue('workpermitexpirationdate', '');
      methods.setValue('idnumber', '');
      methods.setValue('ssnnumber', '');
      methods.setValue('birthdate', '');
      methods.setValue('birthplace', initialData.employeeData.placeOfBirth);
      methods.setValue('nonresident', true);
      // =================HR Information =================
      methods.setValue('pincode', '');
      methods.setValue('badgeid', '');
      methods.setValue('billingtimetarget', '');
      methods.setValue('hourlycost', '');
      methods.setValue('fleetmobilitycard', '');
    }
  }, [initialData, methods]);

  const [selectedImage, setSelectedImage] = useState(null);
  const handleFileChange = (file) => {
    setSelectedImage(file);
  };
  async function handleFormSubmit(data) {
    const jsonStringData = JSON.stringify(data, null, 2);
    console.log('string Data: ' + jsonStringData);
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
        id: empId,
        firstname: data.employeeName,
        middlename: '',
        lastname: '',
        code: '',
        workMobile: data.workMobile,
        workPhone: data.workPhone,
        workEmail: data.workMail,
        companyId: data.company ? data.company.id : 0,
        departmentId: data.department ? data.department.id : 0,
        managerId: data.manager ? data.manager.id : 0,
        jobPositionId: data.jobPosition ? data.jobPosition.id : 0,
        titleid: data.tags ? data.tags.id : 0,
        // =======work Info ======
        timeoffMangerId: data.timeoff ? data.timeoff.id : 0,
        timesheetMangerId: data.timesheet ? data.timesheet.id : 0,
        attendanceMangerId: data.attendance ? data.attendance.id : 0,
        workingHoursId: data.workinghours ? data.workinghours.id : 0,
        timezone: data.timezone ? data.timezone.id : 0,
        // =======private info ======
        // ===contact===
        privateAddress: data.street,
        countryId: data.country ? data.company.id : 0,
        regionId: data.state ? data.state.id : 0,
        cityId: data.city ? data.city.id : 0,
        privateEmail: data.privatemail,
        privatePhone: data.privatephone,
        bankAccountId: data.bankaccount ? data.bankaccount.id : 0,
        langId: data.language ? data.language.id : 0,
        carPlate: data.privatecarplate,
        // ===family===
        numOfChildren: data.dependenciesnumber ? data.dependenciesnumber : 0,
        spouseName: '',
        spouseBirthdate: '',
        // ==citizenship==
        nationalityId: data.nationality ? data.nationality.id : 0,
        identificationNum: data.idnumber,
        gender: data.gender ? data.gender.id : 0,
        dateofbirth: data.birthdate,
        // =======hr setting ======
        relatedUserId: data.relatedUsers ? data.relatedUsers.id : 0,
        employeeTypeId: data.employeeType ? data.employeeType.id : 1,
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
      .put('/Employee/UpdateData', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('Employee Response: ' + res);
        setSnackSuccess(true);
        queryClient.invalidateQueries('employeesdatagrid');
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
  const navigate = useNavigate();

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
        <Box>
          <HeaderBtn onClick={() => navigate('/employees/new_employee')}>
            {t('employees.new')}
          </HeaderBtn>
        </Box>
        <TypographyHeader>{employeeName}</TypographyHeader>
        {isDirty === true && (
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
        )}
      </Box>,
    ]);

    // Cleanup function to remove buttons when the component is unmounted
    return () => setAdditionalNavbarItems([]);
  }, [isDirty, employeeName, methods, navigate, setAdditionalNavbarItems]);
  return (
    <Box className={styles.employeeContainer}>
      <FormProvider {...methods}>
        <form
          style={{ width: '100%' }}
          onSubmit={methods.handleSubmit(handleFormSubmit)}
        >
          <EmployeeInfo
            initialData={initialData}
            onFileChange={handleFileChange}
          />
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
              <EmployeeResume initialData={initialData} />
            </Box>
          </div>
          <div style={{ display: tabValue === 1 ? 'block' : 'none' }}>
            <WorkInformation initialData={initialData} />
          </div>
          <div style={{ display: tabValue === 2 ? 'block' : 'none' }}>
            <PrivateInfo initialData={initialData} />
          </div>
          <div style={{ display: tabValue === 3 ? 'block' : 'none' }}>
            <HrSettings initialData={initialData} />
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
            Employee Updated successfully!
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
