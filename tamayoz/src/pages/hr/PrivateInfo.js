import { Box, Divider } from '@mui/material';
import React from 'react';
import styles from '../../assets/css/modules/employee/PrivateInfo.module.css';
import publicStyles from '../../assets/css/modules/employee/NewEmployee.module.css';
import TypographyHeader from '../../components/utilities/TypographyHeader';
import { useTranslation } from 'react-i18next';
import CustomizedAutoComplete from '../../components/utilities/CustomizedAutoComplete';
import StyledInputBase from '../../components/utilities/StyledInputBase';
import ErrorText from '../../components/utilities/ErrorText';
import CustomizedLabel from '../../components/utilities/CustomizedLabel';
import StyledCheck from '../../components/utilities/StyledCheck';
const addresses = [
  { label: 'IT', id: 1 },
  { label: 'Languages', id: 2 },
  { label: 'Marketing', id: 3 },
  { label: 'Programming', id: 4 },
  { label: 'Soft Skills', id: 5 },
];
export default function PrivateInfo() {
  const { t } = useTranslation('modules');
  return (
    <Box className={styles.privateInfoContainer}>
      {/* =======================Private content======================= */}
      <Box className={styles.infoSection}>
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('private_info.contact')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.nameInfo}>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="Street.."
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="Street 2.."
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="City"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autostate"
                name="state"
                label="State"
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="ZIP"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autocountry"
                name="country"
                label="country"
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="Email"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="Phone"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="Bank Account Number"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autolanguage"
                name="language"
                label="language"
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="Home Work Distance"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="Private Car Plate"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
        </Box>
      </Box>
      {/* =======================Family Status======================= */}
      <Box className={styles.infoSection}>
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('private_info.family_status')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.nameInfo}>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="automarital"
                name="maritalStatus"
                label="Marital Status"
                options={addresses}
                // multiple
                //   errors={errors}
              />
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="Number of Dependencies"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
        </Box>
      </Box>
      {/* =======================Emergency======================= */}
      <Box className={styles.infoSection}>
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('private_info.emergency')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.nameInfo}>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="Contact Name"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="Contact Number"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
        </Box>
      </Box>
      {/* =======================Education======================= */}
      <Box className={styles.infoSection}>
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('private_info.education')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.nameInfo}>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autocertificate"
                name="certificateLevel"
                label="certificate Level"
                options={addresses}
                // multiple
                //   errors={errors}
              />
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="Field Of Study"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="School"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
        </Box>
      </Box>
      {/* =======================Work Permit======================= */}
      <Box className={styles.infoSection}>
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('private_info.work_permit')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.nameInfo}>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="Visa No"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="Work Permit No"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            {/* <Box className={publicStyles.singleRow}> */}
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
                <CustomizedLabel>Visa Expiration Date</CustomizedLabel>
              </Box>
              <Box>
                <StyledInputBase
                  type="date"
                  placeholder="Visa Expiration Date"
                  //   {...register('nextAppraisalDate')}
                />
                <Box>
                  {/* <ErrorText>{errors.nextAppraisalDate?.message}</ErrorText> */}
                </Box>
              </Box>
            </Box>
            {/* </Box> */}
            {/* <Box className={publicStyles.singleRow}> */}
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
                <CustomizedLabel>Work Permit Expiration Date</CustomizedLabel>
              </Box>
              <Box>
                <StyledInputBase
                  type="date"
                  placeholder="Work Permit Expiration Date"
                  //   {...register('nextAppraisalDate')}
                />
                <Box>
                  {/* <ErrorText>{errors.nextAppraisalDate?.message}</ErrorText> */}
                </Box>
              </Box>
              {/* </Box> */}
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
                <CustomizedLabel>Work Permit</CustomizedLabel>
              </Box>
              <Box>
                <StyledInputBase
                  type="file"
                  placeholder="Work Permit Expiration Date"
                  //   {...register('nextAppraisalDate')}
                />
                <Box>
                  {/* <ErrorText>{errors.nextAppraisalDate?.message}</ErrorText> */}
                </Box>
              </Box>
              {/* </Box> */}
            </Box>
          </Box>
        </Box>
      </Box>
      {/* =======================Citizenship======================= */}
      <Box className={styles.infoSection}>
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('private_info.citizenship')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.nameInfo}>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autonationality"
                name="nationality"
                label="nationality"
                options={addresses}
                // multiple
                //   errors={errors}
              />
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="Identification No"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="SSN No"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autogender"
                name="gender"
                label="gender"
                options={addresses}
                // multiple
                //   errors={errors}
              />
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
                <CustomizedLabel>Date of Birth</CustomizedLabel>
              </Box>
              <Box>
                <StyledInputBase
                  type="date"
                  placeholder="Date of Birth"
                  //   {...register('nextAppraisalDate')}
                />
                <Box>
                  {/* <ErrorText>{errors.nextAppraisalDate?.message}</ErrorText> */}
                </Box>
              </Box>
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder="Place Of Birth"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                gap: '10px',
                width: '90%',
              }}
            >
              <Box>
                <CustomizedLabel>Non-Resident</CustomizedLabel>
              </Box>
              <Box>
                <StyledCheck
                  id="resident"
                  //   {...register('nextAppraisalDate')}
                />
                <Box>
                  {/* <ErrorText>{errors.nextAppraisalDate?.message}</ErrorText> */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
