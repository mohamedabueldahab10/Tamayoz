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
import { useGetCompany } from '../../queries/HrQueries';
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
                id="autotimesheet"
                name="timesheet"
                label={t('form.timesheet')}
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
                id="autoattendance"
                name="attendance"
                label={t('form.attendance')}
                options={addresses}
                multiple={false}
                //   errors={errors}
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
