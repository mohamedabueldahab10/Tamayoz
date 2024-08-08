import React, { useEffect, useState } from 'react';
import TypographyHeader from '../../components/utilities/TypographyHeader';
import { useTranslation } from 'react-i18next';
import styles from '../../assets/css/modules/employee/WorkInfo.module.css';
import publicStyles from '../../assets/css/modules/employee/NewEmployee.module.css';
import { Box, Divider } from '@mui/material';
import CustomizedAutoComplete from '../../components/utilities/CustomizedAutoComplete';
import { initialHierarchyData } from '../../components/orgChart/HierarchyChart';
import CustomTreeView from '../../components/orgChart/CustomTreeView';
import { useFormContext } from 'react-hook-form';
import { useGetCompany, useGetEmployeeData } from '../../queries/HrQueries';
import CompanyModal from '../../components/company/CompanyModal';
import styled from 'styled-components';
const NoRecords = styled('p')`
  color: var(--primary-color);
  font-weight: 500;
  font-size: 16px;
`;
const treeData = {
  id: 'root',
  name: 'محمد إبراهيم عبد المقصود الجزار',
  avatar: '/path/to/avatar.jpg',
  role: 'CEO',
  reports: 16,
  children: [
    {
      id: '1',
      name: 'محمد اسماعيل محمد',
      avatar: '/path/to/avatar1.jpg',
      role: 'Project Manager',
      reports: 6,
      children: [
        {
          id: '2',
          name: 'أحمد سامي طه احمد دياب',
          avatar: '/path/to/avatar2.jpg',
          role: 'Odoo Implementer',
          reports: 3,
        },
      ],
    },
  ],
};
const addresses = [
  { label: 'IT', id: 1 },
  { label: 'Languages', id: 2 },
  { label: 'Marketing', id: 3 },
  { label: 'Programming', id: 4 },
  { label: 'Soft Skills', id: 5 },
];
export default function WorkInformation() {
  const { t } = useTranslation('modules');
  // ===============================================================================
  const [companyQuery, setcompanyQuery] = useState([]);
  const [currentCompanyPage, setCurrentCompanyPage] = useState(1);
  const {
    data: companyData,
    isLoading: isCompanyLoading,
    isError: isCompanyError,
    error: companyError,
    fetchNextPage: fetchNextCompanyPage,
    hasNextPage: hasNextCompanyPage,
    isFetchingNextPage: isFethcingNextCompanyPage,
  } = useGetCompany(currentCompanyPage);
  useEffect(() => {
    if (companyData) {
      setcompanyQuery((prevOptions) => {
        const newOptions = companyData.pages
          .flatMap((page) => page.data)
          .filter((option) => option !== null);
        const optionsSet = new Set([
          ...prevOptions.map((option) => option.id),
          ...newOptions.map((option) => option.id),
        ]);
        return [...optionsSet].map(
          (id) =>
            newOptions.find((option) => option.id === id) ||
            prevOptions.find((option) => option.id === id)
        );
      });
    }
  }, [companyData]);
  const handleNextCompanyPage = () => {
    if (hasNextCompanyPage) {
      setCurrentCompanyPage((prevPage) => prevPage + 1);
      fetchNextCompanyPage();
    }
  };
  const [companyOpen, setCompanyOpen] = useState(false);
  const handleCloseCompany = () => {
    setCompanyOpen(false);
  };
  // ===============================================================================
  const [managerQuery, setManagerQuery] = useState([]);
  const [currentManagerPage, setCurrentManagerPage] = useState(1);
  const {
    data: managerData,
    isLoading: isManagerLoading,
    isError: isManagerError,
    error: managerError,
    fetchNextPage: fetchNextManagerPage,
    hasNextPage: hasNextManagerPage,
    isFetchingNextPage: isFethcingNextManagerPage,
  } = useGetEmployeeData(currentManagerPage);
  useEffect(() => {
    if (managerData) {
      setManagerQuery((prevOptions) => {
        const newOptions = managerData.pages
          .flatMap((page) => page.data)
          .filter((option) => option !== null);
        const optionsSet = new Set([
          ...prevOptions.map((option) => option.id),
          ...newOptions.map((option) => option.id),
        ]);
        return [...optionsSet].map(
          (id) =>
            newOptions.find((option) => option.id === id) ||
            prevOptions.find((option) => option.id === id)
        );
      });
    }
  }, [managerData]);
  const handleNextManagerPage = () => {
    if (hasNextManagerPage) {
      setCurrentManagerPage((prevPage) => prevPage + 1);
      fetchNextManagerPage();
    }
  };
  // ===============================================================================
  const [timeoffQuery, setTimeoffQuery] = useState([]);
  const [currentTimeoffPage, setCurrentTimeoffPage] = useState(1);
  const {
    data: timeoffData,
    isLoading: isTimeoffLoading,
    isError: isTimeoffError,
    error: timeoffError,
    fetchNextPage: fetchNextTimeoffPage,
    hasNextPage: hasNextTimeoffPage,
    isFetchingNextPage: isFethcingNextTimeoffPage,
  } = useGetEmployeeData(currentTimeoffPage);
  useEffect(() => {
    if (timeoffData) {
      setTimeoffQuery((prevOptions) => {
        const newOptions = timeoffData.pages
          .flatMap((page) => page.data)
          .filter((option) => option !== null);
        const optionsSet = new Set([
          ...prevOptions.map((option) => option.id),
          ...newOptions.map((option) => option.id),
        ]);
        return [...optionsSet].map(
          (id) =>
            newOptions.find((option) => option.id === id) ||
            prevOptions.find((option) => option.id === id)
        );
      });
    }
  }, [timeoffData]);
  const handleNextTimeoffPage = () => {
    if (hasNextTimeoffPage) {
      setCurrentTimeoffPage((prevPage) => prevPage + 1);
      fetchNextTimeoffPage();
    }
  };
  // ===============================================================================
  const [timesheetQuery, setTimesheetQuery] = useState([]);
  const [currentTimesheetPage, setCurrentTimesheetPage] = useState(1);
  const {
    data: timesheetData,
    isLoading: isTimesheetLoading,
    isError: isTimesheetError,
    error: timesheetError,
    fetchNextPage: fetchNextTimesheetPage,
    hasNextPage: hasNextTimesheetPage,
    isFetchingNextPage: isFethcingNextTimesheetPage,
  } = useGetEmployeeData(currentTimesheetPage);
  useEffect(() => {
    if (timesheetData) {
      setTimesheetQuery((prevOptions) => {
        const newOptions = timesheetData.pages
          .flatMap((page) => page.data)
          .filter((option) => option !== null);
        const optionsSet = new Set([
          ...prevOptions.map((option) => option.id),
          ...newOptions.map((option) => option.id),
        ]);
        return [...optionsSet].map(
          (id) =>
            newOptions.find((option) => option.id === id) ||
            prevOptions.find((option) => option.id === id)
        );
      });
    }
  }, [timesheetData]);
  const handleNextTimesheetPage = () => {
    if (hasNextTimesheetPage) {
      setCurrentTimesheetPage((prevPage) => prevPage + 1);
      fetchNextTimesheetPage();
    }
  };
  // ===============================================================================
  const [attendenceQuery, setAttendenceQuery] = useState([]);
  const [currentAttendencePage, setCurrentAttendencePage] = useState(1);
  const {
    data: attendenceData,
    isLoading: isAttendenceLoading,
    isError: isAttendenceError,
    error: attendenceError,
    fetchNextPage: fetchNextAttendencePage,
    hasNextPage: hasNextAttendencePage,
    isFetchingNextPage: isFethcingNextAttendencePage,
  } = useGetEmployeeData(currentAttendencePage);
  useEffect(() => {
    if (attendenceData) {
      setAttendenceQuery((prevOptions) => {
        const newOptions = attendenceData.pages
          .flatMap((page) => page.data)
          .filter((option) => option !== null);
        const optionsSet = new Set([
          ...prevOptions.map((option) => option.id),
          ...newOptions.map((option) => option.id),
        ]);
        return [...optionsSet].map(
          (id) =>
            newOptions.find((option) => option.id === id) ||
            prevOptions.find((option) => option.id === id)
        );
      });
    }
  }, [attendenceData]);
  const handleNextAttendencePage = () => {
    if (hasNextAttendencePage) {
      setCurrentAttendencePage((prevPage) => prevPage + 1);
      fetchNextAttendencePage();
    }
  };
  // ===============================================================================
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();
  const watchWorkAddress = watch('workaddress');
  console.log(watchWorkAddress);
  const addressParts = watchWorkAddress?.address?.split(',');
  return (
    <Box className={styles.workInfoContainer}>
      <Box className={styles.formSide}>
        {/* =======================location======================= */}
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('work_info.location')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.nameInfo}>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                control={control}
                // defaultValue={[]}
                customwidth="100%"
                id="autoaddress"
                name="workaddress"
                label={t('form.address')}
                options={companyQuery}
                multiple={false}
                errors={errors}
                setOpen={() => setCompanyOpen(true)}
                handleNextPage={handleNextCompanyPage}
                fetchNextPage={fetchNextCompanyPage}
                hasNextPage={hasNextCompanyPage}
                isFetchingNextPage={isFethcingNextCompanyPage}
                isLoading={isCompanyLoading}
                isError={isCompanyError}
                error={companyError}
              />
              <Box className={styles.addressInfo}>
                {!watchWorkAddress?.length > 0 ? (
                  <NoRecords>No Address Provided</NoRecords>
                ) : (
                  addressParts.map((part, index) => (
                    <NoRecords key={index}>{part}</NoRecords>
                  ))
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        {/* =======================approvers======================= */}
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('work_info.approvers')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.formColumn}>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                control={control}
                // defaultValue={[]}
                customwidth="100%"
                id="autoexpense"
                name="expense"
                label={t('form.expense')}
                options={addresses}
                multiple={false}
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                control={control}
                // defaultValue={[]}
                customwidth="100%"
                id="autotimeoff"
                name="timeoff"
                label={t('form.timeoff')}
                multiple={false}
                //   errors={errors}
                options={timeoffQuery}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                handleNextPage={handleNextTimeoffPage}
                fetchNextPage={fetchNextTimeoffPage}
                hasNextPage={hasNextTimeoffPage}
                isFetchingNextPage={isFethcingNextTimeoffPage}
                isLoading={isTimeoffLoading}
                isError={isTimeoffError}
                error={timeoffError}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                control={control}
                // defaultValue={[]}
                customwidth="100%"
                id="autotimesheet"
                name="timesheet"
                label={t('form.timesheet')}
                multiple={false}
                //   errors={errors}
                options={timesheetQuery}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                handleNextPage={handleNextTimesheetPage}
                fetchNextPage={fetchNextTimesheetPage}
                hasNextPage={hasNextTimesheetPage}
                isFetchingNextPage={isFethcingNextTimesheetPage}
                isLoading={isTimesheetLoading}
                isError={isTimesheetError}
                error={timesheetError}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                control={control}
                // defaultValue={[]}
                customwidth="100%"
                id="autoattendance"
                name="attendance"
                label={t('form.attendance')}
                multiple={false}
                //   errors={errors}
                options={attendenceQuery}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                handleNextPage={handleNextAttendencePage}
                fetchNextPage={fetchNextAttendencePage}
                hasNextPage={hasNextAttendencePage}
                isFetchingNextPage={isFethcingNextAttendencePage}
                isLoading={isAttendenceLoading}
                isError={isAttendenceError}
                error={attendenceError}
              />
            </Box>
          </Box>
        </Box>
        {/* =======================remote work======================= */}
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('work_info.remote_work')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <span className={styles.remoteCaption}>
            Specify your default work location for each day of the week. This
            schedule will repeat itself each week.
          </span>
          <Box className={publicStyles.formColumn}>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                control={control}
                // defaultValue={[]}
                customwidth="100%"
                id="automonday"
                name="monday"
                label={t('form.monday')}
                options={addresses}
                multiple={false}
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                control={control}
                // defaultValue={[]}
                customwidth="100%"
                id="autotuesday"
                name="tuesday"
                label={t('form.tuesday')}
                options={addresses}
                multiple={false}
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                control={control}
                // defaultValue={[]}
                customwidth="100%"
                id="autowednesday"
                name="wednesday"
                label={t('form.wednesday')}
                options={addresses}
                multiple={false}
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                control={control}
                // defaultValue={[]}
                customwidth="100%"
                id="autothursday"
                name="thursday"
                label={t('form.thursday')}
                options={addresses}
                multiple={false}
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                control={control}
                // defaultValue={[]}
                customwidth="100%"
                id="autofriday"
                name="friday"
                label={t('form.friday')}
                options={addresses}
                multiple={false}
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                control={control}
                // defaultValue={[]}
                customwidth="100%"
                id="autosaturday"
                name="saturday"
                label={t('form.saturday')}
                options={addresses}
                multiple={false}
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                control={control}
                // defaultValue={[]}
                customwidth="100%"
                id="autosunday"
                name="sunday"
                label={t('form.sunday')}
                options={addresses}
                multiple={false}
                //   errors={errors}
              />
            </Box>
          </Box>
        </Box>
        {/* =======================schedule======================= */}
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('work_info.schedule')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.formColumn}>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                control={control}
                // defaultValue={[]}
                customwidth="100%"
                id="autoworkinghours"
                name="workinghours"
                label={t('form.workinghours')}
                options={addresses}
                multiple={false}
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                control={control}
                // defaultValue={[]}
                customwidth="100%"
                id="autotimezone"
                name="timezone"
                label={t('form.timezone')}
                options={addresses}
                multiple={false}
                //   errors={errors}
              />
            </Box>
          </Box>
        </Box>
        {/* =======================planning======================= */}
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('work_info.planning')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.formColumn}>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                control={control}
                // defaultValue={[]}
                customwidth="100%"
                id="autoroles"
                name="roles"
                label={t('form.roles')}
                options={addresses}
                multiple={false}
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                control={control}
                // defaultValue={[]}
                customwidth="100%"
                id="autodefaultrole"
                name="defaultrole"
                label={t('form.defaultrole')}
                options={addresses}
                multiple={false}
                //   errors={errors}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {initialHierarchyData.lenght > 0 ? (
        <Box className={styles.orgChart}>
          <TypographyHeader>{t('work_info.org_chart')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={styles.hierarchyBox}>
            <TypographyHeader>{t('work_info.no_hierarchy')}</TypographyHeader>
            <p className={styles.infoWord}>{t('work_info.no_manager')}</p>
            <p className={styles.infoWord}>{t('work_info.set_manager')}</p>
          </Box>
        </Box>
      ) : (
        <Box className={styles.orgChart}>
          <CustomTreeView data={treeData} />
        </Box>
      )}
      <CompanyModal open={companyOpen} handleClose={handleCloseCompany} />
    </Box>
  );
}
