import { Box, Divider } from '@mui/material';
import React, { useTransition } from 'react';
import styles from '../../assets/css/modules/employee/PrivateInfo.module.css';
import publicStyles from '../../assets/css/modules/employee/NewEmployee.module.css';
import TypographyHeader from '../../components/utilities/TypographyHeader';
import { useTranslation } from 'react-i18next';
import StyledInputBase from '../../components/utilities/StyledInputBase';
import CustomizedAutoComplete from '../../components/utilities/CustomizedAutoComplete';
import CustomizedLabel from '../../components/utilities/CustomizedLabel';
const addresses = [
  { label: 'IT', id: 1 },
  { label: 'Languages', id: 2 },
  { label: 'Marketing', id: 3 },
  { label: 'Programming', id: 4 },
  { label: 'Soft Skills', id: 5 },
];
export default function HrSettings() {
  const { t } = useTranslation('modules');
  return (
    <Box className={styles.privateInfoContainer}>
      {/* =======================Status======================= */}
      <Box className={styles.infoSection}>
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('hr_settings.status')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.nameInfo}>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autostate"
                name="employeeType"
                label="Employee Type"
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
                label="Related Users"
                options={addresses}
                multiple
                //   errors={errors}
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
          <Box className={publicStyles.nameInfo}>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="PIN Code"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="Badge ID"
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
          <Box className={publicStyles.nameInfo}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
                width: '90%',
              }}
            >
              <Box>
                <CustomizedLabel>Billing Time Target</CustomizedLabel>
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
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
                width: '90%',
              }}
            >
              <Box>
                <CustomizedLabel>Hourly Cost</CustomizedLabel>
              </Box>
              <Box>
                <StyledInputBase
                  type="number"
                  inputProps={{
                    min: '0',
                    step: '0.01',
                    'aria-label': 'Billing',
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
                placeholder="Fleet Mobility Card"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
