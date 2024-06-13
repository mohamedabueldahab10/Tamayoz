import { Box, Divider } from '@mui/material';
import React, { useState, useTransition } from 'react';
import styles from '../../assets/css/modules/employee/PrivateInfo.module.css';
import publicStyles from '../../assets/css/modules/employee/NewEmployee.module.css';
import TypographyHeader from '../../components/utilities/TypographyHeader';
import { useTranslation } from 'react-i18next';
import StyledInputBase from '../../components/utilities/StyledInputBase';
import CustomizedAutoComplete from '../../components/utilities/CustomizedAutoComplete';
import CustomizedLabel from '../../components/utilities/CustomizedLabel';
import RelatedUsersModal from '../../components/relatedUsers/RelatedUsersModal';
const addresses = [
  { label: 'IT', id: 1 },
  { label: 'Languages', id: 2 },
  { label: 'Marketing', id: 3 },
  { label: 'Programming', id: 4 },
  { label: 'Soft Skills', id: 5 },
];
export default function HrSettings() {
  const { t } = useTranslation('modules');
  const [openRelatedUser, setOpenRelatedUser] = useState(false);
  const handleCloseRelatedUser = () => {
    setOpenRelatedUser(false);
  };
  return (
    <Box className={styles.privateInfoContainer}>
      {/* =======================Status======================= */}
      <Box className={styles.infoSection}>
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('hr_settings.status')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.formColumn}>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autostate"
                name="employeeType"
                label={t('form.employee_type')}
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autousers"
                name="relatedUsers"
                label={t('form.related_users')}
                options={addresses}
                multiple
                //   errors={errors}
                setOpen={() => setOpenRelatedUser(true)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* =======================Attendance POS======================= */}
      <Box className={styles.infoSection}>
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>
            {t('hr_settings.attendance_pos_manufacturing')}
          </TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.formColumn}>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.pin_code')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.badge_id')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
        </Box>
      </Box>
      {/* =======================Application Settings======================= */}
      <Box className={styles.infoSection}>
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('hr_settings.app_setting')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.formColumn}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'start',
                flexDirection: 'column',
                width: '90%',
                mb: '15px',
              }}
            >
              <Box sx={{ mb: '-5px' }}>
                <CustomizedLabel>
                  {t('form.billing_time_target')}
                </CustomizedLabel>
              </Box>
              <Box>
                <StyledInputBase
                  type="time"
                  placeholder="Billing Time Target"
                  // {...register('employeeName')}
                />
                {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'start',
                flexDirection: 'column',
                width: '90%',
                mb: '15px',
              }}
            >
              <Box sx={{ mb: '-5px' }}>
                <CustomizedLabel>{t('form.hourly_cost')}</CustomizedLabel>
              </Box>
              <Box>
                <StyledInputBase
                  type="number"
                  inputProps={{
                    min: '0',
                    step: '0.01',
                    'aria-label': 'Cost',
                  }}
                  placeholder="00:00"
                  startAdornment={<span>$</span>}
                  // {...register('employeeName')}
                />
              </Box>
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.fleet_mobility_card')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
        </Box>
      </Box>
      <RelatedUsersModal
        open={openRelatedUser}
        handleClose={handleCloseRelatedUser}
      />
    </Box>
  );
}
