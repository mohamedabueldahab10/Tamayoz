import React from 'react';
import TypographyHeader from '../../components/utilities/TypographyHeader';
import { useTranslation } from 'react-i18next';
import styles from '../../assets/css/modules/employee/WorkInfo.module.css';
import publicStyles from '../../assets/css/modules/employee/NewEmployee.module.css';
import { Box, Divider } from '@mui/material';
import CustomizedAutoComplete from '../../components/utilities/CustomizedAutoComplete';
const addresses = [
  { label: 'IT', id: 1 },
  { label: 'Languages', id: 2 },
  { label: 'Marketing', id: 3 },
  { label: 'Programming', id: 4 },
  { label: 'Soft Skills', id: 5 },
];
export default function WorkInformation() {
  const { t } = useTranslation('modules');
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
                defaultValue={[]}
                customwidth="100%"
                id="autoaddress"
                name="workAddress"
                label={t('form.address')}
                options={addresses}
                multiple
                //   errors={errors}
              />
              <Box className={styles.addressInfo}>
                <Box>250 Executive Park Blvd, Suite 3400</Box>
                <Box>San Francisco CA 94134</Box>
                <Box>United States</Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* =======================approvers======================= */}
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('work_info.approvers')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.nameInfo}>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autoexpense"
                name="expense"
                label={t('form.expense')}
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autotimeoff"
                name="timeoff"
                label={t('form.timeoff')}
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autotimesheet"
                name="timesheet"
                label={t('form.timesheet')}
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autoattendance"
                name="attendance"
                label={t('form.attendance')}
                options={addresses}
                multiple
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
          <Box className={publicStyles.nameInfo}>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="automonday"
                name="monday"
                label={t('form.monday')}
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autotuesday"
                name="tuesday"
                label={t('form.tuesday')}
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autowednesday"
                name="wednesday"
                label={t('form.wednesday')}
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autothursday"
                name="thursday"
                label={t('form.thursday')}
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autofriday"
                name="friday"
                label={t('form.friday')}
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autosaturday"
                name="saturday"
                label={t('form.saturday')}
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autosunday"
                name="sunday"
                label={t('form.sunday')}
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
          </Box>
        </Box>
        {/* =======================schedule======================= */}
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('work_info.schedule')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.nameInfo}>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autoworkinghours"
                name="workinghours"
                label={t('form.workinghours')}
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autotimezone"
                name="timezone"
                label={t('form.timezone')}
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
          </Box>
        </Box>
        {/* =======================planning======================= */}
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('work_info.planning')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.nameInfo}>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autoroles"
                name="roles"
                label={t('form.roles')}
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autodefaultrole"
                name="defaultrole"
                label={t('form.defaultrole')}
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={styles.orgChart}>
        <TypographyHeader>{t('work_info.org_chart')}</TypographyHeader>
        <Divider sx={{ marginBottom: '10px' }} />
      </Box>
    </Box>
  );
}
