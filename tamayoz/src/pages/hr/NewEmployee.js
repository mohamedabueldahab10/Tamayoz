import { Box, Divider, Input, Tab, Tabs, Tooltip } from '@mui/material'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect, useMemo, useState } from 'react'
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useForm, FormProvider  } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import EmployeeResume from './EmployeeResume';
import EmployeeInfo from './EmployeeInfo';
const nameInfo = {
    display:"flex",
    justifyContent:"space-between",
    alignItems:"start",
    marginBottom: "5px",
    width: "100%",
    flexWrap:"wrap"
}
const headerInfo = {
    display:"flex",
    justifyContent:"space-between",
    alignItems:"start",
    marginBottom: "5px",
    width: "100%",
    flexWrap:"wrap",
    boxShadow: "0px 3px 0px #eee",
    padding:"0px 0px 5px",
}

const tabStyle ={
    color:"var(--dark-color)",
    fontSize:"14px",
    fontWeight: "bold",
    cursor: "pointer",
}

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
      {value === index && (
          <>{children}</>
      )}
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
  console.log(location)
    const { t } = useTranslation("modules");
    const schema = yup.object().shape({
        employeeName: yup.string().required(t("validation.employee_name")),
        jobPositionName: yup.string().required(t("validation.job_position_name")),
        tags: yup.array().of(yup.object().shape({
            label: yup.string().required(t("validation.tags")),
            id: yup.number().required(t("validation.tags")),
        })
        ).required(t("validation.tags")),
        workMobile: yup.string().required(t("validation.work_mobile")),
        // department: yup.string().required(t("validation.department")),
        department: yup.array().of(yup.object().shape({
            label: yup.string().required(t("validation.department")),
            id: yup.number().required(t("validation.department")),
        })
        ).required(t("validation.department")),
        workPhone: yup.string().required(t("validation.work_phone")),
        // jobPosition: yup.string().required(t("validation.job_position")),
        jobPosition: yup.array().of(yup.object().shape({
            label: yup.string().required(t("validation.jobPosition")),
            id: yup.number().required(t("validation.jobPosition")),
        })
        ).required(t("validation.jobPosition")),
        workMail: yup.string().required(t("validation.work_mail")),
        // manager: yup.string().required(t("validation.manager")),
        manager: yup.array().of(yup.object().shape({
            label: yup.string().required(t("validation.manager")),
            id: yup.number().required(t("validation.manager")),
        })
        ).required(t("validation.manager")),
        company: yup.array().of(yup.object().shape({
            label: yup.string().required(t("validation.company")),
            id: yup.number().required(t("validation.company")),
        })
        ).required(t("validation.company")),
        coach: yup.array().of(yup.object().shape({
            label: yup.string().required(t("validation.coach")),
            id: yup.number().required(t("validation.coach")),
        })
        ).required(t("validation.coach")),
        date: yup.string().required(t("validation.date")),
    });
    
    const methods = useForm({
        shouldUnregister: true,
        mode: "onTouched",
        resolver: yupResolver(schema),
       defaultValues: {
        employeeName: '',
        workMobile: '',
        workPhone: '',
        jobPositionName: '',
        workMail: '',
        nextAppraisalDate: '',
        tags: {
            label: '',
            id: '',
        },
        department: {
            label: '',
            id: '',
        },
        jobPosition: {
            label: '',
            id: '',
        },
        manager: {
            label: '',
            id: '',
        },
        company: {
            label: '',
            id: '',
        },
        coach: {
            label: '',
            id: '',
        },
    },
  });
    async function handleFormSubmit(data){
        console.log('Employee Data',data);
    }
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const [open, setOpen] =  useState(false);
  const handleToggleModal = () => setOpen(!open);
    const MemoizedEmployeeResume = useMemo(() => <EmployeeResume handleToggleModal={handleToggleModal} open={open} control={methods.control} />,
    [open, methods.control]
  );
return (
    <div>
        <Box sx={headerInfo}>
            <Tooltip title="Save">
                <SaveAltIcon 
                sx={{color:"var(--primary-color)", fontSize:"28px",cursor:"pointer"}} 
                onClick={methods.handleSubmit(handleFormSubmit)} />
            </Tooltip>
        </Box>
        <FormProvider {...methods}>
            <form>
                <EmployeeInfo />
                <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs 
                        value={tabValue} 
                        onChange={handleChange} 
                        aria-label="basic tabs example" 
                        sx={{
                            width:"fit-content",
                            "& .Mui-selected":{
                                border:"1px solid var(--primary-color)", 
                            }
                        }}
                    >
                    <Tab sx={tabStyle} label={t("resume.resume")} {...a11yProps(0)} />
                    <Tab sx={tabStyle} label={t("work_info.work_info")} {...a11yProps(1)} />
                    <Tab sx={tabStyle} label={t("private_info.private_info")} {...a11yProps(2)} />
                    <Tab sx={tabStyle} label={t("hr_settings.hr_settings")} {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={tabValue} index={0}>
                    <Box sx={nameInfo}>
                        {MemoizedEmployeeResume}
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={1}>
                    Work Information
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={2}>
                    Private Information
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={3}>
                    HR Settings
                </CustomTabPanel>
                </Box>
            </form>
        </FormProvider>
    </div>
  )
}

